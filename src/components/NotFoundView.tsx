/**
 * Localized 404 (Not Found) View for Vizamigo
 * Protects Google Search Console from Soft-404 penalties while offering a luxury traveler recovery experience.
 */

import React from 'react';
import { Compass, ArrowLeft, Globe, Search, ShieldAlert } from 'lucide-react';
import { SupportedLanguage } from '../i18n/types';

interface NotFoundViewProps {
  language: SupportedLanguage;
  requestedPath?: string;
  onGoHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  language,
  requestedPath,
  onGoHome
}) => {
  const content = {
    tr: {
      badge: '404 HATA',
      title: 'Rota veya Ülke Bulunamadı',
      desc: 'Aradığınız seyahat rehberi, araç veya ülke kodu sistemimizde mevcut değil veya güncellenmiş olabilir.',
      btn: 'Keşfet Kataloğuna Dön',
      suggestionsTitle: 'Popüler Rotalara Göz Atın:'
    },
    en: {
      badge: '404 NOT FOUND',
      title: 'Destination or Page Not Found',
      desc: 'The requested travel guide, tool, or country code does not exist in our global mobility registry or has moved.',
      btn: 'Explore Global Catalog',
      suggestionsTitle: 'Popular Destinations:'
    },
    de: {
      badge: '404 FEHLER',
      title: 'Reiseziel oder Seite nicht gefunden',
      desc: 'Das angeforderte Reiseziel, Tool oder der Ländercode existiert nicht in unserem weltweiten Verzeichnis.',
      btn: 'Zurück zum Reiseführer',
      suggestionsTitle: 'Beliebte Reiseziele:'
    },
    es: {
      badge: '404 NO ENCONTRADO',
      title: 'Destino o Página No Encontrada',
      desc: 'La guía de viaje, herramienta o código de país solicitado no existe en nuestro registro global.',
      btn: 'Explorar Catálogo Global',
      suggestionsTitle: 'Destinos Populares:'
    },
    ru: {
      badge: '404 ОШИБКА',
      title: 'Направление или страница не найдена',
      desc: 'Запрошенный туристический гид, инструмент или код страны не существует в нашем глобальном реестре.',
      btn: 'Вернуться в каталог стран',
      suggestionsTitle: 'Популярные направления:'
    }
  }[language] || {
    badge: '404 NOT FOUND',
    title: 'Destination Not Found',
    desc: 'The requested page does not exist in our global directory.',
    btn: 'Explore Global Catalog',
    suggestionsTitle: 'Popular Destinations:'
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-xl text-center glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-2xl relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute -top-20 -right-20 w-52 h-52 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge & Icon */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold border border-rose-500/20 mb-6">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{content.badge}</span>
        </div>

        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#FF6B6B]/20 via-slate-100 to-[#FF8E72]/20 dark:from-[#FF6B6B]/30 dark:via-slate-800 dark:to-[#FF8E72]/20 flex items-center justify-center text-[#FF6B6B] shadow-inner mb-6">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        {/* Title & Desc */}
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
          {content.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto mb-8">
          {content.desc}
        </p>

        {/* Call to action */}
        <button
          type="button"
          onClick={onGoHome}
          className="btn-nubair-primary min-h-[48px] px-8 py-3.5 rounded-full text-sm font-bold shadow-lg touch-target-min inline-flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{content.btn}</span>
        </button>

        {/* Quick popular suggestions */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10">
          <div className="text-xs font-semibold text-slate-400 mb-2.5">
            {content.suggestionsTitle}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {['AL', 'JP', 'ME', 'BA', 'GE', 'TH'].map((code) => (
              <a
                key={code}
                href={`/${language}/country/${code}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', `/${language}/country/${code}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#FF6B6B] hover:text-white dark:hover:bg-[#FF6B6B] font-bold transition-all shadow-2xs cursor-pointer"
              >
                {code}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
