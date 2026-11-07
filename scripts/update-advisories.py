#!/usr/bin/env python3
"""Resmî seyahat uyarılarını (ABD, İngiltere FCDO, Kanada) açık veri uçlarından çekip
src/data/officialAdvisories.json dosyasını yeniler. Kullanım: python3 scripts/update-advisories.py
Değişiklik özeti ekrana yazılır. Ülke kodu eşlemeleri sabittir (yeni ülke çıkarsa elle eklenir)."""
import json, re, subprocess, sys, datetime, concurrent.futures as cf, os

ISO3 = {"AND": "AD", "ARE": "AE", "AFG": "AF", "ATG": "AG", "ALB": "AL", "ARM": "AM", "AGO": "AO", "ARG": "AR", "AUT": "AT", "AUS": "AU", "AZE": "AZ", "BIH": "BA", "BRB": "BB", "BGD": "BD", "BEL": "BE", "BFA": "BF", "BGR": "BG", "BHR": "BH", "BDI": "BI", "BEN": "BJ", "BRN": "BN", "BOL": "BO", "BRA": "BR", "BHS": "BS", "BTN": "BT", "BWA": "BW", "BLR": "BY", "BLZ": "BZ", "CAN": "CA", "COD": "CD", "CAF": "CF", "COG": "CG", "CHE": "CH", "CIV": "CI", "CHL": "CL", "CMR": "CM", "CHN": "CN", "COL": "CO", "CRI": "CR", "CUB": "CU", "CPV": "CV", "CYP": "CY", "CZE": "CZ", "DEU": "DE", "DJI": "DJ", "DNK": "DK", "DMA": "DM", "DOM": "DO", "DZA": "DZ", "ECU": "EC", "EST": "EE", "EGY": "EG", "ERI": "ER", "ESP": "ES", "ETH": "ET", "FIN": "FI", "FJI": "FJ", "FSM": "FM", "FRA": "FR", "GAB": "GA", "GBR": "GB", "GRD": "GD", "GEO": "GE", "GHA": "GH", "GMB": "GM", "GIN": "GN", "GNQ": "GQ", "GRC": "GR", "GTM": "GT", "GNB": "GW", "GUY": "GY", "HKG": "HK", "HND": "HN", "HRV": "HR", "HTI": "HT", "HUN": "HU", "IDN": "ID", "IRL": "IE", "ISR": "IL", "IND": "IN", "IRQ": "IQ", "IRN": "IR", "ISL": "IS", "ITA": "IT", "JAM": "JM", "JOR": "JO", "JPN": "JP", "KEN": "KE", "KGZ": "KG", "KHM": "KH", "KIR": "KI", "COM": "KM", "KNA": "KN", "PRK": "KP", "KOR": "KR", "KWT": "KW", "KAZ": "KZ", "LAO": "LA", "LBN": "LB", "LCA": "LC", "LIE": "LI", "LKA": "LK", "LBR": "LR", "LSO": "LS", "LTU": "LT", "LUX": "LU", "LVA": "LV", "LBY": "LY", "MAR": "MA", "MCO": "MC", "MDA": "MD", "MNE": "ME", "MDG": "MG", "MHL": "MH", "MKD": "MK", "MLI": "ML", "MMR": "MM", "MNG": "MN", "MAC": "MO", "MRT": "MR", "MLT": "MT", "MUS": "MU", "MDV": "MV", "MWI": "MW", "MEX": "MX", "MYS": "MY", "MOZ": "MZ", "NAM": "NA", "NER": "NE", "NGA": "NG", "NIC": "NI", "NLD": "NL", "NOR": "NO", "NPL": "NP", "NRU": "NR", "NZL": "NZ", "OMN": "OM", "PAN": "PA", "PER": "PE", "PNG": "PG", "PHL": "PH", "PAK": "PK", "POL": "PL", "PSE": "PS", "PRT": "PT", "PLW": "PW", "PRY": "PY", "QAT": "QA", "ROU": "RO", "SRB": "RS", "RUS": "RU", "RWA": "RW", "SAU": "SA", "SLB": "SB", "SYC": "SC", "SDN": "SD", "SWE": "SE", "SGP": "SG", "SVN": "SI", "SVK": "SK", "SLE": "SL", "SMR": "SM", "SEN": "SN", "SOM": "SO", "SUR": "SR", "SSD": "SS", "STP": "ST", "SLV": "SV", "SYR": "SY", "SWZ": "SZ", "TCD": "TD", "TGO": "TG", "THA": "TH", "TJK": "TJ", "TLS": "TL", "TKM": "TM", "TUN": "TN", "TON": "TO", "TUR": "TR", "TTO": "TT", "TUV": "TV", "TWN": "TW", "TZA": "TZ", "UKR": "UA", "UGA": "UG", "USA": "US", "URY": "UY", "UZB": "UZ", "VAT": "VA", "VCT": "VC", "VEN": "VE", "VNM": "VN", "VUT": "VU", "WSM": "WS", "YEM": "YE", "ZAF": "ZA", "ZMB": "ZM", "ZWE": "ZW", "XKS": "XK"}
UK_SLUG = {"andorra": "AD", "united-arab-emirates": "AE", "afghanistan": "AF", "antigua-and-barbuda": "AG", "albania": "AL", "armenia": "AM", "angola": "AO", "argentina": "AR", "austria": "AT", "australia": "AU", "azerbaijan": "AZ", "bosnia-and-herzegovina": "BA", "barbados": "BB", "bangladesh": "BD", "belgium": "BE", "burkina-faso": "BF", "bulgaria": "BG", "bahrain": "BH", "burundi": "BI", "benin": "BJ", "brunei": "BN", "bolivia": "BO", "brazil": "BR", "bahamas": "BS", "bhutan": "BT", "botswana": "BW", "belarus": "BY", "belize": "BZ", "canada": "CA", "democratic-republic-of-the-congo": "CD", "central-african-republic": "CF", "congo": "CG", "switzerland": "CH", "cote-d-ivoire": "CI", "chile": "CL", "cameroon": "CM", "china": "CN", "colombia": "CO", "costa-rica": "CR", "cuba": "CU", "cape-verde": "CV", "cyprus": "CY", "czechia": "CZ", "germany": "DE", "djibouti": "DJ", "denmark": "DK", "dominica": "DM", "dominican-republic": "DO", "algeria": "DZ", "ecuador": "EC", "estonia": "EE", "egypt": "EG", "eritrea": "ER", "spain": "ES", "ethiopia": "ET", "finland": "FI", "fiji": "FJ", "federated-states-of-micronesia": "FM", "france": "FR", "gabon": "GA", "grenada": "GD", "georgia": "GE", "ghana": "GH", "the-gambia": "GM", "guinea": "GN", "equatorial-guinea": "GQ", "greece": "GR", "guatemala": "GT", "guinea-bissau": "GW", "guyana": "GY", "hong-kong": "HK", "honduras": "HN", "croatia": "HR", "haiti": "HT", "hungary": "HU", "indonesia": "ID", "ireland": "IE", "israel": "IL", "india": "IN", "iraq": "IQ", "iran": "IR", "iceland": "IS", "italy": "IT", "jamaica": "JM", "jordan": "JO", "japan": "JP", "kenya": "KE", "kyrgyzstan": "KG", "cambodia": "KH", "kiribati": "KI", "comoros": "KM", "st-kitts-and-nevis": "KN", "north-korea": "KP", "south-korea": "KR", "kuwait": "KW", "kazakhstan": "KZ", "laos": "LA", "lebanon": "LB", "st-lucia": "LC", "liechtenstein": "LI", "sri-lanka": "LK", "liberia": "LR", "lesotho": "LS", "lithuania": "LT", "luxembourg": "LU", "latvia": "LV", "libya": "LY", "morocco": "MA", "monaco": "MC", "moldova": "MD", "montenegro": "ME", "madagascar": "MG", "marshall-islands": "MH", "north-macedonia": "MK", "mali": "ML", "myanmar": "MM", "mongolia": "MN", "macao": "MO", "mauritania": "MR", "malta": "MT", "mauritius": "MU", "maldives": "MV", "malawi": "MW", "mexico": "MX", "malaysia": "MY", "mozambique": "MZ", "namibia": "NA", "niger": "NE", "nigeria": "NG", "nicaragua": "NI", "netherlands": "NL", "norway": "NO", "nepal": "NP", "nauru": "NR", "new-zealand": "NZ", "oman": "OM", "panama": "PA", "peru": "PE", "papua-new-guinea": "PG", "philippines": "PH", "pakistan": "PK", "poland": "PL", "palestine": "PS", "portugal": "PT", "palau": "PW", "paraguay": "PY", "qatar": "QA", "romania": "RO", "serbia": "RS", "russia": "RU", "rwanda": "RW", "saudi-arabia": "SA", "solomon-islands": "SB", "seychelles": "SC", "sudan": "SD", "sweden": "SE", "singapore": "SG", "slovenia": "SI", "slovakia": "SK", "sierra-leone": "SL", "san-marino": "SM", "senegal": "SN", "somalia": "SO", "suriname": "SR", "south-sudan": "SS", "sao-tome-and-principe": "ST", "el-salvador": "SV", "syria": "SY", "eswatini": "SZ", "chad": "TD", "togo": "TG", "thailand": "TH", "tajikistan": "TJ", "timor-leste": "TL", "turkmenistan": "TM", "tunisia": "TN", "tonga": "TO", "turkey": "TR", "trinidad-and-tobago": "TT", "tuvalu": "TV", "taiwan": "TW", "tanzania": "TZ", "ukraine": "UA", "uganda": "UG", "usa": "US", "uruguay": "UY", "uzbekistan": "UZ", "st-vincent-and-the-grenadines": "VC", "venezuela": "VE", "vietnam": "VN", "vanuatu": "VU", "samoa": "WS", "kosovo": "XK", "yemen": "YE", "south-africa": "ZA", "zambia": "ZM", "zimbabwe": "ZW"}
OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'officialAdvisories.json')

def get(url):
    r = subprocess.run(['curl', '-s', '-m', '40', '-A', 'vizamigo-advisory-sync', url], capture_output=True, timeout=60)
    return json.loads(r.stdout)

old = json.load(open(OUT))
codes = list(old['c'].keys())
new = {c: {} for c in codes}

us = get('https://cadataapi.state.gov/api/TravelAdvisories')
for x in us:
    m = re.search(r'destination\.([a-z]{3})', x.get('Link', '')); lv = re.search(r'Level (\d)', x.get('Title', ''))
    if not m or not lv: continue
    c = ISO3.get(m.group(1).upper())
    if c in new and 'us' not in new[c]:
        new[c]['us'] = [int(lv.group(1)), (x.get('Updated') or x.get('Published') or '')[:10], m.group(0) + '.html']

ca = get('https://data.international.gc.ca/travel-voyage/index-updated.json')['data']
for k, v in ca.items():
    if k in new:
        new[k]['ca'] = [v['advisory-state'] + 1, 1 if v.get('has-regional-advisory') else 0, v['date-published']['date'][:10], v['eng']['url-slug']]

def uk_one(item):
    slug, c = item
    try:
        j = get('https://www.gov.uk/api/content/foreign-travel-advice/' + slug)
        a = j.get('details', {}).get('alert_status', [])
        lvl = 4 if 'avoid_all_travel_to_whole_country' in a else 3 if 'avoid_all_but_essential_travel_to_whole_country' in a else 2 if a else 1
        return c, [lvl, (j.get('public_updated_at') or '')[:10], slug]
    except Exception:
        return c, None
with cf.ThreadPoolExecutor(8) as ex:
    for c, v in ex.map(uk_one, UK_SLUG.items()):
        if v and c in new: new[c]['uk'] = v

# güvenlik: veri kaynaklarından biri boş/bozuk geldiyse eski veriyi koru
for ag, minimum in (('us', 150), ('uk', 150), ('ca', 150)):
    n = sum(1 for c in new if ag in new[c])
    if n < minimum:
        print(f'UYARI: {ag} yalnızca {n} ülke döndü, eski {ag} verisi korunuyor')
        for c in new:
            if ag in old['c'][c]: new[c][ag] = old['c'][c][ag]
            else: new[c].pop(ag, None)

changes = []
for c in codes:
    for ag in ('us', 'uk', 'ca'):
        a = (old['c'][c].get(ag) or [None])[0]; b = (new[c].get(ag) or [None])[0]
        if a != b: changes.append(f'{c} {ag.upper()}: {a} -> {b}')
json.dump({'fetched': datetime.date.today().isoformat(), 'c': new}, open(OUT, 'w'), separators=(',', ':'), ensure_ascii=False)
print('DEGISIKLIK:', len(changes)); print('\n'.join(changes))
