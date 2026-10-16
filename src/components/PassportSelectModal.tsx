import React, { useState, useMemo } from 'react';
import { Search, X, Check, Star } from 'lucide-react';
import { D, getCountryName, getFlag } from '../data/passportData';
import { useI18n } from '../data/i18n';

interface PassportSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPassport: string;
  onSelect: (code: string) => void;
  title?: string;
}

const POPULAR_PASSPORTS = ['TR', 'DE', 'AZ', 'US', 'GB', 'FR', 'NL', 'IT', 'ES', 'BG', 'GR', 'AL'];

export const PassportSelectModal: React.FC<PassportSelectModalProps> = ({
  isOpen,
  onClose,
  selectedPassport,
  onSelect,
  title
}) => {
  const { language, l } = useI18n();
  const [search, setSearch] = useState('');

  const modalTitle = title || l(
    'Vatandaşlığınızı / Pasaportunuzu Seçin',
    'Select Citizenship / Passport',
    'Staatsangehörigkeit / Reisepass wählen'
  );

  const allCodes = useMemo(() => {
    const locale = language === 'tr' ? 'tr' : language === 'de' ? 'de' : 'en';
    return Object.keys(D).sort((a, b) =>
      getCountryName(a, language).localeCompare(getCountryName(b, language), locale)
    );
  }, [language]);

  const filteredCodes = useMemo(() => {
    const locale = language === 'tr' ? 'tr' : language === 'de' ? 'de' : 'en';
    const q = search.trim().toLocaleLowerCase(locale);
    if (!q) return allCodes;
    return allCodes.filter(c => {
      const name = getCountryName(c, language).toLocaleLowerCase(locale);
      return name.includes(q) || c.toLowerCase() === q;
    });
  }, [allCodes, search, language]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-[-0.02em]">{modalTitle}</h3>
            <p className="text-xs text-slate-500 dark:text-[#8E9DBE]">
              {l('199 ülke ve bölge pasaportu', '199 national passports and territories', '199 Reisepässe und Gebiete')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-[#8E9DBE] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              placeholder={l(
                'Ülke adı yazarak arayın (Örn: Türkiye, Almanya, Azerbaycan...)',
                'Search by country name (e.g. Turkey, Germany, United States...)',
                'Nach Ländernamen suchen (z. B. Deutschland, Türkei, USA...)'
              )}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#141C3B]/80 border border-slate-200/90 dark:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-white/20 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#7A89A6]"
            />
          </div>

          {/* Quick Select Buttons */}
          {!search && (
            <div className="mt-2.5">
              <span className="text-xs font-semibold text-slate-400 dark:text-[#7A89A6] uppercase tracking-wider flex items-center gap-1 mb-1.5">
                <Star className="w-3 h-3 text-amber-500" />{' '}
                {l('Sık Kullanılanlar', 'Popular Passports', 'Beliebte Reisepässe')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_PASSPORTS.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      onSelect(c);
                      onClose();
                    }}
                    className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium transition-colors ${
                      selectedPassport === c
                        ? 'tab-chip-active'
                        : 'tab-chip-inactive'
                    }`}
                  >
                    <span>{getFlag(c)}</span>
                    <span>{getCountryName(c, language)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Country List */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-white/5 p-2">
          {filteredCodes.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-[#7A89A6] text-sm">
              {l('Eşleşen vatandaşlık bulunamadı.', 'No matching nationality found.', 'Keine passende Staatsangehörigkeit gefunden.')}
            </div>
          ) : (
            filteredCodes.map(code => {
              const isSelected = selectedPassport === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    onSelect(code);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-all text-left ${
                    isSelected
                      ? 'bg-[#0F172A] text-white dark:bg-[#202E5C] dark:text-white dark:border dark:border-white/20 font-semibold shadow-xs'
                      : 'hover:bg-slate-100/80 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getFlag(code)}</span>
                    <span className="text-sm font-medium">{getCountryName(code, language)}</span>
                    <span className={`text-xs font-mono uppercase ${isSelected ? 'text-white/70' : 'text-slate-400 dark:text-[#7A89A6]'}`}>({code})</span>
                  </div>
                  {isSelected && (
                    <Check className="w-5 h-5 text-white" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
