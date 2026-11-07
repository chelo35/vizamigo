/**
 * Ülke özetini gerçek bir PDF dosyası olarak indirir (yazdırma penceresi açmadan).
 * Metin tarayıcıda çizilir (Türkçe/Rusça harfler sorunsuz), sonra A4 sayfalara bölünür.
 * Kütüphaneler yalnızca düğmeye basılınca yüklenir.
 */
export interface PdfSection {
  h: string;
  text?: string;
  rows?: Array<[string, string]>;
  items?: string[];
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);

export async function downloadCountryPdf(opts: { title: string; subtitle?: string; sections: PdfSection[]; footer: string; filename: string }) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas-pro'), import('jspdf')]);
  const W = 760; // px genişlik (A4 oranı)
  const box = document.createElement('div');
  box.setAttribute('aria-hidden', 'true');
  box.style.cssText = `position:fixed;left:-10000px;top:0;width:${W}px;padding:40px 44px;background:#ffffff;color:#13222b;font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;`;
  const sec = opts.sections
    .filter((s) => s.text || s.rows?.length || s.items?.length)
    .map(
      (s) =>
        `<section data-sec style="margin:0 0 18px;padding-top:4px">` +
        `<h2 style="font-size:17px;margin:0 0 8px;color:#0d6e78;border-bottom:2px solid #dff3f1;padding-bottom:4px">${esc(s.h)}</h2>` +
        (s.text ? `<p style="margin:0 0 6px">${esc(s.text)}</p>` : '') +
        (s.rows?.length ? `<table style="width:100%;border-collapse:collapse">${s.rows.map(([k, v]) => `<tr><td style="padding:4px 10px 4px 0;vertical-align:top;font-weight:700;white-space:nowrap;width:1%">${esc(k)}</td><td style="padding:4px 0">${esc(v)}</td></tr>`).join('')}</table>` : '') +
        (s.items?.length ? `<ul style="margin:0;padding-left:20px">${s.items.map((x) => `<li style="margin:2px 0">${esc(x)}</li>`).join('')}</ul>` : '') +
        `</section>`
    )
    .join('');
  box.innerHTML =
    `<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:18px"><div><div style="font-size:26px;font-weight:800">${esc(opts.title)}</div>${opts.subtitle ? `<div style="color:#5b6b73">${esc(opts.subtitle)}</div>` : ''}</div><div style="font-weight:800;color:#0d6e78">Vizamigo</div></div>` +
    sec +
    `<p style="margin-top:20px;color:#5b6b73;font-size:12px">${esc(opts.footer)}</p>`;
  document.body.appendChild(box);
  try {
    // sayfa kesimlerinde bölüm ortadan bölünmesin diye bölümlerin yerini ölç
    const scale = 2;
    const canvas = await html2canvas(box, { scale, backgroundColor: '#ffffff', logging: false });
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const pw = pdf.internal.pageSize.getWidth();
    const ph = pdf.internal.pageSize.getHeight();
    const pxPerPt = canvas.width / pw;
    const pageH = Math.floor(ph * pxPerPt);
    const breaks = [...box.querySelectorAll<HTMLElement>('[data-sec]')].map((el) => el.offsetTop * scale);
    let y = 0;
    let first = true;
    while (y < canvas.height) {
      let end = Math.min(y + pageH, canvas.height);
      if (end < canvas.height) {
        const cut = breaks.filter((b) => b > y + pageH * 0.4 && b < end).pop();
        if (cut) end = cut;
      }
      const part = document.createElement('canvas');
      part.width = canvas.width;
      part.height = end - y;
      const ctx = part.getContext('2d');
      if (!ctx) break;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, part.width, part.height);
      ctx.drawImage(canvas, 0, y, canvas.width, end - y, 0, 0, canvas.width, end - y);
      if (!first) pdf.addPage();
      pdf.addImage(part.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pw, (end - y) / pxPerPt);
      first = false;
      y = end;
    }
    pdf.save(opts.filename);
  } finally {
    box.remove();
  }
}
