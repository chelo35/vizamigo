"""FlexiRoam eSIM paketlerini Daisycon ürün verisinden çekip src/data/esimFlexi.json dosyasını yeniler (haftalık)."""
import json, re, sys, urllib.request, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FEED = 'https://daisycon.io/datafeed/?media_id=442794&standard_id=14&language_code=en&locale_id=65&type=json&program_id=22288&html_transform=none&rawdata=false&encoding=utf8&general=false'
names = json.load(open(os.path.join(ROOT, 'scripts', 'country-names-en.json')))
alias = {'turkey':'TR','bosnia and herzegovina':'BA','czech republic':'CZ','united states':'US','usa':'US','uk':'GB','united kingdom':'GB','south korea':'KR','korea':'KR','vietnam':'VN','uae':'AE','united arab emirates':'AE','russia':'RU','ivory coast':'CI',"cote d'ivoire":'CI','macau':'MO','hong kong':'HK','taiwan':'TW','laos':'LA','north macedonia':'MK','macedonia':'MK','cape verde':'CV','eswatini':'SZ','swaziland':'SZ','myanmar':'MM','burma':'MM','dr congo':'CD','congo':'CG','palestine':'PS','moldova':'MD','bolivia':'BO','venezuela':'VE','iran':'IR','syria':'SY','tanzania':'TZ'}
names.update(alias)
raw = json.loads(urllib.request.urlopen(urllib.request.Request(FEED, headers={'User-Agent': 'curl/8.4.0', 'Accept': '*/*'}), timeout=120).read())['datafeed']
d = raw['programs'][0]['products']
out = {}
for p in d:
    pi = p['product_info']
    if p['update_info'].get('status') != 'active': continue
    path = pi.get('category_path','')
    if '|Local|' not in path: continue
    country = path.split('|')[-1].strip().lower()
    code = names.get(country)
    if not code: continue
    try:
        price = float(pi['price']); days = int(float(pi.get('subscription_duration') or 0)); mb = float(pi.get('subscription_allowance_data') or 0)
    except: continue
    gb = round(mb/1024, 1) if mb else 0
    out.setdefault(code, []).append([gb, days, price, pi['link']])
res = {}
for c, lst in out.items():
    lst.sort(key=lambda x: x[2])
    pick = []
    for want in (7, 15, 30):
        cand = [x for x in lst if want <= x[1] <= want*2+2 and x[0] >= 1]
        if cand:
            b = min(cand, key=lambda x: x[2])
            if b not in pick: pick.append(b)
    res[c] = pick[:3]
json.dump({'src':'FlexiRoam via Daisycon','p':res}, open(os.path.join(ROOT, 'src', 'data', 'esimFlexi.json'),'w'), separators=(',',':'))
print(len(res), res.get('TH'))
