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
  Settings,
  Play,
  Check,
  Shield,
  Sliders
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
import {
  getVoiceSettings,
  saveVoiceSettings,
  VoiceSettings,
  playNaturalSpeech,
  stopAllPlayback
} from '../../services/aiVoiceService';

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

  const getWelcomeMessage = (lang: string = language): AssistantMessage => {
    let welcomeText = '';
    if (lang === 'tr') {
      welcomeText = `Merhaba! Ben **Vizamigo AI Seyahat Danışmanınız** ✈️\n\nSitedeki **199 ülkenin tamamına** (vize rejimleri, priz tipleri, taksi uygulamaları, bahşiş kuralları, acil durum hatları ve canlı döviz kurları) tam hakimim.\n\nİster yazın, ister **mikrofon simgesine basıp konuşun**!`;
    } else if (lang === 'de') {
      welcomeText = `Hallo! Ich bin Ihr **Vizamigo AI Reiseassistent** ✈️\n\nIch kenne alle **199 Länder** auswendig: Visabestimmungen, Steckertypen, Taxi-Apps, Trinkgeldregeln und Live-Wechselkurse.\n\nSchreiben Sie Ihre Frage oder **tippen Sie auf das Mikrofon**, um zu sprechen!`;
    } else if (lang === 'es') {
      welcomeText = `¡Hola! Soy tu **Asistente de Viaje Vizamigo AI** ✈️\n\nDomino los **199 países**: requisitos de visado, enchufes, aplicaciones de taxi, propinas y tipos de cambio.\n\nEscribe tu consulta o **pulsa el micrófono** para hablar.`;
    } else if (lang === 'ru') {
      welcomeText = `Здравствуйте! Я ваш **ИИ-консультант Vizamigo** ✈️\n\nЯ знаю все **199 стран**: визовые правила, типы розеток, приложения такси, чаевые и курсы валют.\n\nНапишите вопрос или **нажмите на микрофон**, чтобы сказать голосом!`;
    } else {
      welcomeText = `Hello! I am your **Vizamigo AI Travel Concierge** ✈️\n\nI have complete mastery over all **199 countries**: visa rules, power plugs, taxi apps, tipping etiquette, itineraries, and live FX rates.\n\nType your inquiry or **tap the microphone to speak**!`;
    }

    return {
      id: 'welcome-msg',
      sender: 'assistant',
      text: welcomeText,
      timestamp: new Date(),
      actions: [
        {
          id: 'init-where',
          type: 'switch_tab',
          tabKey: 'where_can_i_go',
          label: lang === 'tr' ? '🌍 Vizesiz Ülkeler Radarı' : '🌍 Visa-Free World Radar',
          accentTone: 'teal'
        },
        {
          id: 'init-th',
          type: 'open_country',
          countryCode: 'TH',
          label: lang === 'tr' ? '🇹🇭 Tayland Vizesi & Rehberi' : '🇹🇭 Thailand Visa Guide',
          accentTone: 'sky'
        }
      ]
    };
  };

  const [messages, setMessages] = useState<AssistantMessage[]>([getWelcomeMessage()]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true); // Voice enabled by default with natural neural stream
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [voiceSettings, setVoiceSettingsState] = useState<VoiceSettings>(getVoiceSettings());
  const [isTestingVoice, setIsTestingVoice] = useState<boolean>(false);
  const [settingsSavedToast, setSettingsSavedToast] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Re-translate the initial welcome message whenever site language changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1 && prev[0]?.id === 'welcome-msg') {
        return [getWelcomeMessage(language)];
      }
      return prev;
    });
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (!isMinimized && !showSettings) {
        setTimeout(() => inputRef.current?.focus(), 250);
      }
    }
  }, [isOpen, messages, isMinimized, showSettings]);

  // Clean up voice synthesis on unmount or close
  useEffect(() => {
    return () => {
      stopVoiceRecognition();
      stopSpeaking();
      setSpeakingMsgId(null);
    };
  }, []);

  if (!isOpen) return null;

  const playMessageAudio = (msg: AssistantMessage) => {
    if (speakingMsgId === msg.id) {
      stopSpeaking();
      setSpeakingMsgId(null);
    } else {
      stopSpeaking();
      setSpeakingMsgId(msg.id);
      speakResponse(msg.spokenText || msg.text, msg.detectedLang || language, () => {
        setSpeakingMsgId(null);
      });
    }
  };

  const handleActionClick = (action: AssistantActionPill) => {
    if (action.type === 'open_country' && action.countryCode) {
      onOpenCountryDossier(action.countryCode);
      setIsMinimized(true); // Auto-minimize so the country dossier is visible to user
    } else if (action.type === 'switch_tab' && action.tabKey) {
      onSelectTab(action.tabKey);
      setIsMinimized(true); // Auto-minimize so the selected tab is visible to user
    } else if (action.type === 'open_tool') {
      if (action.toolKey === 'packing') onOpenPackingList();
      else if (action.toolKey === 'tipping') onOpenTippingCalc();
      else if (action.toolKey === 'overlap') onOpenTimezoneOverlap();
      else if (action.toolKey === 'radar') onOpenGlobalRadar(action.radarMode || 'all');
      setIsMinimized(true); // Auto-minimize so the tool modal is visible to user
    } else if (action.type === 'affiliate' && action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSend = async (customText?: string, isVoiceInput: boolean = false) => {
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

    if (isListening) {
      stopVoiceRecognition();
      setIsListening(false);
    }

    try {
      const response = await processAssistantQuery(textToSend, currentPassport, language);
      setIsTyping(false);
      setMessages((prev) => [...prev, response]);

      const replyLang = response.detectedLang || language;

      if (voiceEnabled && (isVoiceInput || voiceSettings.autoSpeak)) {
        setSpeakingMsgId(response.id);
        speakResponse(response.spokenText || response.text, replyLang, () => {
          setSpeakingMsgId(null);
        });
      }

      // If user asked to open a specific country or tool, auto-trigger and minimize to background
      if (response.autoTriggerAction) {
        setTimeout(() => {
          handleActionClick(response.autoTriggerAction!);
        }, 750);
      }
    } catch (err) {
      console.error('Assistant query error:', err);
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

      stopSpeaking();
      setSpeakingMsgId(null);
      setIsListening(true);

      startVoiceRecognition({
        lang: language,
        onResult: (transcript, isFinal) => {
          setInputValue(transcript);
          if (isFinal) {
            handleSend(transcript, true);
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
      setSpeakingMsgId(null);
      setVoiceEnabled(false);
    } else {
      setVoiceEnabled(true);
    }
  };

  const handleTestVoice = async () => {
    setIsTestingVoice(true);
    const testPhrase =
      language === 'tr'
        ? 'Merhaba! Vizamigo seyahat danışmanınız hazır. 199 ülkenin vize ve gezi bilgilerine hakimim.'
        : language === 'de'
        ? 'Hallo! Ihr Vizamigo Reiseberater ist bereit für alle 199 Länder weltweit.'
        : language === 'es'
        ? '¡Hola! Tu asistente de viajes Vizamigo está listo para los 199 países.'
        : language === 'ru'
        ? 'Здравствуйте! Ваш консультант Vizamigo готов ответить по всем 199 странам.'
        : 'Hello! Your Vizamigo AI travel concierge is ready for all 199 countries worldwide.';

    await playNaturalSpeech(testPhrase, language, () => {
      setIsTestingVoice(false);
    });
  };

  const handleSaveSettings = () => {
    saveVoiceSettings(voiceSettings);
    setSettingsSavedToast(true);
    setTimeout(() => {
      setSettingsSavedToast(false);
      setShowSettings(false);
    }, 1000);
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
            : 'sm:w-[480px] sm:h-[660px] max-h-[85vh] h-[85vh] sm:rounded-[30px] rounded-t-[26px]'
        }`}
      >
        {/* ===================================================================
            HEADER: AVATAR, TITLE, VOICE TOGGLE, SETTINGS, WINDOW CONTROLS
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
                  {l('199 Ülke', '199 Countries')}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-teal-200/80 truncate mt-0.5">
                {l('Vize, Rota, Priz & Seyahat Bilgisi', 'Visas, Routes, Plugs & Intelligence')}
              </p>
            </div>
          </div>

          {/* Window Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Voice Settings & AI Training Toggle */}
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              aria-label={l('Ses & AI Eğitimi Ayarları', 'Voice & AI Settings')}
              title={l('Ses ve AI Eğitimi Ayarları', 'Voice Engine & AI Training Settings')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                showSettings
                  ? 'bg-[#0D9488] text-white border-teal-600 shadow-xs'
                  : 'bg-white dark:bg-white/10 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:text-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Voice Mute/Unmute Toggle */}
            <button
              type="button"
              onClick={handleToggleVoiceOutput}
              aria-label={voiceEnabled ? l('Sesli Yanıtı Kapat', 'Mute Voice') : l('Sesli Yanıtı Aç', 'Enable Voice')}
              title={voiceEnabled ? l('Sesli Yanıt Açık (Sessize almak için tıklayın)', 'Voice Output Active (Click to mute)') : l('Sesli Yanıt Kapalı (Açmak için tıklayın)', 'Voice Output Muted (Click to enable)')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                voiceEnabled
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                  : 'bg-white dark:bg-white/10 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:text-slate-800'
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
            VOICE & AI TRAINING SETTINGS DRAWER
        =================================================================== */}
        {showSettings ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/90 dark:bg-slate-900/90">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#0D9488]" />
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {l('Ses Motoru & AI Eğitimi', 'Voice Engine & AI Training')}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                {l('Geri Dön', 'Back')}
              </button>
            </div>

            {/* Engine Selection */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {l('Ses Kalitesi & Motoru', 'Voice Quality Engine')}
              </label>

              <div className="grid grid-cols-1 gap-2.5">
                {/* Option 1: Neural Stream (Default & Human) */}
                <div
                  onClick={() => setVoiceSettingsState({ ...voiceSettings, engine: 'neural_stream' })}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    voiceSettings.engine === 'neural_stream' || !voiceSettings.engine
                      ? 'border-[#0D9488] bg-teal-50/50 dark:bg-teal-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {l('Google Neural Doğal Ses (Ücretsiz & Akıcı)', 'Google Neural Voice (Free & Natural)')}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-teal-600 text-white font-black">
                        {l('Varsayılan', 'Default')}
                      </span>
                    </div>
                    {(voiceSettings.engine === 'neural_stream' || !voiceSettings.engine) && (
                      <Check className="w-4 h-4 text-[#0D9488]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {l(
                      'Google bulut ses akışını kullanır. Robotik ses tonunu %100 ortadan kaldırır, 5 dilde insan gibi akıcı konuşur.',
                      'Uses Google neural voice streaming. Completely removes robotic tone and speaks with natural human pronunciation in 5 languages.'
                    )}
                  </p>
                </div>

                {/* Option 2: ElevenLabs Studio Voice */}
                <div
                  onClick={() => setVoiceSettingsState({ ...voiceSettings, engine: 'elevenlabs' })}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    voiceSettings.engine === 'elevenlabs'
                      ? 'border-[#0D9488] bg-teal-50/50 dark:bg-teal-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        ElevenLabs Studio AI Sesi
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500 text-white font-black">
                        {l('Stüdyo', 'Studio')}
                      </span>
                    </div>
                    {voiceSettings.engine === 'elevenlabs' && <Check className="w-4 h-4 text-[#0D9488]" />}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {l(
                      'Ultra-gerçekçi, insan duygusu, nefes alma ve kusursuz diksiyon.',
                      'Hyper-realistic human emotion, natural breathing, and pristine studio cadence.'
                    )}
                  </p>

                  {voiceSettings.engine === 'elevenlabs' && (
                    <div className="mt-3 pt-3 border-t border-teal-500/20 space-y-2">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          ElevenLabs API Key:
                        </label>
                        <input
                          type="password"
                          value={voiceSettings.elevenLabsApiKey}
                          onChange={(e) =>
                            setVoiceSettingsState({ ...voiceSettings, elevenLabsApiKey: e.target.value })
                          }
                          placeholder="xi-..."
                          className="w-full mt-1 px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          Voice ID (Opsiyonel / Varsayılan Rachel):
                        </label>
                        <input
                          type="text"
                          value={voiceSettings.elevenLabsVoiceId}
                          onChange={(e) =>
                            setVoiceSettingsState({ ...voiceSettings, elevenLabsVoiceId: e.target.value })
                          }
                          placeholder="21m00Tcm4TlvDq8ikWAM"
                          className="w-full mt-1 px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 3: OpenAI TTS */}
                <div
                  onClick={() => setVoiceSettingsState({ ...voiceSettings, engine: 'openai' })}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    voiceSettings.engine === 'openai'
                      ? 'border-[#0D9488] bg-teal-50/50 dark:bg-teal-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      OpenAI Audio TTS (Nova / Alloy / Shimmer)
                    </span>
                    {voiceSettings.engine === 'openai' && <Check className="w-4 h-4 text-[#0D9488]" />}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {l(
                      'OpenAI modelinin berrak ve akıcı insan sesi.',
                      'Crisp, human-grade voice synthesis powered by OpenAI tts-1.'
                    )}
                  </p>

                  {voiceSettings.engine === 'openai' && (
                    <div className="mt-3 pt-3 border-t border-teal-500/20 space-y-2">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          OpenAI API Key:
                        </label>
                        <input
                          type="password"
                          value={voiceSettings.openAiApiKey}
                          onChange={(e) =>
                            setVoiceSettingsState({ ...voiceSettings, openAiApiKey: e.target.value })
                          }
                          placeholder="sk-..."
                          className="w-full mt-1 px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          Ses Profili:
                        </label>
                        <select
                          value={voiceSettings.openAiVoice}
                          onChange={(e) =>
                            setVoiceSettingsState({
                              ...voiceSettings,
                              openAiVoice: e.target.value as any
                            })
                          }
                          className="w-full mt-1 px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10"
                        >
                          <option value="nova">Nova (Sıcak & Samimi Kadın)</option>
                          <option value="alloy">Alloy (Dengeli & Profesyonel)</option>
                          <option value="shimmer">Shimmer (Berrak & Enerjik)</option>
                          <option value="echo">Echo (Sakin Erkek)</option>
                          <option value="onyx">Onyx (Derin Erkek)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Test Voice Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleTestVoice}
                disabled={isTestingVoice}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-xs font-black text-[#0D9488] dark:text-[#5EEAD4] shadow-xs hover:border-[#0D9488] transition-all cursor-pointer"
              >
                <Play className={`w-4 h-4 ${isTestingVoice ? 'animate-spin' : ''}`} />
                <span>{isTestingVoice ? l('Ses Çalınıyor...', 'Playing audio...') : l('Seçili Sesi Canlı Test Et', 'Test Voice Sample')}</span>
              </button>
            </div>

            {/* AI Training & Site Intelligence Info */}
            <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-500/30 space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0D9488]" />
                <h5 className="text-xs font-black text-[#042F2E] dark:text-teal-200">
                  {l('Vizamigo AI Nasıl Eğitildi?', 'How Vizamigo AI Is Trained')}
                </h5>
              </div>
              <p className="text-xs text-slate-600 dark:text-teal-100/90 leading-relaxed">
                {l(
                  'Asistanımız sitedeki tüm 199 ülkenin vize rejimlerini, 90/180 Schengen gün sayacını, priz tiplerini, taksi uygulamalarını, bahşiş kurallarını, canlı döviz kurlarını ve 24/7 kriz hatlarını doğrudan yerel hafızasından okur.',
                  'Trained directly on all 199 countries, Schengen 90/180 day calculator, plug standards, ride-hailing apps, tipping etiquette, FX rates, and 24/7 consular hotlines.'
                )}
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveSettings}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#0D9488] to-[#0284C7] text-white text-xs font-black shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Check className="w-4 h-4" />
                <span>{settingsSavedToast ? l('Kaydedildi!', 'Saved Successfully!') : l('Ayarları Kaydet', 'Save Settings')}</span>
              </button>
            </div>
          </div>
        ) : (
          /* ===================================================================
              MESSAGES FEED
          =================================================================== */
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

                    {!isUser && (
                      <div className="pt-2 mt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => playMessageAudio(msg)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            speakingMsgId === msg.id
                              ? 'bg-rose-500 text-white animate-pulse shadow-xs'
                              : 'bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-[#0F766E] dark:text-[#5EEAD4] border border-slate-200 dark:border-white/10'
                          }`}
                          title={speakingMsgId === msg.id ? l('Sesi Durdur', 'Stop Audio') : l('Sesli Dinle', 'Listen Aloud')}
                        >
                          {speakingMsgId === msg.id ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5" />
                              <span>{l('Durdur', 'Stop')}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>{l('Sesli Dinle', 'Listen')}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Embedded Action Pills (Strictly max 2) */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1 max-w-[95%]">
                      {msg.actions.slice(0, 2).map((act) => {
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

            {/* Voice Listening Active Wave Indicator */}
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
        )}

        {/* ===================================================================
            QUICK SUGGESTION CHIPS (Localized in all 5 languages)
        =================================================================== */}
        {!showSettings && (
          <div className="px-3.5 py-2 border-t border-teal-500/15 bg-slate-50/70 dark:bg-white/[0.02] flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            <span className="text-xs font-bold text-slate-400 shrink-0 mr-1">
              {l('Örnekler:', 'Suggestions:')}
            </span>
            <button
              type="button"
              onClick={() => handleSend(language === 'tr' ? 'Norveç vizesi nasıl?' : language === 'de' ? 'Visum Norwegen?' : language === 'es' ? '¿Visado para Noruega?' : language === 'ru' ? 'Виза в Норвегию?' : 'Norway visa rules?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0F766E] dark:text-[#5EEAD4] hover:border-teal-500 transition-colors cursor-pointer"
            >
              🇳🇴 {l('Norveç Vizesi', 'Norway Visa')}
            </button>
            <button
              type="button"
              onClick={() => handleSend(language === 'tr' ? 'Japonya priz tipi nedir?' : language === 'de' ? 'Stecker Japan?' : language === 'es' ? '¿Enchufes en Japón?' : language === 'ru' ? 'Розетки в Японии?' : 'Japan plug type?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0F766E] dark:text-[#5EEAD4] hover:border-teal-500 transition-colors cursor-pointer"
            >
              🔌 {l('Japonya Prizi', 'Japan Plugs')}
            </button>
            <button
              type="button"
              onClick={() => handleSend(language === 'tr' ? 'Tayland taksi uygulaması hangisi?' : language === 'de' ? 'Taxi App Thailand?' : language === 'es' ? '¿Apps taxi Tailandia?' : language === 'ru' ? 'Такси в Таиланде?' : 'Thailand taxi apps?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0F766E] dark:text-[#5EEAD4] hover:border-teal-500 transition-colors cursor-pointer"
            >
              🚖 {l('Tayland Taksi', 'Thailand Taxi')}
            </button>
            <button
              type="button"
              onClick={() => handleSend(language === 'tr' ? 'İtalya 7 günlük rota hazırla' : language === 'de' ? 'Italien Reiseroute 7 Tage' : language === 'es' ? 'Ruta 7 días Italia' : language === 'ru' ? 'Маршрут по Италии на 7 дней' : '7-day Italy Itinerary')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0F766E] dark:text-[#5EEAD4] hover:border-teal-500 transition-colors cursor-pointer"
            >
              🗺️ {l('İtalya Rotası', 'Italy Route')}
            </button>
            <button
              type="button"
              onClick={() => handleSend(language === 'tr' ? 'Kimlikle hangi ülkelere gidilir?' : language === 'de' ? 'Reisen nur mit Personalausweis?' : language === 'es' ? '¿Viajar solo con DNI?' : language === 'ru' ? 'Куда можно без загранпаспорта?' : 'Countries with ID card only?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0F766E] dark:text-[#5EEAD4] hover:border-teal-500 transition-colors cursor-pointer"
            >
              🆔 {l('Kimlikle Seyahat', 'ID-Card Travel')}
            </button>
          </div>
        )}

        {/* ===================================================================
            INPUT BAR: VOICE MIC, TEXT INPUT, SEND BUTTON
        =================================================================== */}
        {!showSettings && (
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
                title={isListening ? l('Dinlemeyi Durdur', 'Stop Listening') : l('Sesli Konuş (Mikrofon)', 'Speak with Mic')}
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
        )}
      </div>
    </div>
  );
};
