/**
 * Dynamic Country Schema.org (JSON-LD) Generator for Vizamigo
 * Code-split from the initial bundle to keep entry payload lightweight.
 * Combines @type: 'TouristDestination', @type: 'TouristTrip', @type: 'FAQPage', and @type: 'BreadcrumbList'.
 */

import { getExtraFaq } from '../data/extraFaq';
import { getPassportFaq } from './passportBrief';
import { SupportedLanguage } from '../i18n/types';
import { ruIn } from '../data/ruCases';
import { getCountryName } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { getCountryGeography } from '../data/countryGeography';
import { getCountryInsights } from '../data/countryInsights';
import { getCountryItinerary } from '../data/countryItineraries';
import { getCountryVisual } from '../data/countryVisuals';
import { GEO_DATA } from '../data/geoData';
import { getCrossRate, formatCurrencyValue } from '../data/currencyRates';
import { buildAbsoluteLocalizedUrl, BASE_URL } from './seoRouter';
import {
  getStayDurationText,
  generateDirectAnswerSnippet,
  getMobileVoiceQuestion,
  SchemaGeneratorOptions
} from './schemaGenerator';

/**
 * Generates the complete JSON-LD Schema.org graph object for a country
 */
export function generateCountryJsonLd({
  countryCode,
  language,
  currentPassport = 'TR'
}: SchemaGeneratorOptions): object {
  const code = countryCode.toUpperCase();
  const countryName = getCountryName(code, language);
  const passportName = getCountryName(currentPassport, language);

  const passportItems = getPassportItems(currentPassport);
  const item = passportItems.find(i => i.c === code) || { c: code, v: 'v', cat: 'visa' as const, id: false };

  const geo = GEO_DATA[code];
  const geography = getCountryGeography(code, language);
  const insights = getCountryInsights(code, language);
  const itinerary = getCountryItinerary(code, language);
  const visual = getCountryVisual(code);

  const localizedCountryUrl = buildAbsoluteLocalizedUrl(language, 'explore', code);
  const destinationId = `${localizedCountryUrl}#destination`;
  const tripId = `${localizedCountryUrl}#trip`;
  const faqId = `${localizedCountryUrl}#faq`;
  const breadcrumbId = `${localizedCountryUrl}#breadcrumb`;

  const stayDuration = getStayDurationText(item.v, item.cat, language);
  const directAnswerText = generateDirectAnswerSnippet(
    countryName,
    passportName,
    item.cat,
    stayDuration,
    item.id,
    language
  );
  const passportFaq = getPassportFaq(code, currentPassport, language);
  const voiceQuestion = getMobileVoiceQuestion(countryName, passportName, language, currentPassport);

  // Cross currency calculations (USD, EUR, TRY, GBP)
  const destCurrency = geography.currencyCode || 'USD';
  const rate1Usd = formatCurrencyValue(getCrossRate('USD', destCurrency));
  const rate1Eur = formatCurrencyValue(getCrossRate('EUR', destCurrency));
  const rate1Try = formatCurrencyValue(getCrossRate('TRY', destCurrency));
  const rate1Gbp = formatCurrencyValue(getCrossRate('GBP', destCurrency));

  // Itinerary stops with geographic route order
  const itineraryListElements = itinerary.stops.map((stop, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    item: {
      '@type': 'TouristAttraction',
      name: stop.name,
      description: `${stop.recommendedDuration} - ${stop.highlights.join(', ')}`,
      ...(geo ? {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: geo.lat,
          longitude: geo.lng
        }
      } : {})
    }
  }));

  // JSON-LD @graph definition combining TouristDestination, TouristTrip, FAQPage & BreadcrumbList
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. TouristDestination node
      {
        '@type': 'TouristDestination',
        '@id': destinationId,
        identifier: code,
        name: countryName,
        url: localizedCountryUrl,
        inLanguage: language,
        description: directAnswerText,
        image: visual.image,
        ...(geo ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: geo.lat,
            longitude: geo.lng
          }
        } : {}),
        touristType: [
          'DigitalNomad',
          'Backpacker',
          'InternationalTraveler'
        ],
        currencyAccepted: destCurrency,
        includesAttraction: itinerary.stops.map(stop => ({
          '@type': 'TouristAttraction',
          name: stop.name,
          description: stop.highlights.join(', ')
        })),
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Visa Status',
            value: item.cat.toUpperCase()
          },
          {
            '@type': 'PropertyValue',
            name: 'Visa Validity & Permitted Stay Period',
            value: stayDuration
          },
          {
            '@type': 'PropertyValue',
            name: 'National ID Card Entry',
            value: item.id ? 'Supported' : 'Passport Required'
          },
          {
            '@type': 'PropertyValue',
            name: 'Capital City',
            value: geography.capital || geo?.capital || ''
          }
        ]
      },

      // 2. TouristTrip node (Geographic route order, visa validity & connectivity context)
      {
        '@type': 'TouristTrip',
        '@id': tripId,
        name: itinerary.routeName,
        description: itinerary.routeSummary,
        url: localizedCountryUrl,
        inLanguage: language,
        touristType: [
          'InternationalTraveler',
          'DigitalNomad'
        ],
        itinerary: {
          '@type': 'ItemList',
          itemListOrder: 'https://schema.org/ItemListOrderAscending',
          numberOfItems: itineraryListElements.length,
          itemListElement: itineraryListElements
        }
      },

      // 3. FAQPage node (for Mobile Rich Results & Voice Snippets)
      {
        '@type': 'FAQPage',
        '@id': faqId,
        inLanguage: language,
        mainEntity: [
          // Şablon dolgu sorular (döviz, priz, internet, genel pasaport süresi) kaldırıldı: her sayfada aynı metin
          // Google'a "ölçekli üretilmiş içerik" sinyali veriyordu. Pasaporta özel sorular varsa genel soru da tekrar edilmez.
          ...(passportFaq.length ? [] : [{ '@type': 'Question', name: voiceQuestion, acceptedAnswer: { '@type': 'Answer', text: directAnswerText } }]),
          ...getExtraFaq(code, language, currentPassport).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          ...passportFaq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
        ]
      },

      // 4. BreadcrumbList node
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Vizamigo',
            item: `${BASE_URL}/${language}`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: language === 'tr' ? 'Ülkeler' : language === 'de' ? 'Länder' : language === 'es' ? 'Países' : language === 'pt' ? 'Países' : language === 'ru' ? 'Страны' : 'Countries',
            item: `${BASE_URL}/${language}/explore`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: countryName,
            item: localizedCountryUrl
          }
        ]
      }
    ]
  };
}

/** Para birimi adı sayfa dilinde (tarayıcı/Node Intl); bulunamazsa veri içindeki ad. */
function currencyLabel(code: string, lang: string, fallback: string): string {
  try {
    const n = new Intl.DisplayNames([lang], { type: 'currency' }).of(code);
    if (n && n !== code) return n;
  } catch {}
  return fallback;
}
