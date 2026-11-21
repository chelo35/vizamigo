/**
 * Portuguese needs articles before most country names ("do Brasil", "no Japão", "para os Estados Unidos").
 * Sentences are written as "de {país}", "em {país}", "para {país}"; this fixes the contraction
 * after the country name has been inserted.
 */
import { getCountryName } from '../data/passportData';

type Art = 'o' | 'a' | 'os' | 'as';
// Countries not listed take no article (Portugal, Israel, Cuba, Angola, Moçambique, Cabo Verde, Malta…).
const ART: Record<string, Art> = {};
const add = (art: Art, codes: string) => codes.split(' ').forEach((c) => (ART[c] = art));
add('o', 'BR JP CA MX PE CL EC PY UY EG MA VN KH LA NP PK AF IR IQ QA KW LB YE SD SS KE SN GA TD NE ML TG BJ CG CD ZW MW GB KZ UZ KG TJ TM BT BD LK SR GY SV PA BH BI CM GH LS BW RW ZM HN CR VA');
add('a', 'DE FR IT ES AR CO BO VE CN IN RU TR GR TH ID AU NZ KR KP CH AT BE SE NO FI DK PL HU HR RS AL RO BG IE IS JO SA ET TZ NG ZA GE AM UA MY MN SY LY TN DZ ER SO MR GN GW GQ GM SL LR CI UG NA SK SI EE LV LT BY MD MK BA ME CZ PG JM DM GD BB AZ');
add('os', 'US AE NL');
add('as', 'PH MV BS SC KM MH SB');

const D: Record<Art, string> = { o: 'do', a: 'da', os: 'dos', as: 'das' };
const E: Record<Art, string> = { o: 'no', a: 'na', os: 'nos', as: 'nas' };
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
let RE: RegExp | null = null;
let MAP: Record<string, Art> = {};

/** "passaporte de Brasil" → "passaporte do Brasil", "em Japão" → "no Japão", "para Estados Unidos" → "para os Estados Unidos" */
export function ptArticles(s: string): string {
  if (!s || s.length < 4) return s;
  if (!RE) {
    const list = Object.entries(ART)
      .map(([c, a]) => [getCountryName(c, 'pt'), a] as [string, Art])
      .filter(([n]) => n && n.length > 2)
      .sort((x, y) => y[0].length - x[0].length);
    MAP = Object.fromEntries(list);
    RE = new RegExp(`(^|[\\s(“"'>])(de|em|para|De|Em|Para) (${list.map(([n]) => esc(n)).join('|')})(?![\\p{L}-])`, 'gu');
  }
  return s.replace(RE, (m, pre: string, prep: string, name: string) => {
    const a = MAP[name];
    if (!a) return m;
    const low = prep.toLowerCase();
    let out = low === 'de' ? D[a] : low === 'em' ? E[a] : `para ${a}`;
    if (prep[0] !== low[0]) out = out[0].toUpperCase() + out.slice(1);
    return `${pre}${out} ${name}`;
  });
}
