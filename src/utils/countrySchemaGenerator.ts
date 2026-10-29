/**
 * Dynamic Country Schema.org (JSON-LD) Generator for Vizamigo
 * Code-split from the initial bundle to keep entry payload lightweight.
 * Combines @type: 'TouristDestination', @type: 'TouristTrip', @type: 'FAQPage', and @type: 'BreadcrumbList'.
 */

import { SupportedLanguage } from '../i18n/types';
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
            name: 'Passport Validity Requirement',
            value: 'Minimum 6 months validity from date of entry'
          },
          {
            '@type': 'PropertyValue',
            name: 'Mobile Internet Speed',
            value: `${insights.internet.mobileSpeedMbps} Mbps`,
            unitText: 'Mbps'
          },
          {
            '@type': 'PropertyValue',
            name: 'Broadband Internet Speed',
            value: `${insights.internet.broadbandSpeedMbps} Mbps`,
            unitText: 'Mbps'
          },
          {
            '@type': 'PropertyValue',
            name: 'eSIM Availability',
            value: insights.internet.esimAvailability || 'Local SIM Only'
          },
          {
            '@type': 'PropertyValue',
            name: 'Safety Score',
            value: `${insights.safety.safetyScore}`,
            minValue: '0',
            maxValue: '100'
          },
          {
            '@type': 'PropertyValue',
            name: 'Cross Currency USD',
            value: `1 USD = ${rate1Usd} ${destCurrency}`
          },
          {
            '@type': 'PropertyValue',
            name: 'Cross Currency EUR',
            value: `1 EUR = ${rate1Eur} ${destCurrency}`
          },
          {
            '@type': 'PropertyValue',
            name: 'Cross Currency TRY',
            value: `1 TRY = ${rate1Try} ${destCurrency}`
          },
          {
            '@type': 'PropertyValue',
            name: 'Cross Currency GBP',
            value: `1 GBP = ${rate1Gbp} ${destCurrency}`
          },
          {
            '@type': 'PropertyValue',
            name: 'Capital City',
            value: geography.capital || geo?.capital || ''
          },
          {
            '@type': 'PropertyValue',
            name: 'Main Airport IATA Hub',
            value: geo?.mainHub || ''
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
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Visa Validity Period',
            value: stayDuration
          },
          {
            '@type': 'PropertyValue',
            name: 'Destination Currency Matrix',
            value: `1 USD = ${rate1Usd} ${destCurrency} | 1 EUR = ${rate1Eur} ${destCurrency} | 1 TRY = ${rate1Try} ${destCurrency}`
          },
          {
            '@type': 'PropertyValue',
            name: 'Local Connectivity Speed',
            value: `${insights.internet.mobileSpeedMbps} Mbps Mobile / ${insights.internet.broadbandSpeedMbps} Mbps Broadband`
          }
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          category: 'Travel Guide'
        }
      },

      // 3. FAQPage node (for Mobile Rich Results & Voice Snippets)
      {
        '@type': 'FAQPage',
        '@id': faqId,
        inLanguage: language,
        mainEntity: [
          {
            '@type': 'Question',
            name: voiceQuestion,
            acceptedAnswer: {
              '@type': 'Answer',
              text: directAnswerText
            }
          },
          {
            '@type': 'Question',
            name: language === 'tr'
              ? `${countryName} Para Birimi ve Güncel Döviz Kurları (USD/EUR/GBP) Nedir?`
              : language === 'de'
              ? `Welche Währung und Wechselkurse (USD/EUR/GBP) gelten in ${countryName}?`
              : language === 'es'
              ? `¿Cuál es la moneda y el tipo de cambio (USD/EUR/GBP) en ${countryName}?`
              : language === 'ru'
              ? `Какая валюта и курсы обмена (USD/EUR/GBP) в ${countryName}?`
              : `What is the currency and exchange rate (USD/EUR/GBP) in ${countryName}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${countryName} (${geography.currencyName}, ${destCurrency} ${geography.currencySymbol}): 1 USD = ${rate1Usd} ${destCurrency}, 1 EUR = ${rate1Eur} ${destCurrency}, 1 GBP = ${rate1Gbp} ${destCurrency}.`
            }
          },
          {
            '@type': 'Question',
            name: language === 'tr'
              ? `${countryName} Priz Tipi, Voltaj ve Elektrik Standartları Nelerdir?`
              : language === 'de'
              ? `Welche Steckertypen und Netzspannung werden in ${countryName} verwendet?`
              : language === 'es'
              ? `¿Qué tipo de enchufe y voltaje se utiliza en ${countryName}?`
              : language === 'ru'
              ? `Какие типы розеток и напряжение электросети в ${countryName}?`
              : `What plug type and electrical voltage are used in ${countryName}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: (language === 'tr' ? `${countryName} elektrik standartları: ${geography.plugTypes}. Seyahat öncesi adaptör ihtiyacını kontrol et.` : language === 'de' ? `Stromstandard in ${countryName}: ${geography.plugTypes}. Prüfe vor der Reise, ob du einen Reiseadapter brauchst.` : language === 'es' ? `Estándar eléctrico en ${countryName}: ${geography.plugTypes}. Comprueba antes de viajar si necesitas un adaptador.` : language === 'ru' ? `Электросеть в стране ${countryName}: ${geography.plugTypes}. Перед поездкой проверьте, нужен ли переходник.` : `Electrical standards in ${countryName}: ${geography.plugTypes}. Check whether you need a travel adapter before you go.`)
            }
          },
          {
            '@type': 'Question',
            name: language === 'tr'
              ? `${countryName} Seyahati İçin Pasaport Geçerlilik Süresi Ne Kadar Olmalıdır?`
              : language === 'de'
              ? `Wie lange muss der Reisepass für die Einreise nach ${countryName} noch gültig sein?`
              : language === 'es'
              ? `¿Cuánta validez de pasaporte se requiere para viajar a ${countryName}?`
              : language === 'ru'
              ? `Какой срок действия паспорта требуется для поездки в ${countryName}?`
              : `How long must a passport be valid to enter ${countryName}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: (language === 'tr' ? `${countryName} için genel öneri: pasaportun seyahat tarihinden itibaren en az 6 ay geçerli olması ve en az 2 boş sayfa. Kesin kural için ülkenin resmî giriş sayfasını kontrol et.` : language === 'de' ? `Allgemeine Empfehlung für ${countryName}: Reisepass mindestens 6 Monate ab Reisedatum gültig und mindestens 2 leere Seiten. Die genaue Regel steht auf der offiziellen Einreiseseite.` : language === 'es' ? `Recomendación general para ${countryName}: pasaporte con al menos 6 meses de validez desde la fecha del viaje y al menos 2 páginas en blanco. Consulta la regla exacta en la web oficial de entrada.` : language === 'ru' ? `Общая рекомендация для страны ${countryName}: паспорт действителен не менее 6 месяцев с даты поездки и минимум 2 чистые страницы. Точное правило уточните на официальном сайте.` : `General advice for ${countryName}: a passport valid for at least 6 months from your travel date and at least 2 blank pages. Check the official entry page for the exact rule.`)
            }
          },
          {
            '@type': 'Question',
            name: language === 'tr'
              ? `${countryName} İnternet Hızı, eSIM ve Önerilen Gezi Rotası Nasıldır?`
              : language === 'de'
              ? `Wie schnell ist das Internet in ${countryName} und welche Reiseroute wird empfohlen?`
              : language === 'es'
              ? `¿Cuál es la velocidad de internet en ${countryName} y qué ruta de viaje se recomienda?`
              : language === 'ru'
              ? `Какая скорость интернета в ${countryName} и какой маршрут рекомендуется?`
              : `What is the internet speed in ${countryName} and recommended travel route?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: (language === 'tr' ? `${countryName} internet hızı: mobil ${insights.internet.mobileSpeedMbps} Mbps, sabit ${insights.internet.broadbandSpeedMbps} Mbps. Önerilen rota (${itinerary.routeName}): ${itinerary.stops.map(s => s.name).join(' → ')}.` : language === 'de' ? `Internet in ${countryName}: mobil ${insights.internet.mobileSpeedMbps} Mbit/s, Festnetz ${insights.internet.broadbandSpeedMbps} Mbit/s. Empfohlene Route (${itinerary.routeName}): ${itinerary.stops.map(s => s.name).join(' → ')}.` : language === 'es' ? `Internet en ${countryName}: ${insights.internet.mobileSpeedMbps} Mbps móvil, ${insights.internet.broadbandSpeedMbps} Mbps fijo. Ruta recomendada (${itinerary.routeName}): ${itinerary.stops.map(s => s.name).join(' → ')}.` : language === 'ru' ? `Интернет (${countryName}): мобильный ${insights.internet.mobileSpeedMbps} Мбит/с, домашний ${insights.internet.broadbandSpeedMbps} Мбит/с. Маршрут (${itinerary.routeName}): ${itinerary.stops.map(s => s.name).join(' → ')}.` : `Internet in ${countryName}: ${insights.internet.mobileSpeedMbps} Mbps mobile, ${insights.internet.broadbandSpeedMbps} Mbps broadband. Suggested route (${itinerary.routeName}): ${itinerary.stops.map(s => s.name).join(' → ')}.`)
            }
          }
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
            name: language === 'tr' ? 'Ülkeler' : language === 'de' ? 'Länder' : language === 'es' ? 'Países' : language === 'ru' ? 'Страны' : 'Countries',
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
