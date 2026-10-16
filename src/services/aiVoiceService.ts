/**
 * Vizamigo High-Fidelity Audio & Neural Voice Synthesis Engine
 * Provides dual-engine voice playback:
 * 1. Client Browser OS Speech Synthesis (optimized with Microsoft Natural / Google Neural / Apple Siri voices)
 * 2. Studio-Quality Cloud Neural Voice (ElevenLabs & OpenAI TTS) for 100% human-grade emotion, breath & natural cadence.
 */

export interface VoiceSettings {
  engine: 'browser' | 'elevenlabs' | 'openai';
  elevenLabsApiKey: string;
  elevenLabsVoiceId: string;
  openAiApiKey: string;
  openAiVoice: 'nova' | 'alloy' | 'echo' | 'shimmer' | 'fable' | 'onyx';
  speechRate: number; // 0.85 - 1.15
  autoSpeak: boolean; // Auto-read answers
  geminiApiKey?: string; // Optional Gemini API key for freeform LLM reasoning
}

const STORAGE_KEY = 'vizamigo_voice_ai_settings';

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  engine: 'browser',
  elevenLabsApiKey: '',
  elevenLabsVoiceId: '21m00Tcm4TlvDq8ikWAM', // Rachel / Multilingual
  openAiApiKey: '',
  openAiVoice: 'nova',
  speechRate: 0.94,
  autoSpeak: false,
  geminiApiKey: ''
};

export function getVoiceSettings(): VoiceSettings {
  if (typeof window === 'undefined') return DEFAULT_VOICE_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_VOICE_SETTINGS;
    return { ...DEFAULT_VOICE_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_VOICE_SETTINGS;
  }
}

export function saveVoiceSettings(settings: Partial<VoiceSettings>): VoiceSettings {
  const current = getVoiceSettings();
  const updated = { ...current, ...settings };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignored
  }
  return updated;
}

let activeAudioElement: HTMLAudioElement | null = null;
let voicesLoaded = false;
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const loadVoices = () => {
    cachedVoices = window.speechSynthesis.getVoices();
    if (cachedVoices.length > 0) {
      voicesLoaded = true;
    }
  };
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

/**
 * Finds the highest quality, most natural neural voice available on the user's OS
 */
export function getBestBrowserVoice(lang: string = 'tr'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const targetLang = (lang || 'tr').toLowerCase();
  const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(targetLang));
  if (langVoices.length === 0) return null;

  // Priority ranking for natural-sounding modern neural voices
  const highQualityKeywords = [
    'natural',
    'online',
    'neural',
    'google',
    'siri',
    'yelda',
    'tolga',
    'emel',
    'cem',
    'filiz',
    'premium',
    'enhanced'
  ];

  for (const keyword of highQualityKeywords) {
    const match = langVoices.find((v) => v.name.toLowerCase().includes(keyword));
    if (match) return match;
  }

  return langVoices.find((v) => v.default) || langVoices[0];
}

/**
 * Stops all currently playing audio (browser TTS or cloud audio)
 */
export function stopAllPlayback(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignored
    }
  }

  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.src = '';
    } catch {
      // Ignored
    }
    activeAudioElement = null;
  }
}

/**
 * Cleans text from markdown and symbols for natural conversational speaking
 */
export function sanitizeTextForSpeech(text: string): string {
  if (!text) return '';
  return text
    .replace(/[*_#`~]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[•\t]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Plays neural cloud audio from ElevenLabs
 */
async function playElevenLabsTTS(
  text: string,
  apiKey: string,
  voiceId: string,
  onEnd?: () => void
): Promise<void> {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId || '21m00Tcm4TlvDq8ikWAM'}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': apiKey
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.35,
        use_speaker_boost: true
      }
    })
  });

  if (!response.ok) {
    throw new Error(`ElevenLabs error: ${response.statusText}`);
  }

  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  const audio = new Audio(audioUrl);
  activeAudioElement = audio;

  audio.onended = () => {
    URL.revokeObjectURL(audioUrl);
    activeAudioElement = null;
    onEnd?.();
  };
  audio.onerror = () => {
    URL.revokeObjectURL(audioUrl);
    activeAudioElement = null;
    onEnd?.();
  };

  await audio.play();
}

/**
 * Plays neural cloud audio from OpenAI TTS
 */
async function playOpenAiTTS(
  text: string,
  apiKey: string,
  voice: string = 'nova',
  onEnd?: () => void
): Promise<void> {
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'tts-1',
      input: text,
      voice: voice || 'nova'
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI TTS error: ${response.statusText}`);
  }

  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  const audio = new Audio(audioUrl);
  activeAudioElement = audio;

  audio.onended = () => {
    URL.revokeObjectURL(audioUrl);
    activeAudioElement = null;
    onEnd?.();
  };
  audio.onerror = () => {
    URL.revokeObjectURL(audioUrl);
    activeAudioElement = null;
    onEnd?.();
  };

  await audio.play();
}

/**
 * Unified speech dispatcher: selects ElevenLabs, OpenAI, or best browser voice
 */
export async function playNaturalSpeech(
  text: string,
  lang: string = 'tr',
  onEnd?: () => void
): Promise<void> {
  stopAllPlayback();
  const clean = sanitizeTextForSpeech(text);
  if (!clean) {
    onEnd?.();
    return;
  }

  const settings = getVoiceSettings();

  // 1. ElevenLabs Studio Audio (if enabled with key)
  if (settings.engine === 'elevenlabs' && settings.elevenLabsApiKey) {
    try {
      await playElevenLabsTTS(clean, settings.elevenLabsApiKey, settings.elevenLabsVoiceId, onEnd);
      return;
    } catch (err) {
      console.warn('ElevenLabs playback failed, falling back to browser voice:', err);
    }
  }

  // 2. OpenAI TTS Audio (if enabled with key)
  if (settings.engine === 'openai' && settings.openAiApiKey) {
    try {
      await playOpenAiTTS(clean, settings.openAiApiKey, settings.openAiVoice, onEnd);
      return;
    } catch (err) {
      console.warn('OpenAI TTS playback failed, falling back to browser voice:', err);
    }
  }

  // 3. High-Fidelity Browser Speech Synthesis (Fallback)
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      const utterance = new SpeechSynthesisUtterance(clean);
      const langCodeMap: Record<string, string> = {
        tr: 'tr-TR',
        en: 'en-US',
        de: 'de-DE',
        es: 'es-ES',
        ru: 'ru-RU'
      };
      utterance.lang = langCodeMap[lang] || 'tr-TR';
      utterance.rate = settings.speechRate || 0.94; // Calm, natural cadence
      utterance.pitch = 1.0;

      const bestVoice = getBestBrowserVoice(lang);
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onend = () => onEnd?.();
      utterance.onerror = () => onEnd?.();

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Browser speech synthesis failed:', err);
      onEnd?.();
    }
  } else {
    onEnd?.();
  }
}
