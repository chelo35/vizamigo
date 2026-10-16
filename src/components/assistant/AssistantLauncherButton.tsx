import React from 'react';
import { Sparkles, Mic } from 'lucide-react';
import { useI18n } from '../../data/i18n';

interface AssistantLauncherButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const AssistantLauncherButton: React.FC<AssistantLauncherButtonProps> = ({
  onClick,
  isOpen
}) => {
  const { l } = useI18n();

  if (isOpen) return null;

  return (
    <aside aria-label={l('Vizamigo AI Seyahat Danışmanı', 'Vizamigo AI Travel Concierge')}>
      <button
        type="button"
        onClick={onClick}
        aria-label={l('Vizamigo AI Seyahat Danışmanını Aç (Sesli & Yazılı)', 'Open Vizamigo AI Travel Concierge (Voice & Text)')}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 group flex items-center gap-2.5 pl-3.5 pr-4 py-3 rounded-full bg-gradient-to-r from-[#0D9488] via-[#0EA5E9] to-[#0284C7] text-white shadow-2xl hover:shadow-cyan-500/30 border-2 border-[#5EEAD4]/70 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Glowing Sparkle & Mic Badge */}
        <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/20 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#5EEAD4] animate-spin [animation-duration:6s]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
        </div>

        <div className="flex flex-col text-left leading-none">
          <span className="text-xs font-black tracking-tight text-white flex items-center gap-1">
            <span>AI Danışman</span>
            <span className="inline-block px-1.5 py-0.5 rounded-full bg-[#5EEAD4] text-[#042F2E] text-xs font-extrabold uppercase">
              Sesli
            </span>
          </span>
          <span className="text-xs font-bold text-[#BAE6FD] mt-0.5 hidden sm:inline">
            {l('199 Ülke Vize & Rota', 'Visa & Itinerary AI')}
          </span>
        </div>
      </button>
    </aside>
  );
};
