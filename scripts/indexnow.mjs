// IndexNow: yayındaki site haritasındaki tüm adresleri Bing, Yandex, Seznam, Naver'a tek seferde bildirir.
// (ChatGPT araması Bing dizinini kullanır.) Yayından SONRA çalıştır:
//   node scripts/indexnow.mjs            → tüm site haritası
//   node scripts/indexnow.mjs /tr/japonya /en/japan   → yalnızca verilen yollar
// Anahtar dosyası: public/<KEY>.txt (içinde yalnızca anahtar). Gizli değildir; sitenin sahibi olduğunu kanıtlar.
const HOST = 'www.vizamigo.com';
const KEY = '659c03a0424a0d1411c268896847b8cf';
const BASE = `https://${HOST}`;

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((a) => (a.startsWith('http') ? a : BASE + (a.startsWith('/') ? a : '/' + a)));
} else {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}
urls = [...new Set(urls)].filter((u) => u.startsWith(BASE));
console.log(`${urls.length} adres gönderiliyor…`);

const keyCheck = await fetch(`${BASE}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error('Anahtar dosyası yayında değil; önce siteyi yayına al.');
  process.exit(1);
}

for (let i = 0; i < urls.length; i += 10000) {
  const r = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: urls.slice(i, i + 10000) })
  });
  console.log(`IndexNow yanıtı: ${r.status} ${r.status === 200 || r.status === 202 ? '(kabul edildi)' : await r.text()}`);
}
