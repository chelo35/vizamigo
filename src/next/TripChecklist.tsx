import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Btn, AdTag } from './ui';
import { Icon } from './Icon';
import { tpLinks } from '../data/tpPartners';

export interface ChecklistItem {
  id: string;
  title: string;
  sub?: string;
  href?: string;
  ad?: boolean;
}

const KEY = (code: string, pass: string) => `vz_check_${pass}_${code}`;

/** Ülke ve pasaporta göre hazırlanan, işaretlenebilir seyahat hazırlık listesi (işaretler cihazda saklanır). */
export function buildChecklist(o: {
  l: (tr: string, en: string, de: string, es: string, ru: string) => string;
  name: string;
  nameEn: string;
  visaCat: string | undefined;
  idCard: boolean;
  needsAdapter: boolean;
  plugs: string;
  currency: string;
  cashTip?: string;
  police?: string;
  ambulance?: string;
  advisoryMax?: number | null;
  tapWaterSafe?: boolean;
  vaccines?: string[];
}): ChecklistItem[] {
  const { l } = o;
  const out: ChecklistItem[] = [];
  const cat = o.visaCat || 'visa';
  if (cat === 'visa') out.push({ id: 'visa', title: l('Vize başvurusunu yap', 'Apply for your visa', 'Visum beantragen', 'Solicita el visado', 'Подайте на визу'), sub: l('Randevuları erken al; Schengen gibi vizelerde 4–6 hafta önceden başvur.', 'Book appointments early; apply 4–6 weeks ahead for visas like Schengen.', 'Termine früh buchen; 4–6 Wochen vorher beantragen.', 'Pide cita pronto; solicita con 4–6 semanas de antelación.', 'Запишитесь заранее; подавайте за 4–6 недель.') });
  else if (cat === 'evisa') out.push({ id: 'visa', title: l('e-Vizeyi online al', 'Get your eVisa online', 'e-Visum online beantragen', 'Tramita la e-Visa online', 'Оформите e-Visa онлайн'), sub: l('Yalnızca resmî siteden başvur; aracı siteler daha pahalı.', 'Apply only on the official site; middlemen charge more.', 'Nur auf der offiziellen Seite beantragen.', 'Solo en la web oficial; los intermediarios cobran más.', 'Только на официальном сайте.') });
  else if (cat === 'eta') out.push({ id: 'visa', title: l('Elektronik seyahat iznini (eTA/ESTA) al', 'Get your electronic travel authorisation (eTA/ESTA)', 'Elektronische Reisegenehmigung (eTA/ESTA) beantragen', 'Tramita la autorización electrónica (eTA/ESTA)', 'Оформите электронное разрешение (eTA/ESTA)') });
  else if (cat === 'voa') out.push({ id: 'visa', title: l('Kapıda vize için nakit ve belgeleri hazırla', 'Prepare cash and documents for visa on arrival', 'Bargeld und Unterlagen für Visum bei Ankunft bereithalten', 'Prepara efectivo y documentos para la visa a la llegada', 'Подготовьте наличные и документы для визы по прилёте') });
  else out.push({ id: 'visa', title: l(`${o.name} için vize gerekmiyor`, `No visa needed for ${o.name}`, `Kein Visum für ${o.name} nötig`, `No necesitas visado para ${o.name}`, `Виза не нужна`), sub: l('Kalış süresini aşmamaya dikkat et.', 'Do not overstay the allowed days.', 'Erlaubte Aufenthaltsdauer einhalten.', 'No superes los días permitidos.', 'Не превышайте разрешённый срок.') });
  out.push(
    o.idCard
      ? { id: 'doc', title: l('Çipli kimlik kartını ya da pasaportunu yanına al', 'Take your chip ID card or passport', 'Chip-Ausweis oder Reisepass mitnehmen', 'Lleva tu DNI con chip o pasaporte', 'Возьмите ID-карту с чипом или паспорт'), sub: l('Eski tip kimlik geçmez.', 'Old-style ID cards are not accepted.', 'Alte Ausweise gelten nicht.', 'El DNI antiguo no vale.', 'Старые удостоверения не принимаются.') }
      : { id: 'doc', title: l('Pasaportunun geçerliliğini kontrol et', 'Check your passport validity', 'Gültigkeit des Reisepasses prüfen', 'Comprueba la validez del pasaporte', 'Проверьте срок действия паспорта'), sub: l('Çoğu ülke dönüşten sonra en az 6 ay geçerlilik ve boş sayfa ister.', 'Most countries want 6+ months validity after return and blank pages.', 'Meist 6+ Monate Gültigkeit nach Rückkehr nötig.', 'Muchos países piden 6+ meses de validez.', 'Часто нужно 6+ месяцев после возвращения.') }
  );
  out.push({ id: 'ins', title: l('Seyahat sağlık sigortası yaptır', 'Get travel health insurance', 'Reisekrankenversicherung abschließen', 'Contrata un seguro de viaje', 'Оформите страховку'), sub: cat === 'visa' ? l('Vize başvurusunda çoğu zaman zorunlu.', 'Often required for the visa application.', 'Für den Visumantrag oft Pflicht.', 'A menudo obligatorio para el visado.', 'Часто обязательна для визы.') : l('Hastane masrafları yurt dışında çok yüksek olabilir.', 'Medical bills abroad can be very high.', 'Arztkosten im Ausland können hoch sein.', 'La atención médica puede ser muy cara.', 'Лечение за границей может быть очень дорогим.'), href: tpLinks.safetywing(), ad: true });
  out.push({ id: 'esim', title: l('İnternet için eSIM al', 'Get an eSIM for data', 'eSIM für mobile Daten holen', 'Compra una eSIM', 'Купите eSIM'), sub: l('Havalimanında SIM almaktan genelde ucuzdur.', 'Usually cheaper than an airport SIM.', 'Meist günstiger als eine Flughafen-SIM.', 'Suele ser más barato que en el aeropuerto.', 'Обычно дешевле SIM в аэропорту.'), href: tpLinks.airalo(o.nameEn.toLowerCase().replace(/&/g, 'and').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')), ad: true });
  out.push({ id: 'plug', title: o.needsAdapter ? l(`Priz adaptörü al (${o.plugs})`, `Pack a plug adapter (${o.plugs})`, `Steckeradapter einpacken (${o.plugs})`, `Lleva un adaptador (${o.plugs})`, `Возьмите переходник (${o.plugs})`) : l(`Priz uyumlu (${o.plugs}), adaptör gerekmez`, `Plugs fit (${o.plugs}), no adapter needed`, `Stecker passen (${o.plugs}), kein Adapter`, `Los enchufes sirven (${o.plugs})`, `Розетки подходят (${o.plugs})`) });
  out.push({ id: 'money', title: l(`Para: ${o.currency}`, `Money: ${o.currency}`, `Geld: ${o.currency}`, `Dinero: ${o.currency}`, `Деньги: ${o.currency}`), sub: o.cashTip || l('Kartını yurt dışı kullanıma aç, biraz nakit bulundur.', 'Enable your card abroad and carry some cash.', 'Karte fürs Ausland freischalten, etwas Bargeld mitnehmen.', 'Activa tu tarjeta en el extranjero y lleva algo de efectivo.', 'Разрешите оплату картой за границей и возьмите наличные.') });
  if (o.police || o.ambulance) out.push({ id: 'sos', title: l('Acil numaraları telefonuna kaydet', 'Save the emergency numbers', 'Notrufnummern speichern', 'Guarda los números de emergencia', 'Сохраните экстренные номера'), sub: [o.police && `${l('Polis', 'Police', 'Polizei', 'Policía', 'Полиция')} ${o.police}`, o.ambulance && `${l('Ambulans', 'Ambulance', 'Rettung', 'Ambulancia', 'Скорая')} ${o.ambulance}`].filter(Boolean).join(' · ') });
  if (o.advisoryMax && o.advisoryMax >= 2) out.push({ id: 'adv', title: l('Resmî seyahat uyarılarını oku', 'Read the official travel advisories', 'Offizielle Reisehinweise lesen', 'Lee los avisos oficiales', 'Прочитайте официальные предупреждения'), sub: l(`En temkinli kurum ${o.advisoryMax}/4 diyor; Güvenlik sekmesinde kaynaklarıyla.`, `The strictest agency says ${o.advisoryMax}/4; see the Safety tab.`, `Strengste Stufe ${o.advisoryMax}/4; siehe Sicherheit.`, `El nivel más estricto es ${o.advisoryMax}/4; mira Seguridad.`, `Максимальный уровень ${o.advisoryMax}/4; см. «Безопасность».`) });
  if (o.tapWaterSafe === false) out.push({ id: 'water', title: l('Musluk suyunu içme, şişe su kullan', 'Drink bottled water, not tap water', 'Kein Leitungswasser trinken', 'Bebe agua embotellada', 'Пейте бутилированную воду') });
  if (o.vaccines?.length) out.push({ id: 'vac', title: l('Aşıları kontrol et', 'Check vaccinations', 'Impfungen prüfen', 'Revisa las vacunas', 'Проверьте прививки'), sub: o.vaccines.slice(0, 4).join(', ') });
  out.push({ id: 'copy', title: l('Pasaport, bilet ve sigortanın kopyasını telefonuna al', 'Keep copies of passport, tickets and insurance on your phone', 'Kopien von Pass, Tickets und Versicherung aufs Handy', 'Guarda copias del pasaporte, billetes y seguro en el móvil', 'Сохраните копии паспорта, билетов и страховки в телефоне') });
  return out;
}

export const TripChecklist: React.FC<{ code: string; passport: string; items: ChecklistItem[] }> = ({ code, passport, items }) => {
  const { l } = useI18n();
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem(KEY(code, passport)) || '{}'));
    } catch {
      setDone({});
    }
  }, [code, passport]);
  const toggle = (id: string) =>
    setDone((d) => {
      const n = { ...d, [id]: !d[id] };
      try {
        localStorage.setItem(KEY(code, passport), JSON.stringify(n));
      } catch {}
      return n;
    });
  const count = useMemo(() => items.filter((x) => done[x.id]).length, [items, done]);
  return (
    <div className="vz-stack">
      <div className="vz-check-prog" aria-live="polite">
        <b>{l(`${count}/${items.length} hazır`, `${count}/${items.length} done`, `${count}/${items.length} erledigt`, `${count}/${items.length} listo`, `${count}/${items.length} готово`)}</b>
        <span className="vz-check-bar"><i style={{ width: `${Math.round((count / Math.max(1, items.length)) * 100)}%` }} /></span>
      </div>
      <ul className="vz-check">
        {items.map((x) => (
          <li key={x.id} className={done[x.id] ? 'done' : ''}>
            <label>
              <input type="checkbox" checked={!!done[x.id]} onChange={() => toggle(x.id)} />
              <span className="vz-check-box" aria-hidden="true">{done[x.id] && <Icon name="check" size={14} duo={false} />}</span>
              <span className="vz-check-t">
                <b>{x.title}</b>
                {x.sub && <small>{x.sub}</small>}
              </span>
            </label>
            {x.href && (
              <a className="vz-btn vz-btn-soft sm" href={x.href} target="_blank" rel="noopener noreferrer sponsored">
                {l('Bak', 'Open', 'Öffnen', 'Ver', 'Открыть')} {x.ad && <AdTag />}
              </a>
            )}
          </li>
        ))}
      </ul>
      {count > 0 && (
        <div className="vz-actions">
          <Btn variant="ghost" small onClick={() => { setDone({}); try { localStorage.removeItem(KEY(code, passport)); } catch {} }}>{l('Listeyi sıfırla', 'Reset list', 'Liste zurücksetzen', 'Reiniciar lista', 'Сбросить')}</Btn>
        </div>
      )}
    </div>
  );
};
