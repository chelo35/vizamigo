/**
 * iOS Safari (26+) alt araç çubuğu açıldığında sayfayı küçültmeden üstüne biner;
 * sabit alt menü ve asistan yazı kutusu altta kalıyordu. Görünen alan ile sayfa
 * yüksekliği arasındaki farkı --vz-tb değişkenine yazar (klavye açıkken 0).
 */
export function watchToolbarInset(): void {
  const vv = window.visualViewport;
  if (!vv) return;
  const root = document.documentElement;
  let raf = 0;
  const set = () => {
    raf = 0;
    const gap = Math.round(window.innerHeight - vv.height - vv.offsetTop);
    // 0–140 px: tarayıcı çubuğu; daha büyük fark klavyedir, alt menü klavyenin üstüne çıkmasın
    const v = gap > 2 && gap < 140 ? gap : 0;
    root.style.setProperty('--vz-tb', `${v}px`);
  };
  const on = () => {
    if (!raf) raf = requestAnimationFrame(set);
  };
  vv.addEventListener('resize', on);
  vv.addEventListener('scroll', on);
  window.addEventListener('resize', on);
  set();
}
