import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Minus,
  Maximize2,
  Minimize2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  ExternalLink,
  ChevronRight,
  MapPin,
  Compass,
  Briefcase,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useI18n } from '../../data/i18n';
import { TabKey } from '../Navigation';
import {
  AssistantMessage,
  AssistantActionPill,
  processAssistantQuery,
  startVoiceRecognition,
  stopVoiceRecognition,
  speakResponse,
  stopSpeaking,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported
} from '../../services/aiAssistantEngine';

interface VizamigoAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPassport: string;
  onOpenCountryDossier: (code: string) => void;
  onSelectTab: (tab: TabKey) => void;
  onOpenPackingList: () => void;
  onOpenTippingCalc: () => void;
  onOpenTimezoneOverlap: () => void;
  onOpenGlobalRadar: (mode?: 'all' | 'clock' | 'weather' | 'currency') => void;
}

export const VizamigoAssistantModal: React.FC<VizamigoAssistantModalProps> = ({
  isOpen,
  onClose,
  currentPassport,
  onOpenCountryDossier,
  onSelectTab,
  onOpenPackingList,
  onOpenTippingCalc,
  onOpenTimezoneOverlap,
  onOpenGlobalRadar
}) => {
  const { language, l } = useI18n();

  const [messages, setMessages] = useState<AssistantMessage[]>(() => {
    return [
      {
        id: 'welcome-msg',
        sender: 'assistant',
        text:
          language === 'tr'
            ? `Merhaba! Ben **Vizamigo AI Seyahat Danışmanınız** ✈️\n\nSitedeki tüm **199 ülke vize rejimlerine**, gün gün gezi rotalarına, priz/elektrik tiplerine ve seyahat uygulamalarına (eSIM, otel, tren, transfer) tam hakimim.\n\nİster yazın, ister **mikrofon simgesine basıp sesli konuşun**!`
            : `Hello! I am your **Vizamigo AI Travel Concierge** ✈️\n\nI have complete command over **199 country visa requirements**, curated itineraries, power plugs, and verified travel tools.\n\nType your query or **tap the microphone to speak** in your native language!`,
        timestamp: new Date(),
        actions: [
          {
            id: 'init-th',
            type: 'open_country',
            countryCode: 'TH',
            label: '🇹🇭 Tayland Vizesi & Rehberi',
            accentTone: 'teal'
          },
          {
            id: 'init-it',
            type: 'open_country',
            countryCode: 'IT',
            label: '🇮🇹 İtalya 7 Günlük Gezi Rotası',
            accentTone: 'sky'
          },
          {
            id: 'init-esim',
            type: 'affiliate',
            url: 'https://www.airalo.com',
            badge: '5G eSIM',
            label: '📱 En Ucuz Yurt Dışı eSIM',
            accentTone: 'coral'
          },
          {
            id: 'init-packing',
            type: 'open_tool',
            toolKey: 'packing',
            label: '🧳 Valiz Kontrol Listesi',
            accentTone: 'amber'
          }
        ]
      }
    ];
  });

  const [inputValue, setInputValue] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (!isMinimized) {
        setTimeout(() => inputRef.current?.focus(), 250);
      }
    }
  }, [isOpen, messages, isMinimized]);

  // Clean up voice synthesis on unmount or close
  useEffect(() => {
    return () => {
      stopVoiceRecognition();
      stopSpeaking();
    };
  }, []);

  if (!isOpen) return null;

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || inputValue).trim();
    if (!textToSend) return;

    setInputValue('');

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Stop listening if user manually pressed send
    if (isListening) {
      stopVoiceRecognition();
      setIsListening(false);
    }

    // Process intelligence query
    try {
      const response = await processAssistantQuery(textToSend, currentPassport, language);
      setIsTyping(false);
      setMessages((prev) => [...prev, response]);

      // Read aloud if voice is enabled
      if (voiceEnabled) {
        setIsSpeaking(true);
        speakResponse(response.text, language, () => {
          setIsSpeaking(false);
        });
      }
    } catch {
      setIsTyping(false);
      const fallbackMsg: AssistantMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text:
          language === 'tr'
            ? 'Bir aksaklık meydana geldi, lütfen tekrar deneyin veya alternatif bir ülke adı belirtin.'
            : 'Something went wrong, please try rephrasing your question or mentioning a country name.',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  const handleToggleVoiceInput = () => {
    if (isListening) {
      stopVoiceRecognition();
      setIsListening(false);
    } else {
      if (!isSpeechRecognitionSupported()) {
        alert(
          language === 'tr'
            ? 'Tarayıcınız sesle girişi desteklemiyor. Lütfen Chrome, Edge veya Safari kullanınız.'
            : 'Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.'
        );
        return;
      }

      // Stop any current assistant speech
      stopSpeaking();
      setIsSpeaking(false);

      setIsListening(true);
      startVoiceRecognition({
        lang: language,
        onResult: (transcript, isFinal) => {
          setInputValue(transcript);
          if (isFinal) {
            handleSend(transcript);
          }
        },
        onError: () => {
          setIsListening(false);
        },
        onEnd: () => {
          setIsListening(false);
        }
      });
    }
  };

  const handleToggleVoiceOutput = () => {
    if (voiceEnabled) {
      stopSpeaking();
      setIsSpeaking(false);
      setVoiceEnabled(false);
    } else {
      setVoiceEnabled(true);
    }
  };

  const handleActionClick = (action: AssistantActionPill) => {
    if (action.type === 'open_country' && action.countryCode) {
      onOpenCountryDossier(action.countryCode);
    } else if (action.type === 'switch_tab' && action.tabKey) {
      onSelectTab(action.tabKey);
    } else if (action.type === 'open_tool') {
      if (action.toolKey === 'packing') onOpenPackingList();
      else if (action.toolKey === 'tipping') onOpenTippingCalc();
      else if (action.toolKey === 'overlap') onOpenTimezoneOverlap();
      else if (action.toolKey === 'radar') onOpenGlobalRadar(action.radarMode || 'all');
    } else if (action.type === 'affiliate' && action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Minimized floating bubble
  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0F766E] text-white shadow-2xl border-2 border-[#5EEAD4] cursor-pointer hover:scale-105 transition-transform"
        aria-label={l('Vizamigo Asistanını Genişlet', 'Expand Vizamigo Assistant')}
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-[#5EEAD4] animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
        </div>
        <span className="text-xs font-black tracking-wide">
          {l('Vizamigo AI Asistanı', 'Vizamigo AI Copilot')}
        </span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-5 pointer-events-none">
      {/* Dark overlay backdrop on mobile */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs pointer-events-auto sm:hidden"
      />

      {/* Main Glassmorphic Assistant Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={l('Vizamigo AI Seyahat Danışmanı', 'Vizamigo AI Travel Concierge')}
        className={`pointer-events-auto w-full flex flex-col overflow-hidden bg-white/95 dark:bg-[#072630]/95 backdrop-blur-2xl border border-teal-500/30 shadow-2xl transition-all duration-300 ${
          isFullscreen
            ? 'fixed inset-3 sm:inset-6 z-50 rounded-[28px]'
            : 'sm:w-[460px] sm:h-[650px] max-h-[85vh] h-[85vh] sm:rounded-[30px] rounded-t-[26px]'
        }`}
      >
        {/* ===================================================================
            HEADER: AVATAR, TITLE, VOICE TOGGLE, WINDOW CONTROLS
        =================================================================== */}
        <div className="p-3.5 sm:p-4 border-b border-teal-500/20 bg-gradient-to-r from-teal-500/10 via-sky-500/10 to-transparent flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#0284C7] text-white flex items-center justify-center shadow-md relative shrink-0">
              <Sparkles className="w-5 h-5 text-[#5EEAD4]" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-[#072630]" />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-[#042F2E] dark:text-white truncate">
                  {l('Vizamigo AI Danışman', 'Vizamigo AI Concierge')}
                </h3>
                <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#5EEAD4]/20 text-[#0F766E] dark:text-[#5EEAD4] border border-[#5EEAD4]/40">
                  {l('Canlı & Sesli', 'Live & Voice')}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-teal-200/80 truncate mt-0.5">
                {l('199 Ülke Vize, Rota & Rehber Uzmanı', '199 Countries Visa & Route Expert')}
              </p>
            </div>
          </div>

          {/* Window Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Voice Mute/Unmute Toggle */}
            <button
              type="button"
              onClick={handleToggleVoiceOutput}
              aria-label={voiceEnabled ? l('Sesi Kapat', 'Mute Voice') : l('Sesi Aç', 'Enable Voice')}
              title={voiceEnabled ? l('Sesli Yanıtı Kapat', 'Mute Voice Responses') : l('Sesli Yanıtı Aç', 'Enable Voice Responses')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                voiceEnabled
                  ? 'bg-teal-500/15 text-[#0F766E] dark:text-[#5EEAD4] border-teal-500/30 shadow-xs'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-400 border-slate-200 dark:border-white/10'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Minimize */}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              aria-label={l('Simge durumuna küçült', 'Minimize')}
              className="p-2 rounded-xl bg-white text-slate-900 border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            {/* Maximize / Restore */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              aria-label={isFullscreen ? l('Normal Boyuta Getir', 'Restore') : l('Tam Ekran', 'Fullscreen')}
              className="hidden sm:inline-flex p-2 rounded-xl bg-white text-slate-900 border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label={l('Kapat', 'Close')}
              className="p-2 rounded-xl bg-white text-slate-900 border border-slate-200 shadow-xs hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ===================================================================
            MESSAGES FEED
        =================================================================== */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
              >
                <div
                  className={`max-w-[88%] p-3.5 sm:p-4 rounded-2xl sm:rounded-[22px] leading-relaxed text-xs sm:text-sm font-medium ${
                    isUser
                      ? 'bg-gradient-to-r from-[#0D9488] to-[#0284C7] text-white shadow-md rounded-br-xs'
                      : 'bg-slate-100/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 border border-teal-500/20 shadow-xs rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line break-words">{msg.text}</div>
                </div>

                {/* Embedded Action Pills & Affiliate Badges */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 max-w-[95%]">
                    {msg.actions.map((act) => {
                      const isAffiliate = act.type === 'affiliate';
                      return (
                        <button
                          key={act.id}
                          type="button"
                          onClick={() => handleActionClick(act)}
                          className={`group/act inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs hover:-translate-y-0.5 active:translate-y-0 ${
                            isAffiliate
                              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-500/40 hover:border-amber-500'
                              : 'bg-teal-50 dark:bg-teal-950/60 text-[#0F766E] dark:text-[#5EEAD4] border border-teal-500/40 hover:border-teal-500'
                          }`}
                        >
                          {act.badge && (
                            <span className="text-xs font-black uppercase px-1.5 py-0.5 rounded bg-white/70 dark:bg-white/10">
                              {act.badge}
                            </span>
                          )}
                          <span>{act.label}</span>
                          {isAffiliate ? (
                            <ExternalLink className="w-3 h-3 text-amber-600 dark:text-amber-400 group-hover/act:translate-x-0.5 transition-transform" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-[#0D9488] dark:text-[#5EEAD4] group-hover/act:translate-x-0.5 transition-transform" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-teal-500/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-slate-500 font-bold ml-1">
                {l('Danışman yanıtlıyor...', 'Concierge is researching...')}
              </span>
            </div>
          )}

          {/* Voice Listening Active Audio Wave Indicator */}
          {isListening && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/40 flex items-center justify-between gap-3 animate-pulse">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-black text-rose-700 dark:text-rose-300">
                  {l('Sizi dinliyorum, konuşun...', 'Listening to your voice...')}
                </span>
              </div>
              <button
                type="button"
                onClick={handleToggleVoiceInput}
                className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold cursor-pointer"
              >
                {l('Durdur', 'Stop')}
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ===================================================================
            QUICK SUGGESTION CHIPS
        =================================================================== */}
        <div className="px-3.5 py-2 border-t border-teal-500/15 bg-slate-50/70 dark:bg-white/[0.02] flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-xs font-bold text-slate-400 shrink-0 mr-1">
            {l('Örnekler:', 'Suggestions:')}
          </span>
          <button
            type="button"
            onClick={() => handleSend('Tayland vizesi nasıl?')}
            className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0F766E] dark:text-[#5EEAD4] hover:border-teal-500 transition-colors cursor-pointer"
          >
            🇹🇭 Tayland Vizesi
          </button>
          <button
            type="button"
            onClick={() => handleSend('İtalya 7 günlük rota hazırla')}
            className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0F766E] dark:text-[#5EEAD4] hover:border-teal-500 transition-colors cursor-pointer"
          >
            🗺️ İtalya Rotası
          </button>
          <button
            type="button"
            onClick={() => handleSend('Japonya priz tipi nedir?')}
            className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0F766E] dark:text-[#5EEAD4] hover:border-teal-500 transition-colors cursor-pointer"
          >
            🔌 Japonya Prizi
          </button>
          <button
            type="button"
            onClick={() => handleSend('En ucuz yurt dışı eSIM hangisi?')}
            className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0F766E] dark:text-[#5EEAD4] hover:border-teal-500 transition-colors cursor-pointer"
          >
            📱 Ucuz eSIM
          </button>
          <button
            type="button"
            onClick={() => handleSend('Döviz kurlarını göster')}
            className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0F766E] dark:text-[#5EEAD4] hover:border-teal-500 transition-colors cursor-pointer"
          >
            💶 Canlı Döviz
          </button>
        </div>

        {/* ===================================================================
            INPUT BAR: VOICE MIC, TEXT INPUT, SEND BUTTON
        =================================================================== */}
        <div className="p-3 sm:p-4 border-t border-teal-500/20 bg-white dark:bg-[#072630] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Microphone Toggle (STT) */}
            <button
              type="button"
              onClick={handleToggleVoiceInput}
              aria-label={isListening ? l('Dinlemeyi Durdur', 'Stop Listening') : l('Sesli Konuş', 'Speak')}
              title={isListening ? l('Dinlemeyi Durdur', 'Stop Listening') : l('Sesli Konuş', 'Speak with Mic')}
              className={`p-3 rounded-2xl font-bold transition-all cursor-pointer border shrink-0 ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse shadow-lg ring-4 ring-rose-500/30'
                  : 'bg-teal-500/10 hover:bg-teal-500/20 text-[#0F766E] dark:text-[#5EEAD4] border-teal-500/30 shadow-xs'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                isListening
                  ? l('Konuşmanız dinleniyor...', 'Listening to speech...')
                  : l('Bir soru sorun veya ülke adı yazın...', 'Ask anything or type a country...')
              }
              className="flex-1 min-w-0 px-4 py-3 rounded-2xl bg-slate-100/80 dark:bg-white/[0.06] text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label={l('Gönder', 'Send')}
              className="p-3 rounded-2xl bg-gradient-to-r from-[#0D9488] to-[#0284C7] text-white font-bold transition-all cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
