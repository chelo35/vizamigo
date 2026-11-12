/**
 * Şehir arama listesi: ziyaretçi ülkedeki her ili / adayı / bölgeyi yazabilsin.
 * Her yerin yanına en yakın (ticari uçuşu olan) havalimanı yazılır; uçuş araması oraya yapılır.
 * Otel, tur, transfer ve şehirler arası ulaşım aynı adla aranır.
 */
export type Place = { en: string; iata?: string };

export const PLACES: Record<string, Place[]> = {
  PH: [
    { en: "Manila", iata: 'MNL' }, { en: "Makati", iata: 'MNL' }, { en: "Cebu", iata: 'CEB' }, { en: "Boracay", iata: 'MPH' }, { en: "El Nido", iata: 'ENI' }, { en: "Palawan", iata: 'PPS' }, { en: "Coron", iata: 'USU' }, { en: "Puerto Princesa", iata: 'PPS' }, { en: "Bohol", iata: 'TAG' }, { en: "Siargao", iata: 'IAO' }, { en: "Davao", iata: 'DVO' }
  ],
  AU: [
    { en: "Sydney", iata: 'SYD' }, { en: "Sidney", iata: 'SYD' }, { en: "Blue Mountains", iata: 'SYD' }, { en: "Melbourne", iata: 'MEL' }, { en: "Great Ocean Road", iata: 'MEL' }, { en: "Gold Coast", iata: 'OOL' }, { en: "Brisbane", iata: 'BNE' }, { en: "Cairns", iata: 'CNS' }, { en: "Great Barrier Reef", iata: 'CNS' }, { en: "Whitsundays", iata: 'PPP' }, { en: "Uluru", iata: 'AYQ' }, { en: "Perth", iata: 'PER' }, { en: "Adelaide", iata: 'ADL' }, { en: "Tasmania", iata: 'HBA' }, { en: "Hobart", iata: 'HBA' }, { en: "Byron Bay", iata: 'BNK' }
  ],
  NZ: [
    { en: "Auckland", iata: 'AKL' }, { en: "Queenstown", iata: 'ZQN' }, { en: "Milford Sound", iata: 'ZQN' }, { en: "Wanaka", iata: 'ZQN' }, { en: "Christchurch", iata: 'CHC' }, { en: "Rotorua", iata: 'ROT' }, { en: "Hobbiton", iata: 'AKL' }, { en: "Wellington", iata: 'WLG' }, { en: "Bay of Islands", iata: 'KKE' }, { en: "Taupo", iata: 'TUO' }, { en: "Franz Josef", iata: 'HKK' }
  ],
  LK: [
    { en: "Colombo", iata: 'CMB' }, { en: "Kolombo", iata: 'CMB' }, { en: "Kandy", iata: 'CMB' }, { en: "Ella", iata: 'CMB' }, { en: "Sigiriya", iata: 'CMB' }, { en: "Galle", iata: 'CMB' }, { en: "Mirissa", iata: 'CMB' }, { en: "Nuwara Eliya", iata: 'CMB' }, { en: "Bentota", iata: 'CMB' }, { en: "Yala", iata: 'CMB' }, { en: "Trincomalee", iata: 'CMB' }
  ],
  MV: [
    { en: "Male", iata: 'MLE' }, { en: "Maafushi", iata: 'MLE' }, { en: "Hulhumale", iata: 'MLE' }, { en: "Ari Atoll", iata: 'MLE' }, { en: "Baa Atoll", iata: 'MLE' }, { en: "Addu", iata: 'GAN' }
  ],
  AR: [
    { en: "Buenos Aires", iata: 'EZE' }, { en: "El Calafate", iata: 'FTE' }, { en: "Perito Moreno", iata: 'FTE' }, { en: "El Chalten", iata: 'FTE' }, { en: "Ushuaia", iata: 'USH' }, { en: "Bariloche", iata: 'BRC' }, { en: "Iguazu", iata: 'IGR' }, { en: "Puerto Iguazu", iata: 'IGR' }, { en: "Mendoza", iata: 'MDZ' }, { en: "Salta", iata: 'SLA' }, { en: "Cordoba", iata: 'COR' }
  ],
  PE: [
    { en: "Lima", iata: 'LIM' }, { en: "Miraflores", iata: 'LIM' }, { en: "Cusco", iata: 'CUZ' }, { en: "Machu Picchu", iata: 'CUZ' }, { en: "Sacred Valley", iata: 'CUZ' }, { en: "Arequipa", iata: 'AQP' }, { en: "Colca Canyon", iata: 'AQP' }, { en: "Puno", iata: 'JUL' }, { en: "Lake Titicaca", iata: 'JUL' }, { en: "Paracas", iata: 'LIM' }, { en: "Huacachina", iata: 'LIM' }, { en: "Iquitos", iata: 'IQT' }
  ],
  CO: [
    { en: "Cartagena", iata: 'CTG' }, { en: "Bogota", iata: 'BOG' }, { en: "Bogotá", iata: 'BOG' }, { en: "Medellin", iata: 'MDE' }, { en: "Medellín", iata: 'MDE' }, { en: "Guatape", iata: 'MDE' }, { en: "Santa Marta", iata: 'SMR' }, { en: "Tayrona", iata: 'SMR' }, { en: "San Andres", iata: 'ADZ' }, { en: "Cali", iata: 'CLO' }, { en: "Salento", iata: 'PEI' }
  ],
  DO: [
    { en: "Punta Cana", iata: 'PUJ' }, { en: "Bavaro", iata: 'PUJ' }, { en: "Santo Domingo", iata: 'SDQ' }, { en: "Puerto Plata", iata: 'POP' }, { en: "La Romana", iata: 'LRM' }, { en: "Samana", iata: 'AZS' }, { en: "Las Terrenas", iata: 'AZS' }
  ],
  CU: [
    { en: "Havana", iata: 'HAV' }, { en: "Havana Vieja", iata: 'HAV' }, { en: "Varadero", iata: 'VRA' }, { en: "Trinidad", iata: 'HAV' }, { en: "Vinales", iata: 'HAV' }, { en: "Cayo Coco", iata: 'CCC' }, { en: "Santa Clara", iata: 'SNU' }, { en: "Holguin", iata: 'HOG' }
  ],
  JO: [
    { en: "Amman", iata: 'AMM' }, { en: "Petra", iata: 'AMM' }, { en: "Wadi Musa", iata: 'AMM' }, { en: "Wadi Rum", iata: 'AQJ' }, { en: "Aqaba", iata: 'AQJ' }, { en: "Akabe", iata: 'AQJ' }, { en: "Dead Sea", iata: 'AMM' }, { en: "Lut Gölü", iata: 'AMM' }, { en: "Jerash", iata: 'AMM' }
  ],
  TN: [
    { en: "Tunis", iata: 'TUN' }, { en: "Tunus", iata: 'TUN' }, { en: "Sidi Bou Said", iata: 'TUN' }, { en: "Carthage", iata: 'TUN' }, { en: "Kartaca", iata: 'TUN' }, { en: "Djerba", iata: 'DJE' }, { en: "Cerbe", iata: 'DJE' }, { en: "Hammamet", iata: 'NBE' }, { en: "Sousse", iata: 'MIR' }, { en: "Susa", iata: 'MIR' }, { en: "Monastir", iata: 'MIR' }, { en: "Tozeur", iata: 'TOE' }, { en: "Sahara", iata: 'TOE' }
  ],
  GE: [
    { en: "Tbilisi", iata: 'TBS' }, { en: "Tiflis", iata: 'TBS' }, { en: "Batumi", iata: 'BUS' }, { en: "Batum", iata: 'BUS' }, { en: "Kutaisi", iata: 'KUT' }, { en: "Kazbegi", iata: 'TBS' }, { en: "Stepantsminda", iata: 'TBS' }, { en: "Mtskheta", iata: 'TBS' }, { en: "Signagi", iata: 'TBS' }, { en: "Kakheti", iata: 'TBS' }, { en: "Gudauri", iata: 'TBS' }, { en: "Borjomi", iata: 'TBS' }, { en: "Mestia", iata: 'KUT' }, { en: "Svaneti", iata: 'KUT' }
  ],
  ME: [
    { en: "Kotor", iata: 'TIV' }, { en: "Budva", iata: 'TIV' }, { en: "Tivat", iata: 'TIV' }, { en: "Perast", iata: 'TIV' }, { en: "Sveti Stefan", iata: 'TIV' }, { en: "Herceg Novi", iata: 'TIV' }, { en: "Podgorica", iata: 'TGD' }, { en: "Ulcinj", iata: 'TGD' }, { en: "Bar", iata: 'TGD' }, { en: "Durmitor", iata: 'TGD' }, { en: "Zabljak", iata: 'TGD' }
  ],
  AL: [
    { en: "Tirana", iata: 'TIA' }, { en: "Tiran", iata: 'TIA' }, { en: "Saranda", iata: 'TIA' }, { en: "Ksamil", iata: 'TIA' }, { en: "Durres", iata: 'TIA' }, { en: "Dıraç", iata: 'TIA' }, { en: "Berat", iata: 'TIA' }, { en: "Gjirokaster", iata: 'TIA' }, { en: "Vlore", iata: 'TIA' }, { en: "Himare", iata: 'TIA' }, { en: "Shkoder", iata: 'TIA' }
  ],
  CY: [
    { en: "Ayia Napa", iata: 'LCA' }, { en: "Larnaca", iata: 'LCA' }, { en: "Larnaka", iata: 'LCA' }, { en: "Paphos", iata: 'PFO' }, { en: "Baf", iata: 'PFO' }, { en: "Limassol", iata: 'LCA' }, { en: "Limasol", iata: 'LCA' }, { en: "Protaras", iata: 'LCA' }, { en: "Nicosia", iata: 'LCA' }, { en: "Troodos", iata: 'PFO' }
  ],
  NO: [
    { en: "Oslo", iata: 'OSL' }, { en: "Bergen", iata: 'BGO' }, { en: "Geirangerfjord", iata: 'AES' }, { en: "Alesund", iata: 'AES' }, { en: "Tromso", iata: 'TOS' }, { en: "Tromsø", iata: 'TOS' }, { en: "Lofoten", iata: 'BOO' }, { en: "Stavanger", iata: 'SVG' }, { en: "Preikestolen", iata: 'SVG' }, { en: "Flam", iata: 'BGO' }, { en: "Trondheim", iata: 'TRD' }
  ],
  IS: [
    { en: "Reykjavik", iata: 'KEF' }, { en: "Reykjavík", iata: 'KEF' }, { en: "Golden Circle", iata: 'KEF' }, { en: "Blue Lagoon", iata: 'KEF' }, { en: "Vik", iata: 'KEF' }, { en: "Jokulsarlon", iata: 'KEF' }, { en: "Akureyri", iata: 'AEY' }, { en: "Snaefellsnes", iata: 'KEF' }
  ],
  QA: [
    { en: "Doha", iata: 'DOH' }, { en: "The Pearl", iata: 'DOH' }, { en: "Lusail", iata: 'DOH' }, { en: "West Bay", iata: 'DOH' }
  ],
  ZA: [
    { en: "Cape Town", iata: 'CPT' }, { en: "Table Mountain", iata: 'CPT' }, { en: "Stellenbosch", iata: 'CPT' }, { en: "Garden Route", iata: 'GRJ' }, { en: "Johannesburg", iata: 'JNB' }, { en: "Sandton", iata: 'JNB' }, { en: "Kruger Park", iata: 'MQP' }, { en: "Durban", iata: 'DUR' }, { en: "Port Elizabeth", iata: 'PLZ' }, { en: "Hermanus", iata: 'CPT' }
  ],
  SE: [
    { en: "Stockholm", iata: 'ARN' }, { en: "Gamla Stan", iata: 'ARN' }, { en: "Gothenburg", iata: 'GOT' }, { en: "Göteborg", iata: 'GOT' }, { en: "Malmö", iata: 'MMX' }, { en: "Kiruna", iata: 'KRN' }, { en: "Abisko", iata: 'KRN' }, { en: "Uppsala", iata: 'ARN' }, { en: "Visby", iata: 'VBY' }, { en: "Gotland", iata: 'VBY' }
  ],
  FI: [
    { en: "Helsinki", iata: 'HEL' }, { en: "Rovaniemi", iata: 'RVN' }, { en: "Lapland", iata: 'RVN' }, { en: "Laponya", iata: 'RVN' }, { en: "Levi", iata: 'KTT' }, { en: "Turku", iata: 'TKU' }, { en: "Tampere", iata: 'TMP' }, { en: "Porvoo", iata: 'HEL' }, { en: "Ivalo", iata: 'IVL' }, { en: "Saariselkä", iata: 'IVL' }
  ],
  RO: [
    { en: "Bucharest", iata: 'OTP' }, { en: "Bükreş", iata: 'OTP' }, { en: "Brasov", iata: 'OTP' }, { en: "Braşov", iata: 'OTP' }, { en: "Bran", iata: 'OTP' }, { en: "Sinaia", iata: 'OTP' }, { en: "Sibiu", iata: 'SBZ' }, { en: "Cluj-Napoca", iata: 'CLJ' }, { en: "Sighisoara", iata: 'TGM' }, { en: "Constanta", iata: 'CND' }, { en: "Köstence", iata: 'CND' }, { en: "Timisoara", iata: 'TSR' }
  ],
  BG: [
    { en: "Sofia", iata: 'SOF' }, { en: "Sofya", iata: 'SOF' }, { en: "Plovdiv", iata: 'PDV' }, { en: "Filibe", iata: 'PDV' }, { en: "Varna", iata: 'VAR' }, { en: "Golden Sands", iata: 'VAR' }, { en: "Burgas", iata: 'BOJ' }, { en: "Burgaz", iata: 'BOJ' }, { en: "Sunny Beach", iata: 'BOJ' }, { en: "Nessebar", iata: 'BOJ' }, { en: "Bansko", iata: 'SOF' }, { en: "Rila", iata: 'SOF' }, { en: "Veliko Tarnovo", iata: 'SOF' }
  ],
  SI: [
    { en: "Ljubljana", iata: 'LJU' }, { en: "Bled", iata: 'LJU' }, { en: "Lake Bohinj", iata: 'LJU' }, { en: "Piran", iata: 'TRS' }, { en: "Postojna", iata: 'LJU' }, { en: "Maribor", iata: 'MBX' }, { en: "Kranjska Gora", iata: 'LJU' }
  ],
  RS: [
    { en: "Belgrade", iata: 'BEG' }, { en: "Belgrad", iata: 'BEG' }, { en: "Novi Sad", iata: 'BEG' }, { en: "Niš", iata: 'INI' }, { en: "Nis", iata: 'INI' }, { en: "Zlatibor", iata: 'BEG' }, { en: "Kopaonik", iata: 'INI' }, { en: "Subotica", iata: 'BEG' }
  ],
  BA: [
    { en: "Sarajevo", iata: 'SJJ' }, { en: "Saraybosna", iata: 'SJJ' }, { en: "Mostar", iata: 'OMO' }, { en: "Banja Luka", iata: 'BNX' }, { en: "Tuzla", iata: 'TZL' }, { en: "Jajce", iata: 'SJJ' }, { en: "Blagaj", iata: 'OMO' }, { en: "Kravica", iata: 'OMO' }, { en: "Trebinje", iata: 'SJJ' }
  ],
  MT: [
    { en: "Valletta", iata: 'MLA' }, { en: "Sliema", iata: 'MLA' }, { en: "St. Julian's", iata: 'MLA' }, { en: "Mdina", iata: 'MLA' }, { en: "Gozo", iata: 'MLA' }, { en: "Comino", iata: 'MLA' }, { en: "Blue Lagoon", iata: 'MLA' }, { en: "Mellieha", iata: 'MLA' }, { en: "Bugibba", iata: 'MLA' }, { en: "Marsaxlokk", iata: 'MLA' }
  ],
  EE: [
    { en: "Tallinn", iata: 'TLL' }, { en: "Tartu", iata: 'TAY' }, { en: "Pärnu", iata: 'TLL' }, { en: "Parnu", iata: 'TLL' }, { en: "Saaremaa", iata: 'URE' }, { en: "Lahemaa", iata: 'TLL' }
  ],
  AZ: [
    { en: "Baku", iata: 'GYD' }, { en: "Bakü", iata: 'GYD' }, { en: "Gabala", iata: 'GBB' }, { en: "Gebele", iata: 'GBB' }, { en: "Sheki", iata: 'GYD' }, { en: "Şeki", iata: 'GYD' }, { en: "Gobustan", iata: 'GYD' }, { en: "Ganja", iata: 'KVD' }, { en: "Gence", iata: 'KVD' }, { en: "Nakhchivan", iata: 'NAJ' }, { en: "Nahçıvan", iata: 'NAJ' }, { en: "Shahdag", iata: 'GYD' }
  ],
  UZ: [
    { en: "Tashkent", iata: 'TAS' }, { en: "Taşkent", iata: 'TAS' }, { en: "Samarkand", iata: 'SKD' }, { en: "Semerkant", iata: 'SKD' }, { en: "Bukhara", iata: 'BHK' }, { en: "Buhara", iata: 'BHK' }, { en: "Khiva", iata: 'UGC' }, { en: "Hive", iata: 'UGC' }, { en: "Urgench", iata: 'UGC' }, { en: "Fergana", iata: 'FEG' }
  ],
  KZ: [
    { en: "Almaty", iata: 'ALA' }, { en: "Almatı", iata: 'ALA' }, { en: "Astana", iata: 'NQZ' }, { en: "Shymkent", iata: 'CIT' }, { en: "Çimkent", iata: 'CIT' }, { en: "Turkistan", iata: 'HSA' }, { en: "Türkistan", iata: 'HSA' }, { en: "Charyn Canyon", iata: 'ALA' }, { en: "Kolsai", iata: 'ALA' }, { en: "Shymbulak", iata: 'ALA' }, { en: "Big Almaty Lake", iata: 'ALA' }
  ],
  OM: [
    { en: "Muscat", iata: 'MCT' }, { en: "Maskat", iata: 'MCT' }, { en: "Salalah", iata: 'SLL' }, { en: "Nizwa", iata: 'MCT' }, { en: "Sur", iata: 'MCT' }, { en: "Wadi Shab", iata: 'MCT' }, { en: "Wahiba Sands", iata: 'MCT' }, { en: "Musandam", iata: 'KHS' }, { en: "Khasab", iata: 'KHS' }, { en: "Jebel Akhdar", iata: 'MCT' }
  ],
  BH: [
    { en: "Manama", iata: 'BAH' }, { en: "Bahrain", iata: 'BAH' }, { en: "Bahreyn", iata: 'BAH' }, { en: "Muharraq", iata: 'BAH' }, { en: "Amwaj", iata: 'BAH' }, { en: "Sakhir", iata: 'BAH' }
  ],
  TW: [
    { en: "Taipei", iata: 'TPE' }, { en: "Jiufen", iata: 'TPE' }, { en: "Taroko", iata: 'HUN' }, { en: "Hualien", iata: 'HUN' }, { en: "Taichung", iata: 'RMQ' }, { en: "Sun Moon Lake", iata: 'RMQ' }, { en: "Tainan", iata: 'TNN' }, { en: "Kaohsiung", iata: 'KHH' }, { en: "Kenting", iata: 'KHH' }, { en: "Alishan", iata: 'RMQ' }
  ],
  KH: [
    { en: "Siem Reap", iata: 'SAI' }, { en: "Angkor", iata: 'SAI' }, { en: "Angkor Wat", iata: 'SAI' }, { en: "Phnom Penh", iata: 'KTI' }, { en: "Sihanoukville", iata: 'KOS' }, { en: "Koh Rong", iata: 'KOS' }, { en: "Kampot", iata: 'KTI' }, { en: "Kep", iata: 'KTI' }, { en: "Battambang", iata: 'SAI' }
  ],
  LA: [
    { en: "Vientiane", iata: 'VTE' }, { en: "Luang Prabang", iata: 'LPQ' }, { en: "Vang Vieng", iata: 'VTE' }, { en: "Pakse", iata: 'PKZ' }, { en: "4000 Islands", iata: 'PKZ' }, { en: "Kuang Si", iata: 'LPQ' }
  ],
  NP: [
    { en: "Kathmandu", iata: 'KTM' }, { en: "Katmandu", iata: 'KTM' }, { en: "Thamel", iata: 'KTM' }, { en: "Pokhara", iata: 'PKR' }, { en: "Chitwan", iata: 'BHR' }, { en: "Lukla", iata: 'LUA' }, { en: "Everest", iata: 'LUA' }, { en: "Annapurna", iata: 'PKR' }, { en: "Bhaktapur", iata: 'KTM' }, { en: "Nagarkot", iata: 'KTM' }, { en: "Lumbini", iata: 'BWA' }
  ],
  KE: [
    { en: "Nairobi", iata: 'NBO' }, { en: "Masai Mara", iata: 'NBO' }, { en: "Maasai Mara", iata: 'NBO' }, { en: "Mombasa", iata: 'MBA' }, { en: "Diani", iata: 'UKA' }, { en: "Diani Beach", iata: 'UKA' }, { en: "Malindi", iata: 'MYD' }, { en: "Watamu", iata: 'MYD' }, { en: "Amboseli", iata: 'NBO' }, { en: "Lake Naivasha", iata: 'NBO' }, { en: "Lamu", iata: 'LAU' }
  ],
  TZ: [
    { en: "Zanzibar", iata: 'ZNZ' }, { en: "Stone Town", iata: 'ZNZ' }, { en: "Nungwi", iata: 'ZNZ' }, { en: "Paje", iata: 'ZNZ' }, { en: "Kendwa", iata: 'ZNZ' }, { en: "Arusha", iata: 'JRO' }, { en: "Kilimanjaro", iata: 'JRO' }, { en: "Serengeti", iata: 'JRO' }, { en: "Ngorongoro", iata: 'JRO' }, { en: "Dar es Salaam", iata: 'DAR' }, { en: "Darüsselam", iata: 'DAR' }, { en: "Moshi", iata: 'JRO' }
  ],
  NL: [
    { en: "Amsterdam", iata: 'AMS' }, { en: "Rotterdam", iata: 'RTM' }, { en: "The Hague", iata: 'AMS' }, { en: "Lahey", iata: 'AMS' }, { en: "Utrecht", iata: 'AMS' }, { en: "Zaanse Schans", iata: 'AMS' }, { en: "Keukenhof", iata: 'AMS' }, { en: "Giethoorn", iata: 'AMS' }, { en: "Haarlem", iata: 'AMS' }, { en: "Delft", iata: 'RTM' }, { en: "Eindhoven", iata: 'EIN' }, { en: "Maastricht", iata: 'MST' }, { en: "Kinderdijk", iata: 'RTM' }
  ],
  CA: [
    { en: "Toronto", iata: 'YYZ' }, { en: "Niagara Falls", iata: 'YYZ' }, { en: "Vancouver", iata: 'YVR' }, { en: "Whistler", iata: 'YVR' }, { en: "Victoria", iata: 'YYJ' }, { en: "Montreal", iata: 'YUL' }, { en: "Quebec City", iata: 'YQB' }, { en: "Ottawa", iata: 'YOW' }, { en: "Banff", iata: 'YYC' }, { en: "Lake Louise", iata: 'YYC' }, { en: "Jasper", iata: 'YEG' }, { en: "Calgary", iata: 'YYC' }, { en: "Halifax", iata: 'YHZ' }
  ],
  MY: [
    { en: "Kuala Lumpur", iata: 'KUL' }, { en: "Langkawi", iata: 'LGK' }, { en: "Penang", iata: 'PEN' }, { en: "George Town", iata: 'PEN' }, { en: "Malacca", iata: 'KUL' }, { en: "Melaka", iata: 'KUL' }, { en: "Cameron Highlands", iata: 'KUL' }, { en: "Kota Kinabalu", iata: 'BKI' }, { en: "Borneo", iata: 'BKI' }, { en: "Kuching", iata: 'KCH' }, { en: "Perhentian Islands", iata: 'KBR' }, { en: "Tioman", iata: 'SIN' }, { en: "Ipoh", iata: 'IPH' }
  ],
  PL: [
    { en: "Warsaw", iata: 'WAW' }, { en: "Varşova", iata: 'WAW' }, { en: "Krakow", iata: 'KRK' }, { en: "Kraków", iata: 'KRK' }, { en: "Krakov", iata: 'KRK' }, { en: "Zakopane", iata: 'KRK' }, { en: "Wieliczka", iata: 'KRK' }, { en: "Auschwitz", iata: 'KRK' }, { en: "Gdansk", iata: 'GDN' }, { en: "Gdańsk", iata: 'GDN' }, { en: "Sopot", iata: 'GDN' }, { en: "Wroclaw", iata: 'WRO' }, { en: "Wrocław", iata: 'WRO' }, { en: "Poznan", iata: 'POZ' }, { en: "Torun", iata: 'BZG' }, { en: "Lodz", iata: 'LCJ' }
  ],
  HR: [
    { en: "Dubrovnik", iata: 'DBV' }, { en: "Split", iata: 'SPU' }, { en: "Hvar", iata: 'SPU' }, { en: "Brac", iata: 'SPU' }, { en: "Makarska", iata: 'SPU' }, { en: "Zagreb", iata: 'ZAG' }, { en: "Plitvice Lakes", iata: 'ZAG' }, { en: "Zadar", iata: 'ZAD' }, { en: "Krka", iata: 'SPU' }, { en: "Pula", iata: 'PUY' }, { en: "Rovinj", iata: 'PUY' }, { en: "Istria", iata: 'PUY' }, { en: "Korcula", iata: 'DBV' }, { en: "Rijeka", iata: 'RJK' }
  ],
  HU: [
    { en: "Budapest", iata: 'BUD' }, { en: "Budapeşte", iata: 'BUD' }, { en: "Lake Balaton", iata: 'BUD' }, { en: "Balaton", iata: 'BUD' }, { en: "Eger", iata: 'BUD' }, { en: "Szentendre", iata: 'BUD' }, { en: "Pécs", iata: 'BUD' }, { en: "Debrecen", iata: 'DEB' }, { en: "Hévíz", iata: 'SOB' }
  ],
  EG: [
    { en: "Cairo", iata: 'CAI' }, { en: "Kahire", iata: 'CAI' }, { en: "Giza", iata: 'CAI' }, { en: "Gize", iata: 'CAI' }, { en: "Luxor", iata: 'LXR' }, { en: "Luksor", iata: 'LXR' }, { en: "Aswan", iata: 'ASW' }, { en: "Asvan", iata: 'ASW' }, { en: "Abu Simbel", iata: 'ABS' }, { en: "Hurghada", iata: 'HRG' }, { en: "Hurgada", iata: 'HRG' }, { en: "El Gouna", iata: 'HRG' }, { en: "Sharm El Sheikh", iata: 'SSH' }, { en: "Şarm El Şeyh", iata: 'SSH' }, { en: "Dahab", iata: 'SSH' }, { en: "Marsa Alam", iata: 'RMF' }, { en: "Alexandria", iata: 'HBE' }, { en: "İskenderiye", iata: 'HBE' }, { en: "Siwa", iata: 'CAI' }
  ],
  MA: [
    { en: "Marrakech", iata: 'RAK' }, { en: "Marakeş", iata: 'RAK' }, { en: "Casablanca", iata: 'CMN' }, { en: "Kazablanka", iata: 'CMN' }, { en: "Agadir", iata: 'AGA' }, { en: "Fes", iata: 'FEZ' }, { en: "Fas", iata: 'FEZ' }, { en: "Chefchaouen", iata: 'TNG' }, { en: "Şafşavan", iata: 'TNG' }, { en: "Tangier", iata: 'TNG' }, { en: "Tanca", iata: 'TNG' }, { en: "Rabat", iata: 'RBA' }, { en: "Essaouira", iata: 'ESU' }, { en: "Merzouga", iata: 'ERH' }, { en: "Sahara", iata: 'ERH' }, { en: "Ouarzazate", iata: 'OZZ' }, { en: "Atlas Mountains", iata: 'RAK' }
  ],
  VN: [
    { en: "Hanoi", iata: 'HAN' }, { en: "Ha Long Bay", iata: 'HAN' }, { en: "Halong", iata: 'HAN' }, { en: "Ninh Binh", iata: 'HAN' }, { en: "Sapa", iata: 'HAN' }, { en: "Ho Chi Minh City", iata: 'SGN' }, { en: "Saigon", iata: 'SGN' }, { en: "Mekong Delta", iata: 'SGN' }, { en: "Da Nang", iata: 'DAD' }, { en: "Hoi An", iata: 'DAD' }, { en: "Hue", iata: 'HUI' }, { en: "Nha Trang", iata: 'CXR' }, { en: "Da Lat", iata: 'DLI' }, { en: "Phu Quoc", iata: 'PQC' }, { en: "Mui Ne", iata: 'SGN' }
  ],
  KR: [
    { en: "Seoul", iata: 'ICN' }, { en: "Seul", iata: 'ICN' }, { en: "Busan", iata: 'PUS' }, { en: "Jeju", iata: 'CJU' }, { en: "Gyeongju", iata: 'PUS' }, { en: "Incheon", iata: 'ICN' }, { en: "Daegu", iata: 'TAE' }, { en: "Gangneung", iata: 'ICN' }, { en: "Sokcho", iata: 'ICN' }, { en: "Jeonju", iata: 'ICN' }, { en: "DMZ", iata: 'ICN' }
  ],
  ID: [
    { en: "Bali", iata: 'DPS' }, { en: "Ubud", iata: 'DPS' }, { en: "Seminyak", iata: 'DPS' }, { en: "Kuta", iata: 'DPS' }, { en: "Canggu", iata: 'DPS' }, { en: "Uluwatu", iata: 'DPS' }, { en: "Nusa Penida", iata: 'DPS' }, { en: "Gili Islands", iata: 'LOP' }, { en: "Lombok", iata: 'LOP' }, { en: "Jakarta", iata: 'CGK' }, { en: "Cakarta", iata: 'CGK' }, { en: "Yogyakarta", iata: 'YIA' }, { en: "Borobudur", iata: 'YIA' }, { en: "Komodo", iata: 'LBJ' }, { en: "Labuan Bajo", iata: 'LBJ' }, { en: "Raja Ampat", iata: 'SOQ' }, { en: "Bromo", iata: 'SUB' }, { en: "Surabaya", iata: 'SUB' }
  ],
  CH: [
    { en: "Zurich", iata: 'ZRH' }, { en: "Zürih", iata: 'ZRH' }, { en: "Geneva", iata: 'GVA' }, { en: "Cenevre", iata: 'GVA' }, { en: "Interlaken", iata: 'ZRH' }, { en: "Jungfraujoch", iata: 'ZRH' }, { en: "Grindelwald", iata: 'ZRH' }, { en: "Lauterbrunnen", iata: 'ZRH' }, { en: "Lucerne", iata: 'ZRH' }, { en: "Luzern", iata: 'ZRH' }, { en: "Zermatt", iata: 'GVA' }, { en: "Matterhorn", iata: 'GVA' }, { en: "Bern", iata: 'BRN' }, { en: "Basel", iata: 'BSL' }, { en: "Lugano", iata: 'LUG' }, { en: "St. Moritz", iata: 'ZRH' }, { en: "Montreux", iata: 'GVA' }, { en: "Lausanne", iata: 'GVA' }
  ],
  CZ: [
    { en: "Prague", iata: 'PRG' }, { en: "Prag", iata: 'PRG' }, { en: "Cesky Krumlov", iata: 'PRG' }, { en: "Český Krumlov", iata: 'PRG' }, { en: "Karlovy Vary", iata: 'KLV' }, { en: "Kutna Hora", iata: 'PRG' }, { en: "Brno", iata: 'BRQ' }, { en: "Olomouc", iata: 'BRQ' }, { en: "Plzen", iata: 'PRG' }
  ],
  SG: [
    { en: "Singapore", iata: 'SIN' }, { en: "Singapur", iata: 'SIN' }, { en: "Sentosa", iata: 'SIN' }, { en: "Marina Bay", iata: 'SIN' }, { en: "Orchard Road", iata: 'SIN' }, { en: "Chinatown", iata: 'SIN' }
  ],
  IN: [
    { en: "New Delhi", iata: 'DEL' }, { en: "Delhi", iata: 'DEL' }, { en: "Yeni Delhi", iata: 'DEL' }, { en: "Agra", iata: 'DEL' }, { en: "Taj Mahal", iata: 'DEL' }, { en: "Jaipur", iata: 'JAI' }, { en: "Udaipur", iata: 'UDR' }, { en: "Jodhpur", iata: 'JDH' }, { en: "Mumbai", iata: 'BOM' }, { en: "Goa", iata: 'GOI' }, { en: "Kerala", iata: 'COK' }, { en: "Kochi", iata: 'COK' }, { en: "Varanasi", iata: 'VNS' }, { en: "Rishikesh", iata: 'DED' }, { en: "Bangalore", iata: 'BLR' }, { en: "Chennai", iata: 'MAA' }, { en: "Kolkata", iata: 'CCU' }, { en: "Darjeeling", iata: 'IXB' }, { en: "Leh", iata: 'IXL' }, { en: "Ladakh", iata: 'IXL' }
  ],
  DK: [
    { en: "Copenhagen", iata: 'CPH' }, { en: "Kopenhag", iata: 'CPH' }, { en: "Aarhus", iata: 'AAR' }, { en: "Odense", iata: 'CPH' }, { en: "Billund", iata: 'BLL' }, { en: "Legoland", iata: 'BLL' }, { en: "Skagen", iata: 'AAL' }, { en: "Aalborg", iata: 'AAL' }, { en: "Roskilde", iata: 'CPH' }
  ],
  IE: [
    { en: "Dublin", iata: 'DUB' }, { en: "Galway", iata: 'SNN' }, { en: "Cliffs of Moher", iata: 'SNN' }, { en: "Cork", iata: 'ORK' }, { en: "Killarney", iata: 'KIR' }, { en: "Ring of Kerry", iata: 'KIR' }, { en: "Dingle", iata: 'KIR' }, { en: "Kilkenny", iata: 'DUB' }, { en: "Belfast", iata: 'BFS' }, { en: "Giant's Causeway", iata: 'BFS' }
  ],
  BE: [
    { en: "Brussels", iata: 'BRU' }, { en: "Brüksel", iata: 'BRU' }, { en: "Bruges", iata: 'BRU' }, { en: "Brugge", iata: 'BRU' }, { en: "Antwerp", iata: 'BRU' }, { en: "Anvers", iata: 'BRU' }, { en: "Ghent", iata: 'BRU' }, { en: "Gent", iata: 'BRU' }, { en: "Leuven", iata: 'BRU' }, { en: "Liège", iata: 'LGG' }, { en: "Dinant", iata: 'CRL' }, { en: "Ostend", iata: 'OST' }
  ],
  HK: [
    { en: "Hong Kong", iata: 'HKG' }, { en: "Kowloon", iata: 'HKG' }, { en: "Tsim Sha Tsui", iata: 'HKG' }, { en: "Lantau", iata: 'HKG' }, { en: "Victoria Peak", iata: 'HKG' }, { en: "Macau", iata: 'MFM' }, { en: "Makao", iata: 'MFM' }
  ],
  BR: [
    { en: "Rio de Janeiro", iata: 'GIG' }, { en: "Copacabana", iata: 'GIG' }, { en: "Ipanema", iata: 'GIG' }, { en: "Sao Paulo", iata: 'GRU' }, { en: "São Paulo", iata: 'GRU' }, { en: "Salvador", iata: 'SSA' }, { en: "Florianopolis", iata: 'FLN' }, { en: "Foz do Iguacu", iata: 'IGU' }, { en: "Iguazu", iata: 'IGU' }, { en: "Manaus", iata: 'MAO' }, { en: "Amazon", iata: 'MAO' }, { en: "Recife", iata: 'REC' }, { en: "Fortaleza", iata: 'FOR' }, { en: "Natal", iata: 'NAT' }, { en: "Fernando de Noronha", iata: 'FEN' }, { en: "Paraty", iata: 'GIG' }, { en: "Buzios", iata: 'GIG' }, { en: "Brasilia", iata: 'BSB' }, { en: "Lençóis Maranhenses", iata: 'SLZ' }
  ],
  SA: [
    { en: 'Riyadh', iata: 'RUH' }, { en: 'Riyad', iata: 'RUH' }, { en: 'Diriyah', iata: 'RUH' }, { en: 'Edge of the World', iata: 'RUH' }, { en: 'Jeddah', iata: 'JED' }, { en: 'Cidde', iata: 'JED' }, { en: 'Mecca', iata: 'JED' }, { en: 'Mekke', iata: 'JED' }, { en: 'Makkah', iata: 'JED' }, { en: 'Medina', iata: 'MED' }, { en: 'Medine', iata: 'MED' }, { en: 'AlUla', iata: 'ULH' }, { en: 'Hegra', iata: 'ULH' }, { en: 'Taif', iata: 'TIF' }, { en: 'Abha', iata: 'AHB' }, { en: 'Dammam', iata: 'DMM' }, { en: 'Al Khobar', iata: 'DMM' }, { en: 'Red Sea', iata: 'RSI' }, { en: 'Tabuk', iata: 'TUU' }, { en: 'NEOM', iata: 'TUU' }
  ],
  AT: [
    { en: 'Vienna', iata: 'VIE' }, { en: 'Viyana', iata: 'VIE' }, { en: 'Salzburg', iata: 'SZG' }, { en: 'Hallstatt', iata: 'SZG' }, { en: 'St. Wolfgang', iata: 'SZG' }, { en: 'Zell am See', iata: 'SZG' }, { en: 'Kaprun', iata: 'SZG' }, { en: 'Innsbruck', iata: 'INN' }, { en: 'Tyrol', iata: 'INN' }, { en: 'Kitzbühel', iata: 'INN' }, { en: 'St. Anton', iata: 'INN' }, { en: 'Ischgl', iata: 'INN' }, { en: 'Mayrhofen', iata: 'INN' }, { en: 'Sölden', iata: 'INN' }, { en: 'Graz', iata: 'GRZ' }, { en: 'Linz', iata: 'LNZ' }, { en: 'Klagenfurt', iata: 'KLU' }, { en: 'Wörthersee', iata: 'KLU' }, { en: 'Wachau', iata: 'VIE' }, { en: 'Bad Gastein', iata: 'SZG' }
  ],
  CN: [
    { en: 'Beijing', iata: 'PEK' }, { en: 'Pekin', iata: 'PEK' }, { en: 'Great Wall', iata: 'PEK' }, { en: 'Çin Seddi', iata: 'PEK' }, { en: 'Shanghai', iata: 'PVG' }, { en: 'Şanghay', iata: 'PVG' }, { en: 'Hangzhou', iata: 'HGH' }, { en: 'Suzhou', iata: 'SHA' }, { en: 'Guangzhou', iata: 'CAN' }, { en: 'Shenzhen', iata: 'SZX' }, { en: 'Xi’an', iata: 'XIY' }, { en: 'Xian', iata: 'XIY' }, { en: 'Şian', iata: 'XIY' }, { en: 'Chengdu', iata: 'TFU' }, { en: 'Chongqing', iata: 'CKG' }, { en: 'Guilin', iata: 'KWL' }, { en: 'Yangshuo', iata: 'KWL' }, { en: 'Zhangjiajie', iata: 'DYG' }, { en: 'Kunming', iata: 'KMG' }, { en: 'Lijiang', iata: 'LJG' }, { en: 'Dali', iata: 'DLU' }, { en: 'Harbin', iata: 'HRB' }, { en: 'Sanya', iata: 'SYX' }, { en: 'Hainan', iata: 'SYX' }, { en: 'Lhasa', iata: 'LXA' }, { en: 'Tibet', iata: 'LXA' }, { en: 'Huangshan', iata: 'TXN' }, { en: 'Xiamen', iata: 'XMN' }, { en: 'Qingdao', iata: 'TAO' }
  ],
  AE: [
    { en: 'Dubai', iata: 'DXB' }, { en: 'Downtown Dubai', iata: 'DXB' }, { en: 'Dubai Marina', iata: 'DXB' }, { en: 'Palm Jumeirah', iata: 'DXB' }, { en: 'JBR', iata: 'DXB' }, { en: 'Abu Dhabi', iata: 'AUH' }, { en: 'Abu Dabi', iata: 'AUH' }, { en: 'Yas Island', iata: 'AUH' }, { en: 'Saadiyat', iata: 'AUH' }, { en: 'Sharjah', iata: 'SHJ' }, { en: 'Şarika', iata: 'SHJ' }, { en: 'Ajman', iata: 'SHJ' }, { en: 'Ras Al Khaimah', iata: 'DXB' }, { en: 'Fujairah', iata: 'FJR' }, { en: 'Al Ain', iata: 'AUH' }, { en: 'Hatta', iata: 'DXB' }, { en: 'Liwa', iata: 'AUH' }
  ],
  PT: [
    { en: 'Lisbon', iata: 'LIS' }, { en: 'Lizbon', iata: 'LIS' }, { en: 'Sintra', iata: 'LIS' }, { en: 'Cascais', iata: 'LIS' }, { en: 'Estoril', iata: 'LIS' }, { en: 'Óbidos', iata: 'LIS' }, { en: 'Nazaré', iata: 'LIS' }, { en: 'Fátima', iata: 'LIS' }, { en: 'Porto', iata: 'OPO' }, { en: 'Douro Valley', iata: 'OPO' }, { en: 'Braga', iata: 'OPO' }, { en: 'Guimarães', iata: 'OPO' }, { en: 'Aveiro', iata: 'OPO' }, { en: 'Coimbra', iata: 'OPO' }, { en: 'Algarve', iata: 'FAO' }, { en: 'Faro', iata: 'FAO' }, { en: 'Albufeira', iata: 'FAO' }, { en: 'Lagos', iata: 'FAO' }, { en: 'Vilamoura', iata: 'FAO' }, { en: 'Portimão', iata: 'FAO' }, { en: 'Tavira', iata: 'FAO' }, { en: 'Évora', iata: 'LIS' }, { en: 'Madeira', iata: 'FNC' }, { en: 'Funchal', iata: 'FNC' }, { en: 'Azores', iata: 'PDL' }, { en: 'Azor Adaları', iata: 'PDL' }, { en: 'Ponta Delgada', iata: 'PDL' }, { en: 'Comporta', iata: 'LIS' }, { en: 'Ericeira', iata: 'LIS' }
  ],
  MX: [
    { en: 'Cancun', iata: 'CUN' }, { en: 'Cancún', iata: 'CUN' }, { en: 'Playa del Carmen', iata: 'CUN' }, { en: 'Tulum', iata: 'CUN' }, { en: 'Cozumel', iata: 'CZM' }, { en: 'Isla Mujeres', iata: 'CUN' }, { en: 'Holbox', iata: 'CUN' }, { en: 'Bacalar', iata: 'CUN' }, { en: 'Chichen Itza', iata: 'CUN' }, { en: 'Merida', iata: 'MID' }, { en: 'Mérida', iata: 'MID' }, { en: 'Mexico City', iata: 'MEX' }, { en: 'Teotihuacan', iata: 'MEX' }, { en: 'Puebla', iata: 'PBC' }, { en: 'Oaxaca', iata: 'OAX' }, { en: 'Guadalajara', iata: 'GDL' }, { en: 'Puerto Vallarta', iata: 'PVR' }, { en: 'Los Cabos', iata: 'SJD' }, { en: 'Cabo San Lucas', iata: 'SJD' }, { en: 'La Paz', iata: 'LAP' }, { en: 'San Miguel de Allende', iata: 'BJX' }, { en: 'Guanajuato', iata: 'BJX' }, { en: 'Monterrey', iata: 'MTY' }, { en: 'Acapulco', iata: 'ACA' }, { en: 'Huatulco', iata: 'HUX' }, { en: 'Puerto Escondido', iata: 'PXM' }, { en: 'Chiapas', iata: 'TGZ' }, { en: 'San Cristobal de las Casas', iata: 'TGZ' }, { en: 'Mazatlan', iata: 'MZT' }
  ],
  GB: [
    { en: 'London', iata: 'LHR' }, { en: 'Londra', iata: 'LHR' }, { en: 'Oxford', iata: 'LHR' }, { en: 'Cambridge', iata: 'STN' }, { en: 'Windsor', iata: 'LHR' }, { en: 'Stonehenge', iata: 'LHR' }, { en: 'Bath', iata: 'BRS' }, { en: 'Bristol', iata: 'BRS' }, { en: 'Cotswolds', iata: 'BRS' }, { en: 'Brighton', iata: 'LGW' }, { en: 'Canterbury', iata: 'LGW' }, { en: 'Dover', iata: 'LGW' }, { en: 'Manchester', iata: 'MAN' }, { en: 'Liverpool', iata: 'LPL' }, { en: 'Lake District', iata: 'MAN' }, { en: 'York', iata: 'LBA' }, { en: 'Leeds', iata: 'LBA' }, { en: 'Newcastle', iata: 'NCL' }, { en: 'Birmingham', iata: 'BHX' }, { en: 'Cornwall', iata: 'NQY' }, { en: 'Edinburgh', iata: 'EDI' }, { en: 'Edinburg', iata: 'EDI' }, { en: 'Glasgow', iata: 'GLA' }, { en: 'Scottish Highlands', iata: 'INV' }, { en: 'Inverness', iata: 'INV' }, { en: 'Isle of Skye', iata: 'INV' }, { en: 'Loch Ness', iata: 'INV' }, { en: 'Cardiff', iata: 'CWL' }, { en: 'Wales', iata: 'CWL' }, { en: 'Belfast', iata: 'BFS' }, { en: 'Northern Ireland', iata: 'BFS' }
  ],
  DE: [
    { en: 'Berlin', iata: 'BER' }, { en: 'Potsdam', iata: 'BER' }, { en: 'Munich', iata: 'MUC' }, { en: 'Münih', iata: 'MUC' }, { en: 'Neuschwanstein', iata: 'MUC' }, { en: 'Bavarian Alps', iata: 'MUC' }, { en: 'Garmisch-Partenkirchen', iata: 'MUC' }, { en: 'Nuremberg', iata: 'NUE' }, { en: 'Frankfurt', iata: 'FRA' }, { en: 'Heidelberg', iata: 'FRA' }, { en: 'Rhine Valley', iata: 'FRA' }, { en: 'Rüdesheim', iata: 'FRA' }, { en: 'Hamburg', iata: 'HAM' }, { en: 'Cologne', iata: 'CGN' }, { en: 'Köln', iata: 'CGN' }, { en: 'Düsseldorf', iata: 'DUS' }, { en: 'Bonn', iata: 'CGN' }, { en: 'Stuttgart', iata: 'STR' }, { en: 'Black Forest', iata: 'STR' }, { en: 'Freiburg', iata: 'BSL' }, { en: 'Dresden', iata: 'DRS' }, { en: 'Leipzig', iata: 'LEJ' }, { en: 'Bremen', iata: 'BRE' }, { en: 'Hannover', iata: 'HAJ' }, { en: 'Rothenburg ob der Tauber', iata: 'NUE' }, { en: 'Lake Constance', iata: 'FDH' }, { en: 'Sylt', iata: 'GWT' }, { en: 'Rügen', iata: 'BER' }
  ],
  JP: [
    { en: 'Tokyo', iata: 'HND' }, { en: 'Shinjuku', iata: 'HND' }, { en: 'Shibuya', iata: 'HND' }, { en: 'Asakusa', iata: 'HND' }, { en: 'Mount Fuji', iata: 'HND' }, { en: 'Hakone', iata: 'HND' }, { en: 'Kamakura', iata: 'HND' }, { en: 'Nikko', iata: 'HND' }, { en: 'Yokohama', iata: 'HND' }, { en: 'Kyoto', iata: 'KIX' }, { en: 'Nara', iata: 'KIX' }, { en: 'Osaka', iata: 'KIX' }, { en: 'Kobe', iata: 'UKB' }, { en: 'Himeji', iata: 'KIX' }, { en: 'Hiroshima', iata: 'HIJ' }, { en: 'Miyajima', iata: 'HIJ' }, { en: 'Nagoya', iata: 'NGO' }, { en: 'Takayama', iata: 'NGO' }, { en: 'Shirakawa-go', iata: 'KMQ' }, { en: 'Kanazawa', iata: 'KMQ' }, { en: 'Sapporo', iata: 'CTS' }, { en: 'Hokkaido', iata: 'CTS' }, { en: 'Niseko', iata: 'CTS' }, { en: 'Otaru', iata: 'CTS' }, { en: 'Fukuoka', iata: 'FUK' }, { en: 'Nagasaki', iata: 'NGS' }, { en: 'Kagoshima', iata: 'KOJ' }, { en: 'Okinawa', iata: 'OKA' }, { en: 'Naha', iata: 'OKA' }, { en: 'Ishigaki', iata: 'ISG' }, { en: 'Sendai', iata: 'SDJ' }
  ],
  GR: [
    { en: 'Athens', iata: 'ATH' }, { en: 'Atina', iata: 'ATH' }, { en: 'Piraeus', iata: 'ATH' }, { en: 'Delphi', iata: 'ATH' }, { en: 'Meteora', iata: 'SKG' }, { en: 'Thessaloniki', iata: 'SKG' }, { en: 'Selanik', iata: 'SKG' }, { en: 'Halkidiki', iata: 'SKG' }, { en: 'Santorini', iata: 'JTR' }, { en: 'Oia', iata: 'JTR' }, { en: 'Mykonos', iata: 'JMK' }, { en: 'Mikonos', iata: 'JMK' }, { en: 'Paros', iata: 'PAS' }, { en: 'Naxos', iata: 'JNX' }, { en: 'Milos', iata: 'MLO' }, { en: 'Crete', iata: 'HER' }, { en: 'Girit', iata: 'HER' }, { en: 'Heraklion', iata: 'HER' }, { en: 'Chania', iata: 'CHQ' }, { en: 'Rethymno', iata: 'CHQ' }, { en: 'Rhodes', iata: 'RHO' }, { en: 'Rodos', iata: 'RHO' }, { en: 'Kos', iata: 'KGS' }, { en: 'Corfu', iata: 'CFU' }, { en: 'Korfu', iata: 'CFU' }, { en: 'Zakynthos', iata: 'ZTH' }, { en: 'Kefalonia', iata: 'EFL' }, { en: 'Lefkada', iata: 'PVK' }, { en: 'Nafplio', iata: 'ATH' }, { en: 'Peloponnese', iata: 'KLX' }, { en: 'Kalamata', iata: 'KLX' }, { en: 'Thassos', iata: 'KVA' }, { en: 'Skiathos', iata: 'JSI' }
  ],
  FR: [
    { en: 'Paris', iata: 'CDG' }, { en: 'Versailles', iata: 'CDG' }, { en: 'Disneyland Paris', iata: 'CDG' }, { en: 'Nice', iata: 'NCE' }, { en: 'Cannes', iata: 'NCE' }, { en: 'Antibes', iata: 'NCE' }, { en: 'Menton', iata: 'NCE' }, { en: 'Saint-Tropez', iata: 'NCE' }, { en: 'Monaco', iata: 'NCE' }, { en: 'Lyon', iata: 'LYS' }, { en: 'Annecy', iata: 'GVA' }, { en: 'Chamonix', iata: 'GVA' }, { en: 'Marseille', iata: 'MRS' }, { en: 'Aix-en-Provence', iata: 'MRS' }, { en: 'Avignon', iata: 'MRS' }, { en: 'Arles', iata: 'MRS' }, { en: 'Cassis', iata: 'MRS' }, { en: 'Montpellier', iata: 'MPL' }, { en: 'Toulouse', iata: 'TLS' }, { en: 'Carcassonne', iata: 'TLS' }, { en: 'Bordeaux', iata: 'BOD' }, { en: 'Biarritz', iata: 'BIQ' }, { en: 'Strasbourg', iata: 'SXB' }, { en: 'Colmar', iata: 'SXB' }, { en: 'Lille', iata: 'LIL' }, { en: 'Nantes', iata: 'NTE' }, { en: 'Mont-Saint-Michel', iata: 'RNS' }, { en: 'Rennes', iata: 'RNS' }, { en: 'Saint-Malo', iata: 'RNS' }, { en: 'Normandy', iata: 'CDG' }, { en: 'Reims', iata: 'CDG' }, { en: 'Loire Valley', iata: 'NTE' }, { en: 'Corsica', iata: 'AJA' }, { en: 'Ajaccio', iata: 'AJA' }, { en: 'Bastia', iata: 'BIA' }, { en: 'Provence', iata: 'MRS' }, { en: 'French Riviera', iata: 'NCE' }
  ],
  ES: [
    { en: 'Madrid', iata: 'MAD' }, { en: 'Toledo', iata: 'MAD' }, { en: 'Segovia', iata: 'MAD' }, { en: 'Barcelona', iata: 'BCN' }, { en: 'Girona', iata: 'GRO' }, { en: 'Costa Brava', iata: 'GRO' }, { en: 'Sitges', iata: 'BCN' }, { en: 'Valencia', iata: 'VLC' }, { en: 'Alicante', iata: 'ALC' }, { en: 'Benidorm', iata: 'ALC' }, { en: 'Malaga', iata: 'AGP' }, { en: 'Marbella', iata: 'AGP' }, { en: 'Torremolinos', iata: 'AGP' }, { en: 'Nerja', iata: 'AGP' }, { en: 'Ronda', iata: 'AGP' }, { en: 'Granada', iata: 'GRX' }, { en: 'Seville', iata: 'SVQ' }, { en: 'Cordoba', iata: 'SVQ' }, { en: 'Cadiz', iata: 'XRY' }, { en: 'Bilbao', iata: 'BIO' }, { en: 'San Sebastian', iata: 'EAS' }, { en: 'Santiago de Compostela', iata: 'SCQ' }, { en: 'Zaragoza', iata: 'ZAZ' }, { en: 'Mallorca', iata: 'PMI' }, { en: 'Palma de Mallorca', iata: 'PMI' }, { en: 'Ibiza', iata: 'IBZ' }, { en: 'Menorca', iata: 'MAH' }, { en: 'Tenerife', iata: 'TFS' }, { en: 'Gran Canaria', iata: 'LPA' }, { en: 'Lanzarote', iata: 'ACE' }, { en: 'Fuerteventura', iata: 'FUE' }, { en: 'La Palma', iata: 'SPC' }
  ],
  US: [
    { en: 'New York', iata: 'JFK' }, { en: 'Manhattan', iata: 'JFK' }, { en: 'Brooklyn', iata: 'JFK' }, { en: 'Washington DC', iata: 'IAD' }, { en: 'Boston', iata: 'BOS' }, { en: 'Philadelphia', iata: 'PHL' }, { en: 'Chicago', iata: 'ORD' }, { en: 'Miami', iata: 'MIA' }, { en: 'Miami Beach', iata: 'MIA' }, { en: 'Orlando', iata: 'MCO' }, { en: 'Tampa', iata: 'TPA' }, { en: 'Key West', iata: 'EYW' }, { en: 'Fort Lauderdale', iata: 'FLL' }, { en: 'Atlanta', iata: 'ATL' }, { en: 'New Orleans', iata: 'MSY' }, { en: 'Nashville', iata: 'BNA' }, { en: 'Houston', iata: 'IAH' }, { en: 'Dallas', iata: 'DFW' }, { en: 'Austin', iata: 'AUS' }, { en: 'Denver', iata: 'DEN' }, { en: 'Las Vegas', iata: 'LAS' }, { en: 'Grand Canyon', iata: 'LAS' }, { en: 'Phoenix', iata: 'PHX' }, { en: 'Los Angeles', iata: 'LAX' }, { en: 'San Diego', iata: 'SAN' }, { en: 'San Francisco', iata: 'SFO' }, { en: 'Napa Valley', iata: 'SFO' }, { en: 'Yosemite', iata: 'SFO' }, { en: 'Seattle', iata: 'SEA' }, { en: 'Portland', iata: 'PDX' }, { en: 'Honolulu', iata: 'HNL' }, { en: 'Hawaii', iata: 'HNL' }, { en: 'Maui', iata: 'OGG' }, { en: 'Alaska', iata: 'ANC' }, { en: 'Anchorage', iata: 'ANC' }, { en: 'Salt Lake City', iata: 'SLC' }, { en: 'Yellowstone', iata: 'JAC' }
  ],
  TR: [
    { en: 'Istanbul', iata: 'IST' }, { en: 'İstanbul', iata: 'IST' }, { en: 'Sultanahmet', iata: 'IST' }, { en: 'Antalya', iata: 'AYT' }, { en: 'Alanya', iata: 'GZP' }, { en: 'Side', iata: 'AYT' }, { en: 'Belek', iata: 'AYT' }, { en: 'Kemer', iata: 'AYT' }, { en: 'Kaş', iata: 'DLM' }, { en: 'Kalkan', iata: 'DLM' }, { en: 'Fethiye', iata: 'DLM' }, { en: 'Ölüdeniz', iata: 'DLM' }, { en: 'Marmaris', iata: 'DLM' }, { en: 'Dalyan', iata: 'DLM' }, { en: 'Bodrum', iata: 'BJV' }, { en: 'Didim', iata: 'BJV' }, { en: 'Kuşadası', iata: 'ADB' }, { en: 'Izmir', iata: 'ADB' }, { en: 'İzmir', iata: 'ADB' }, { en: 'Çeşme', iata: 'ADB' }, { en: 'Alaçatı', iata: 'ADB' }, { en: 'Ephesus', iata: 'ADB' }, { en: 'Efes', iata: 'ADB' }, { en: 'Pamukkale', iata: 'DNZ' }, { en: 'Denizli', iata: 'DNZ' }, { en: 'Cappadocia', iata: 'NAV' }, { en: 'Kapadokya', iata: 'NAV' }, { en: 'Göreme', iata: 'NAV' }, { en: 'Ankara', iata: 'ESB' }, { en: 'Bursa', iata: 'IST' }, { en: 'Trabzon', iata: 'TZX' }, { en: 'Uzungöl', iata: 'TZX' }, { en: 'Rize', iata: 'RZV' }, { en: 'Mardin', iata: 'MQM' }, { en: 'Şanlıurfa', iata: 'GNY' }, { en: 'Gaziantep', iata: 'GZT' }, { en: 'Van', iata: 'VAN' }, { en: 'Erzurum', iata: 'ERZ' }, { en: 'Kars', iata: 'KSY' }, { en: 'Konya', iata: 'KYA' }, { en: 'Eskişehir', iata: 'AOE' }, { en: 'Çanakkale', iata: 'CKZ' }, { en: 'Bozcaada', iata: 'CKZ' }, { en: 'Ayvalık', iata: 'EDO' }, { en: 'Muğla', iata: 'DLM' }
  ],
  IT: [
    { en: 'Rome', iata: 'FCO' }, { en: 'Roma', iata: 'FCO' }, { en: 'Vatican', iata: 'FCO' }, { en: 'Milan', iata: 'MXP' }, { en: 'Milano', iata: 'MXP' }, { en: 'Lake Como', iata: 'MXP' }, { en: 'Como', iata: 'MXP' }, { en: 'Lake Garda', iata: 'VRN' }, { en: 'Verona', iata: 'VRN' }, { en: 'Venice', iata: 'VCE' }, { en: 'Venezia', iata: 'VCE' }, { en: 'Dolomites', iata: 'VCE' }, { en: 'Florence', iata: 'FLR' }, { en: 'Firenze', iata: 'FLR' }, { en: 'Pisa', iata: 'PSA' }, { en: 'Siena', iata: 'FLR' }, { en: 'Tuscany', iata: 'FLR' }, { en: 'Cinque Terre', iata: 'PSA' }, { en: 'Bologna', iata: 'BLQ' }, { en: 'Naples', iata: 'NAP' }, { en: 'Napoli', iata: 'NAP' }, { en: 'Pompeii', iata: 'NAP' }, { en: 'Sorrento', iata: 'NAP' }, { en: 'Amalfi Coast', iata: 'NAP' }, { en: 'Positano', iata: 'NAP' }, { en: 'Capri', iata: 'NAP' }, { en: 'Bari', iata: 'BRI' }, { en: 'Puglia', iata: 'BRI' }, { en: 'Polignano a Mare', iata: 'BRI' }, { en: 'Lecce', iata: 'BDS' }, { en: 'Sicily', iata: 'CTA' }, { en: 'Catania', iata: 'CTA' }, { en: 'Taormina', iata: 'CTA' }, { en: 'Palermo', iata: 'PMO' }, { en: 'Sardinia', iata: 'CAG' }, { en: 'Cagliari', iata: 'CAG' }, { en: 'Olbia', iata: 'OLB' }, { en: 'Turin', iata: 'TRN' }, { en: 'Genoa', iata: 'GOA' }
  ],
  TH: [
    // Popüler yerler ve adalar
    { en: 'Bangkok', iata: 'BKK' }, { en: 'Phuket', iata: 'HKT' }, { en: 'Chiang Mai', iata: 'CNX' }, { en: 'Pattaya', iata: 'BKK' },
    { en: 'Krabi', iata: 'KBV' }, { en: 'Ao Nang', iata: 'KBV' }, { en: 'Koh Samui', iata: 'USM' }, { en: 'Koh Phangan', iata: 'USM' },
    { en: 'Koh Tao', iata: 'USM' }, { en: 'Koh Phi Phi', iata: 'HKT' }, { en: 'Koh Lanta', iata: 'KBV' }, { en: 'Koh Chang', iata: 'TDX' },
    { en: 'Koh Samet', iata: 'BKK' }, { en: 'Koh Lipe', iata: 'HDY' }, { en: 'Koh Yao Noi', iata: 'HKT' }, { en: 'Khao Lak', iata: 'HKT' },
    { en: 'Patong', iata: 'HKT' }, { en: 'Railay', iata: 'KBV' }, { en: 'Hua Hin', iata: 'HHQ' }, { en: 'Pai', iata: 'CNX' },
    { en: 'Khao Sok', iata: 'URT' }, { en: 'Ayutthaya', iata: 'BKK' }, { en: 'Kanchanaburi', iata: 'BKK' }, { en: 'Sukhothai', iata: 'THS' },
    // İller (77)
    { en: 'Amnat Charoen', iata: 'UBP' }, { en: 'Ang Thong', iata: 'BKK' }, { en: 'Bueng Kan', iata: 'UTH' }, { en: 'Buriram', iata: 'BFV' },
    { en: 'Chachoengsao', iata: 'BKK' }, { en: 'Chai Nat', iata: 'BKK' }, { en: 'Chaiyaphum', iata: 'KKC' }, { en: 'Chanthaburi', iata: 'TDX' },
    { en: 'Chiang Rai', iata: 'CEI' }, { en: 'Chonburi', iata: 'UTP' }, { en: 'Chumphon', iata: 'CJM' }, { en: 'Kalasin', iata: 'KKC' },
    { en: 'Kamphaeng Phet', iata: 'PHS' }, { en: 'Khon Kaen', iata: 'KKC' }, { en: 'Lampang', iata: 'LPT' }, { en: 'Lamphun', iata: 'CNX' },
    { en: 'Loei', iata: 'LOE' }, { en: 'Lopburi', iata: 'BKK' }, { en: 'Mae Hong Son', iata: 'HGN' }, { en: 'Maha Sarakham', iata: 'KKC' },
    { en: 'Mukdahan', iata: 'KOP' }, { en: 'Nakhon Nayok', iata: 'BKK' }, { en: 'Nakhon Pathom', iata: 'BKK' }, { en: 'Nakhon Phanom', iata: 'KOP' },
    { en: 'Nakhon Ratchasima', iata: 'BKK' }, { en: 'Khao Yai', iata: 'BKK' }, { en: 'Nakhon Sawan', iata: 'BKK' }, { en: 'Nakhon Si Thammarat', iata: 'NST' },
    { en: 'Nan', iata: 'NNT' }, { en: 'Narathiwat', iata: 'NAW' }, { en: 'Nong Bua Lamphu', iata: 'UTH' }, { en: 'Nong Khai', iata: 'UTH' },
    { en: 'Nonthaburi', iata: 'DMK' }, { en: 'Pathum Thani', iata: 'DMK' }, { en: 'Pattani', iata: 'NAW' }, { en: 'Phang Nga', iata: 'HKT' },
    { en: 'Phatthalung', iata: 'HDY' }, { en: 'Phayao', iata: 'CEI' }, { en: 'Phetchabun', iata: 'PHY' }, { en: 'Phetchaburi', iata: 'HHQ' },
    { en: 'Phichit', iata: 'PHS' }, { en: 'Phitsanulok', iata: 'PHS' }, { en: 'Phrae', iata: 'PRH' }, { en: 'Prachinburi', iata: 'BKK' },
    { en: 'Prachuap Khiri Khan', iata: 'HHQ' }, { en: 'Ranong', iata: 'UNN' }, { en: 'Ratchaburi', iata: 'BKK' }, { en: 'Rayong', iata: 'UTP' },
    { en: 'Roi Et', iata: 'ROI' }, { en: 'Sa Kaeo', iata: 'BKK' }, { en: 'Sakon Nakhon', iata: 'SNO' }, { en: 'Samut Prakan', iata: 'BKK' },
    { en: 'Samut Sakhon', iata: 'BKK' }, { en: 'Samut Songkhram', iata: 'BKK' }, { en: 'Saraburi', iata: 'BKK' }, { en: 'Satun', iata: 'HDY' },
    { en: 'Sing Buri', iata: 'BKK' }, { en: 'Sisaket', iata: 'UBP' }, { en: 'Songkhla', iata: 'HDY' }, { en: 'Hat Yai', iata: 'HDY' },
    { en: 'Suphan Buri', iata: 'BKK' }, { en: 'Surat Thani', iata: 'URT' }, { en: 'Surin', iata: 'BFV' }, { en: 'Tak', iata: 'MAQ' },
    { en: 'Mae Sot', iata: 'MAQ' }, { en: 'Trang', iata: 'TST' }, { en: 'Trat', iata: 'TDX' }, { en: 'Ubon Ratchathani', iata: 'UBP' },
    { en: 'Udon Thani', iata: 'UTH' }, { en: 'Uthai Thani', iata: 'BKK' }, { en: 'Uttaradit', iata: 'PHS' }, { en: 'Yala', iata: 'NAW' },
    { en: 'Yasothon', iata: 'UBP' }
  ]
};

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').replace(/[^a-z0-9]+/g, ' ').trim();

/** Yazılan yeri listede bul (büyük/küçük harf, aksan ve "koh/ko" farkına aldırmadan) */
export const findPlace = (code: string, q: string): Place | undefined => {
  const n = norm(q).replace(/^ko /, 'koh ');
  return (PLACES[code] || []).find((p) => norm(p.en) === n);
};
