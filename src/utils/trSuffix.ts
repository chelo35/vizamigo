/** Türkçe ek: "Japonya" + bulunma → "Japonya'da", yönelme → "Japonya'ya". Kesme işaretiyle. */
const VOWELS = 'aeıioöuüAEIİOÖUÜ';
const BACK = 'aıouAIOU';
const HARD = 'fstkçşhpFSTKÇŞHP';
export function trLoc(word: string): string {
  const w = word.trim();
  const last = w[w.length - 1] || 'a';
  const lv = [...w].reverse().find((c) => VOWELS.includes(c)) || 'a';
  const v = BACK.includes(lv) ? 'a' : 'e';
  const d = HARD.includes(last) ? 't' : 'd';
  return `${w}’${d}${v}`;
}
export function trDat(word: string): string {
  const w = word.trim();
  const last = w[w.length - 1] || 'a';
  const lv = [...w].reverse().find((c) => VOWELS.includes(c)) || 'a';
  const v = BACK.includes(lv) ? 'a' : 'e';
  return `${w}’${VOWELS.includes(last) ? 'y' : ''}${v}`;
}
