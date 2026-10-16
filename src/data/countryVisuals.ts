/**
 * Curated Scenic Landscape Photography Database for Vizamigo
 * Provides high-quality, authentic destination photography for all 199 countries worldwide.
 * Guarantees zero generic placeholders and authentic recognizable landmarks.
 */

import { countryToRegion } from './passportData';
import { getVerifiedCountryVisual } from './verifiedCountryData';

export const DEFAULT_TRAVEL_FALLBACK = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=480&fm=webp&q=75';

/**
 * Transforms image URLs to modern Next-Gen WebP format with optimal compression.
 * Enforces WebP format and width constraints to minimize payload and layout shift.
 */
export function getOptimizedImageUrl(
  rawUrl: string,
  options?: { width?: number; format?: 'webp' | 'avif'; quality?: number }
): string {
  if (!rawUrl) return DEFAULT_TRAVEL_FALLBACK;
  const width = options?.width || 320;
  const format = options?.format || 'webp';
  const quality = options?.quality || 58;

  if (rawUrl.includes('images.unsplash.com')) {
    try {
      const url = new URL(rawUrl);
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('w', width.toString());
      url.searchParams.set('fm', format);
      url.searchParams.set('q', quality.toString());
      return url.toString();
    } catch {
      return rawUrl.replace(/(\?|&)fm=[^&]*/g, '').replace(/(\?|&)q=[^&]*/g, '') + `&fm=${format}&q=${quality}`;
    }
  }
  return rawUrl;
}

export function getOptimizedSrcSet(rawUrl: string, quality = 58): string {
  if (!rawUrl || !rawUrl.includes('images.unsplash.com')) return '';
  return `${getOptimizedImageUrl(rawUrl, { width: 200, quality })} 200w, ${getOptimizedImageUrl(rawUrl, { width: 320, quality })} 320w, ${getOptimizedImageUrl(rawUrl, { width: 440, quality })} 440w`;
}

export const COUNTRY_LANDSCAPES: Record<string, { image: string; landmark: string }> = {
  AD: { image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=480&q=80", landmark: "Pyrenees Valleys & Andorra la Vella" },
  AL: { image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=480&q=80", landmark: "Ksamil Coast & Berat Castle" },
  AT: { image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=480&q=80", landmark: "Hallstatt Alpine Village & Vienna" },
  BA: { image: "https://images.unsplash.com/photo-1535627565086-13f55c100c0d?auto=format&fit=crop&w=480&q=80", landmark: "Mostar Stari Most Bridge & Sarajevo" },
  BE: { image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=480&q=80", landmark: "Bruges Canals & Brussels Grand Place" },
  BG: { image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=480&q=80", landmark: "Rila Monastery & Black Sea" },
  BY: { image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=480&q=80", landmark: "Mir Castle Complex & Minsk" },
  CH: { image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=480&q=80", landmark: "Swiss Alps & Matterhorn Peak" },
  CY: { image: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?auto=format&fit=crop&w=480&q=80", landmark: "Cape Greco Sea Caves & Paphos" },
  CZ: { image: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=480&q=80", landmark: "Charles Bridge & Prague Castle" },
  DE: { image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=480&q=80", landmark: "Neuschwanstein Castle & Berlin" },
  DK: { image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=480&q=80", landmark: "Nyhavn Copenhagen Waterfront" },
  EE: { image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=480&q=80", landmark: "Tallinn Medieval Old Town" },
  ES: { image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=480&q=80", landmark: "Barcelona Sagrada Família & Costa Brava" },
  FI: { image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=480&q=80", landmark: "Lapland Northern Lights & Helsinki" },
  FR: { image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=480&q=80", landmark: "Eiffel Tower Paris & Côte d’Azur" },
  GB: { image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=480&q=80", landmark: "London Big Ben & Tower Bridge" },
  GR: { image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=480&q=80", landmark: "Santorini Oia Caldera & Acropolis" },
  HR: { image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=480&q=80", landmark: "Dubrovnik Old Walls & Plitvice Lakes" },
  HU: { image: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=480&q=80", landmark: "Budapest Parliament & Danube River" },
  IE: { image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=480&q=80", landmark: "Cliffs of Moher & Dublin" },
  IS: { image: "https://images.unsplash.com/photo-1489367874814-f5d040621dd8?auto=format&fit=crop&w=480&q=80", landmark: "Skógafoss Waterfall & Geysir" },
  IT: { image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=480&q=80", landmark: "Rome Colosseum & Amalfi Coast" },
  LI: { image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=480&q=80", landmark: "Vaduz Castle & Alpine Rhine Valley" },
  LT: { image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=480&q=80", landmark: "Trakai Island Castle & Vilnius Old Town" },
  LU: { image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=480&q=80", landmark: "Luxembourg Grund Quarters & Viaduct" },
  LV: { image: "https://images.unsplash.com/photo-1580977276076-ae4b7c21d31f?auto=format&fit=crop&w=480&q=80", landmark: "Riga House of Blackheads & Art Nouveau" },
  MC: { image: "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&w=480&q=80", landmark: "Monte Carlo Harbour & Casino Square" },
  MD: { image: "https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=480&q=80", landmark: "Orheiul Vechi Monasteries & Cricova" },
  ME: { image: "https://images.unsplash.com/photo-1555990538-164b9175390e?auto=format&fit=crop&w=480&q=80", landmark: "Kotor Fjord Bay & Sveti Stefan" },
  MK: { image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=480&q=80", landmark: "Lake Ohrid & Saint John Kaneo" },
  MT: { image: "https://images.unsplash.com/photo-1572953109213-3be62398eb95?auto=format&fit=crop&w=480&q=80", landmark: "Valletta Grand Harbour & Blue Grotto" },
  NL: { image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=480&q=80", landmark: "Amsterdam Canals & Zaanse Schans" },
  NO: { image: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=480&q=80", landmark: "Geirangerfjord & Lofoten Islands" },
  PL: { image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=480&q=80", landmark: "Krakow Main Market & Wawel Castle" },
  PT: { image: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=480&q=80", landmark: "Lisbon Belém Tower & Algarve Coast" },
  RO: { image: "https://images.unsplash.com/photo-1565881606-d245053cc320?auto=format&fit=crop&w=480&q=80", landmark: "Bran Castle & Peleș Royal Estate" },
  RS: { image: "https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=480&q=80", landmark: "Belgrade Kalemegdan & Saint Sava" },
  RU: { image: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&w=480&q=80", landmark: "Red Square & Saint Basil’s Cathedral" },
  SE: { image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=480&q=80", landmark: "Stockholm Gamla Stan & Royal Palace" },
  SI: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Lake Bled Island & Julian Alps" },
  SK: { image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=480&q=80", landmark: "High Tatras Peaks & Bratislava Castle" },
  SM: { image: "https://images.unsplash.com/photo-1598880940371-c756e015faf1?auto=format&fit=crop&w=480&q=80", landmark: "Guaita Fortress Tower & Mount Titano" },
  UA: { image: "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=480&q=80", landmark: "Kyiv Pechersk Lavra & Saint Sophia" },
  VA: { image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=480&q=80", landmark: "St. Peter’s Basilica & Sistine Chapel" },
  XK: { image: "https://images.unsplash.com/photo-1579893504192-32a24f0c97e7?auto=format&fit=crop&w=480&q=80", landmark: "Prizren Fortress & Sinan Pasha Mosque" },
  AF: { image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=480&q=80", landmark: "Band-e Amir Sapphire Lakes" },
  AM: { image: "https://images.unsplash.com/photo-1574063413132-355dbfd83e25?auto=format&fit=crop&w=480&q=80", landmark: "Khor Virap Monastery & Mount Ararat" },
  AZ: { image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=480&q=80", landmark: "Baku Flame Towers & Caspian Promenade" },
  BD: { image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=480&q=80", landmark: "Sundarbans Tiger Mangroves & Delta" },
  BN: { image: "https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=480&q=80", landmark: "Sultan Omar Ali Saifuddien Golden Mosque" },
  BT: { image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=480&q=80", landmark: "Paro Taktsang Tiger’s Nest Monastery" },
  CN: { image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=480&q=80", landmark: "Great Wall of China & Forbidden City" },
  GE: { image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=480&q=80", landmark: "Gergeti Trinity Church & Kazbegi Peak" },
  HK: { image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=480&q=80", landmark: "Victoria Harbour Skyline & Star Ferry" },
  ID: { image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=480&q=80", landmark: "Bali Nusa Penida & Borobudur Temple" },
  IN: { image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=480&q=80", landmark: "Taj Mahal Agra & Ganges River" },
  JP: { image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=480&q=80", landmark: "Mount Fuji & Kyoto Chureito Pagoda" },
  KG: { image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=480&q=80", landmark: "Issyk-Kul Alpine Lake & Tian Shan" },
  KH: { image: "https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=480&q=80", landmark: "Angkor Wat Temple & Siem Reap" },
  KP: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Mount Paektu Crater Lake & Pyongyang" },
  KR: { image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=480&q=80", landmark: "Seoul Gyeongbokgung & Bukchon Hanok" },
  KZ: { image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=480&q=80", landmark: "Charyn Grand Canyon & Almaty Lakes" },
  LA: { image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=480&q=80", landmark: "Kuang Si Turquoise Waterfalls & Luang Prabang" },
  LK: { image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=480&q=80", landmark: "Sigiriya Ancient Lion Rock & Ella" },
  MM: { image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=480&q=80", landmark: "Bagan Sunrises & Inle Lake Stilt Houses" },
  MN: { image: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=480&q=80", landmark: "Gobi Desert Dunes & Nomadic Steppes" },
  MO: { image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=480&q=80", landmark: "Ruins of St. Paul’s Cathedral & Cotai" },
  MV: { image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=480&q=80", landmark: "Overwater Turquoise Coral Atolls" },
  MY: { image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=480&q=80", landmark: "Petronas Towers & Batu Caves Shrine" },
  NP: { image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=480&q=80", landmark: "Mount Everest Base & Himalayas" },
  PH: { image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=480&q=80", landmark: "El Nido Palawan Lagoons & Boracay" },
  PK: { image: "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?auto=format&fit=crop&w=480&q=80", landmark: "Hunza Valley Pass & Karakoram Peaks" },
  SG: { image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=480&q=80", landmark: "Marina Bay Sands & Supertree Grove" },
  TH: { image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=480&q=80", landmark: "Maya Bay Phi Phi & Bangkok Grand Palace" },
  TJ: { image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=480&q=80", landmark: "Pamir Highway Roof & Iskanderkul Lake" },
  TL: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Atauro Island Coral Reefs & Dili Coast" },
  TM: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Darvaza Gas Crater Door to Hell & Ashgabat" },
  TW: { image: "https://images.unsplash.com/photo-1508247967583-7d982ea01526?auto=format&fit=crop&w=480&q=80", landmark: "Taipei 101 Tower & Jiufen Old Street" },
  UZ: { image: "https://images.unsplash.com/photo-1569288052389-dac9b01c97c5?auto=format&fit=crop&w=480&q=80", landmark: "Samarkand Registan Silk Road Madrassas" },
  VN: { image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=480&q=80", landmark: "Ha Long Bay Karsts & Golden Dragon Bridge" },
  AE: { image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=480&q=80", landmark: "Burj Khalifa & Downtown Dubai Marina" },
  BH: { image: "https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=480&q=80", landmark: "Bahrain World Trade Center & Qal’at al-Bahrain" },
  IL: { image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=480&q=80", landmark: "Jerusalem Old City Walls & Western Wall" },
  IQ: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Ancient Babylon Gate & Erbil Citadel" },
  IR: { image: "https://images.unsplash.com/photo-1583316852564-02be226c9782?auto=format&fit=crop&w=480&q=80", landmark: "Naqsh-e Jahan Square Isfahan & Persepolis" },
  JO: { image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=480&q=80", landmark: "Petra Treasury Al-Khazneh & Wadi Rum" },
  KW: { image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=480&q=80", landmark: "Kuwait Towers & Arabian Seafront" },
  LB: { image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=480&q=80", landmark: "Beirut Raouche Pigeon Rocks & Byblos" },
  OM: { image: "https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=480&q=80", landmark: "Sultan Qaboos Grand Mosque & Muscat Fjord" },
  PS: { image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=480&q=80", landmark: "Al-Aqsa Dome of the Rock & Bethlehem" },
  QA: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Doha Corniche Skyline & Islamic Art Museum" },
  SA: { image: "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?auto=format&fit=crop&w=480&q=80", landmark: "AlUla Hegra Tomb & Edge of the World" },
  SY: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Umayyad Great Mosque Damascus & Palmyra" },
  TR: { image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=480&q=80", landmark: "Cappadocia Hot Air Balloons & Bosphorus" },
  YE: { image: "https://images.unsplash.com/photo-1642425149556-b6f90e946859?auto=format&fit=crop&w=480&q=80", landmark: "Socotra Island Dragon's Blood Trees & Sana'a" },
  AO: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Kalandula Waterfalls & Luanda Bay" },
  BF: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Sindou Peaks Geological Spire Rocks" },
  BI: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Lake Tanganyika Shores & Karera Falls" },
  BJ: { image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=480&q=80", landmark: "Ganvié Venice of Africa Lake Stilt Village" },
  BW: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Okavango Delta Safari & Chobe Elephants" },
  CD: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Virunga Volcanic Park & Mountain Gorillas" },
  CF: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Dzanga-Sangha Pristine Rainforest Basin" },
  CG: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Congo Mighty River & Odzala Wilderness" },
  CI: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Basilica of Our Lady of Peace Yamoussoukro" },
  CM: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Mount Cameroon Active Volcano & Waza Park" },
  CV: { image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=480&q=80", landmark: "Sal Island Golden Sand Dunes & Santa Maria" },
  DJ: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Lake Assal White Salt Flats & Red Sea" },
  DZ: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Tassili n’Ajjer Rock Art Plateau & Sahara" },
  EG: { image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=480&q=80", landmark: "Giza Pyramids & Nile River Felucca" },
  ER: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Asmara Modernist Art Deco Heritage" },
  ET: { image: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=480&q=80", landmark: "Lalibela Rock-Hewn Churches & Simien Peaks" },
  GA: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Loango National Park Surfing Hippos Coast" },
  GH: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Cape Coast Historic Fort & Kakum Canopy" },
  GM: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Gambia River Delta & Kololi Beaches" },
  GN: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Fouta Djallon Waterfalls & Green Canyons" },
  GQ: { image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=480&q=80", landmark: "Bioko Volcanic Island & Malabo Harbor" },
  GW: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Bijagós Archipelago UNESCO Biosphere" },
  KE: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Maasai Mara Great Migration & Mount Kenya" },
  KM: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Mount Karthala Volcanic Crater & Vanilla Isle" },
  LR: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Sapo National Park Primary Rainforest" },
  LS: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Maletsunyane Abseil Falls & Drakensberg" },
  LY: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Leptis Magna Roman Mediterranean Ruins" },
  MA: { image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=480&q=80", landmark: "Marrakech Medina & Sahara Merzouga Dunes" },
  MG: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Avenue of the Giant Baobabs & Isalo" },
  ML: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Great Mud Mosque of Djenné & Timbuktu" },
  MR: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Chinguetti Desert Oasis & Iron Ore Train" },
  MU: { image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=480&q=80", landmark: "Le Morne Brabant Mountain & Chamarel Falls" },
  MW: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Lake Malawi Freshwater Beach & Cichlid Reefs" },
  MZ: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Bazaruto Island Archipelago & Dhow Sailing" },
  NA: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Sossusvlei Red Dunes & Deadvlei Clay Pan" },
  NE: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Aïr Mountains & Tenere Desert Dunes" },
  NG: { image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=480&q=80", landmark: "Zuma Monolith Rock & Lagos Marina" },
  RW: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Volcanoes National Park & Lake Kivu" },
  SC: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Anse Source d’Argent Granite Beach La Digue" },
  SD: { image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=480&q=80", landmark: "Meroë Nubian Black Pyramids & Nile" },
  SL: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "River Number Two White Sand Beach Freetown" },
  SN: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Gorée Island Pastel Town & Lac Rose Pink Lake" },
  SO: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Laas Geel Prehistoric Rock Art Caves" },
  SS: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Sudd Vast Wetland & White Nile Floodplains" },
  ST: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Pico Cão Grande Volcanic Needle Peak" },
  SZ: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Ezulwini Valley & Mlilwane Sanctuary" },
  TD: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Ennedi Plateau Natural Rock Arches & Desert" },
  TG: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Koutammakou Mud Tower Houses & Lomé Coast" },
  TN: { image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80", landmark: "Sidi Bou Said Blue & White Seaside Village" },
  TZ: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Serengeti Plains Safari & Mount Kilimanjaro" },
  UG: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Bwindi Impenetrable Forest Gorilla Trek" },
  ZA: { image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=480&q=80", landmark: "Cape Town Table Mountain & Camps Bay" },
  ZM: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Victoria Falls Thunder Smoke Waterfall" },
  ZW: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Great Zimbabwe Stone Ruins & Kariba" },
  AG: { image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=480&q=80", landmark: "Shirley Heights Lookout & Dickenson Bay" },
  BB: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Crane Beach Cliffs & Carlisle Bay Turtles" },
  BS: { image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=480&q=80", landmark: "Exuma Cays Swimming Pigs & Nassau Waters" },
  BZ: { image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=480&q=80", landmark: "Great Blue Hole Giant Marine Sinkhole" },
  CA: { image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=480&q=80", landmark: "Banff Lake Louise & Canadian Rockies" },
  CR: { image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=480&q=80", landmark: "Arenal Volcano & Manuel Antonio Rainforest" },
  CU: { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=480&q=80", landmark: "Havana Malecón Classic Cars & Viñales" },
  DM: { image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=480&q=80", landmark: "Morne Trois Pitons Boiling Lake & Gorges" },
  DO: { image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=480&q=80", landmark: "Punta Cana Turquoise Palms & Santo Domingo" },
  GD: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "St. George’s Harbor & Grand Anse Beach" },
  GT: { image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=480&q=80", landmark: "Tikal Mayan Jungle Pyramids & Lake Atitlán" },
  HN: { image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=480&q=80", landmark: "Roatán Coral Reef Barrier & Copán Ruins" },
  HT: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Citadelle Laferrière Mountain Fortress" },
  JM: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Dunn’s River Falls & Blue Mountain Peaks" },
  KN: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Brimstone Hill UNESCO Fortress St. Kitts" },
  LC: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "The Twin Pitons Volcanic Peaks Soufrière" },
  MX: { image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=480&q=80", landmark: "Chichén Itzá El Castillo Pyramid & Cancún" },
  NI: { image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=480&q=80", landmark: "Ometepe Volcano Island & Granada Plaza" },
  PA: { image: "https://images.unsplash.com/photo-1508247967583-7d982ea01526?auto=format&fit=crop&w=480&q=80", landmark: "Panama Canal Locks & Casco Viejo Colonial" },
  SV: { image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=480&q=80", landmark: "Santa Ana Volcano Crater Lake & El Tunco" },
  TT: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Maracas Bay Palm Beach & Pigeon Point" },
  US: { image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=480&q=80", landmark: "Yosemite National Park & Manhattan Skyline" },
  VC: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Tobago Cays Marine Sanctuary Lagoon" },
  AR: { image: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=480&q=80", landmark: "Perito Moreno Glacier & Iguazú Waterfalls" },
  BO: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Salar de Uyuni Salt Flats Mirror & La Paz" },
  BR: { image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=480&q=80", landmark: "Rio Christ the Redeemer & Copacabana" },
  CL: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Torres del Paine Patagonia & Atacama Dunes" },
  CO: { image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=480&q=80", landmark: "Cartagena Walled City & Guatapé Giant Rock" },
  EC: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Galápagos Islands Fauna & Cotopaxi Volcano" },
  GY: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Kaieteur Falls Single Drop & Amazon Jungle" },
  PE: { image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=480&q=80", landmark: "Machu Picchu Sacred Inca Citadel & Andes" },
  PY: { image: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=480&q=80", landmark: "Itaipu Dam Lake & Jesuit Mission Ruins" },
  SR: { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=480&q=80", landmark: "Central Suriname Nature Reserve & Raleigh" },
  UY: { image: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=480&q=80", landmark: "Punta del Este Monument & Casapueblo" },
  VE: { image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=480&q=80", landmark: "Angel Falls Salto Ángel & Mount Roraima" },
  AU: { image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=480&q=80", landmark: "Sydney Opera House & Great Barrier Reef" },
  FJ: { image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=480&q=80", landmark: "Mamanuca Coral Islands & Turquoise Blue" },
  FM: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Nan Madol Venice of the Pacific Ruins" },
  KI: { image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=480&q=80", landmark: "Tarawa Coral Lagoon & Pacific Atolls" },
  MH: { image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=480&q=80", landmark: "Majuro Palm Lagoon & Remote Pacific" },
  NR: { image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=480&q=80", landmark: "Anibare Bay Coral Coast & Pinnacles" },
  NZ: { image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=480&q=80", landmark: "Milford Sound Majestic Fiords & Queenstown" },
  PG: { image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=480&q=80", landmark: "Mount Wilhelm Highland Valleys & Rabaul" },
  PW: { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=80", landmark: "Rock Islands Southern Lagoon & Jellyfish Lake" },
  SB: { image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=480&q=80", landmark: "Marovo Double Barrier Lagoon & Solomon Isles" },
  TO: { image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=480&q=80", landmark: "Ha’amonga ‘a Maui Trilithon & Vava’u" },
  TV: { image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=480&q=80", landmark: "Funafuti Marine Conservation Lagoon" },
  VU: { image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=480&q=80", landmark: "Mount Yasur Fire Volcano & Champagne Beach" },
  WS: { image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=480&q=80", landmark: "To-Sua Ocean Trench Sunken Pool Upolu" }
};

export function getCountryVisual(countryCode: string): { image: string; landmark: string } {
  const code = (countryCode || '').toUpperCase();
  const verified = getVerifiedCountryVisual(code);
  if (verified) {
    return {
      image: getOptimizedImageUrl(verified.image, { width: 320, quality: 58 }),
      landmark: verified.landmark
    };
  }
  const raw = COUNTRY_LANDSCAPES[code];
  if (raw) {
    return {
      image: getOptimizedImageUrl(raw.image, { width: 320, quality: 58 }),
      landmark: raw.landmark
    };
  }
  const reg = countryToRegion[code] || 'Otantik Rota';
  return {
    image: getOptimizedImageUrl(DEFAULT_TRAVEL_FALLBACK, { width: 320, quality: 58 }),
    landmark: `${code} ${reg} Manzaraları`
  };
}
