/**
 * Gerçek giriş: Supabase Auth (e-posta + şifre, Google, şifre sıfırlama).
 * VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY tanımlı değilse giriş kapalıdır;
 * sahte hesap ya da örnek kullanıcı yoktur.
 */
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'facebook' | 'email';
  /** hesaba bağlı tüm giriş yöntemleri (ör. e-posta + Google) */
  providers?: string[];
  isPro: boolean;
  createdAt: string;
  primaryPassport: string;
  secondaryPassport?: string;
}

type Res = { success: boolean; error?: string; info?: string };

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  /** Supabase ayarlı mı (değilse giriş düğmeleri "yakında" der) */
  authReady: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<Res>;
  loginWithFacebook: () => Promise<Res>;
  loginWithEmail: (email: string, password: string) => Promise<Res>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<Res>;
  resetPassword: (email: string) => Promise<Res>;
  /** şifre sıfırlama bağlantısından gelindiyse yeni şifreyi kaydeder */
  setNewPassword: (password: string) => Promise<Res>;
  recoveryMode: boolean;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (initialTab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
}

// Proje adresi ve publishable anahtar tarayıcıda herkese açıktır (güvenlik RLS kurallarıyla sağlanır).
const URL_ = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || 'https://utlnjyquflfcvjhmgopq.supabase.co';
const KEY_ = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || 'sb_publishable_nINWLrE2ocJ4XuueayQ94g_SeEC_kLk';
/** Google girişi Supabase'te açık; kapatmak için VITE_SUPABASE_GOOGLE=0 */
export const GOOGLE_ENABLED = (import.meta.env.VITE_SUPABASE_GOOGLE as string | undefined) !== '0';
const CONFIGURED = !!(URL_ && KEY_);

// istemci yalnızca gerektiğinde yüklenir (ilk açılışı ağırlaştırmasın)
let clientP: Promise<SupabaseClient> | null = null;
export const getSupabase = (): Promise<SupabaseClient> | null => {
  if (!CONFIGURED) return null;
  if (!clientP) {
    clientP = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(URL_!, KEY_!, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'pkce' } })
    );
  }
  return clientP;
};

const toUser = (u: User): AuthUser => {
  const m = (u.user_metadata || {}) as Record<string, unknown>;
  const provider = (u.app_metadata?.provider as string) === 'google' ? 'google' : 'email';
  const email = u.email || '';
  const providers = Array.from(new Set([...(((u.app_metadata?.providers as string[]) || [])), ...((u.identities || []).map((i) => i.provider))]));
  return {
    id: u.id,
    email,
    name: (m.full_name as string) || (m.name as string) || email.split('@')[0],
    avatar: (m.avatar_url as string) || (m.picture as string) || undefined,
    provider,
    providers,
    isPro: false,
    createdAt: u.created_at,
    primaryPassport: (m.primaryPassport as string) || 'TR',
    secondaryPassport: (m.secondaryPassport as string) || undefined
  };
};

// Supabase hata iletilerini anlaşılır Türkçe/İngilizce metne çevir
const friendly = (msg: string): string => {
  const m = msg.toLowerCase();
  if (m.includes('invalid login')) return 'E-posta ya da şifre hatalı. / Wrong email or password.';
  if (m.includes('email not confirmed')) return 'E-postanı henüz onaylamadın; gelen kutundaki bağlantıya tıkla. / Please confirm your email first.';
  if (m.includes('already registered') || m.includes('already been registered')) return 'Bu e-posta zaten kayıtlı; giriş yapmayı dene. / This email is already registered.';
  if (m.includes('password should be')) return 'Şifre en az 6 karakter olmalı. / Password must be at least 6 characters.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Çok fazla deneme oldu; birkaç dakika sonra tekrar dene. / Too many attempts, try again shortly.';
  if (m.includes('provider is not enabled')) return 'Google ile giriş henüz açılmadı; e-posta ile devam et. / Google sign-in is not enabled yet.';
  return msg;
};

const OFF: Res = { success: false, error: 'Giriş çok yakında açılıyor. Uygulamanın tamamını hesapsız kullanabilirsin. / Sign-in is coming soon; everything works without an account.' };

const LOCAL_PROFILE = 'vr_current_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    // Supabase oturumu varsa ilk çizimde kullanıcıyı göster (sonra doğrulanır)
    try {
      const k = Object.keys(localStorage).find((x) => /^sb-.*-auth-token$/.test(x));
      if (CONFIGURED && k) {
        const s = JSON.parse(localStorage.getItem(k) || 'null') as Session | null;
        if (s?.user) return toUser(s.user);
      }
      // eski sahte oturumları temizle
      localStorage.removeItem(LOCAL_PROFILE);
      localStorage.removeItem('vr_user_accounts');
    } catch {}
    return null;
  });
  const [loading, setLoading] = useState(CONFIGURED);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  // Supabase kütüphanesi (~200 KB) yalnızca gerektiğinde yüklenir: kayıtlı oturum varsa,
  // e-posta bağlantısından gelindiyse ya da giriş penceresi açılınca
  const needsInit = () => {
    try {
      if (Object.keys(localStorage).some((x) => /^sb-.*-auth-token$/.test(x))) return true;
    } catch {}
    const h = `${window.location.search}${window.location.hash}`;
    return /[?&#](code|access_token|error_description|token_hash|type)=/.test(h);
  };
  const [initNow, setInitNow] = useState(() => CONFIGURED && typeof window !== 'undefined' && needsInit());
  useEffect(() => {
    if (isAuthModalOpen && CONFIGURED) setInitNow(true);
  }, [isAuthModalOpen]);
  useEffect(() => {
    if (!initNow) {
      setLoading(false);
      return;
    }
    const p = getSupabase();
    if (!p) return;
    let unsub: (() => void) | undefined;
    let alive = true;
    p.then((sb) => {
      sb.auth.getSession().then(({ data }) => {
        if (!alive) return;
        setUser(data.session?.user ? toUser(data.session.user) : null);
        setLoading(false);
      });
      const { data } = sb.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ? toUser(session.user) : null);
        if (event === 'PASSWORD_RECOVERY') {
          setRecoveryMode(true);
          setIsAuthModalOpen(true);
        }
        if (event === 'SIGNED_IN') setIsAuthModalOpen((o) => (o && !recoveryMode ? false : o));
      });
      unsub = () => data.subscription.unsubscribe();
    }).catch(() => setLoading(false));
    return () => {
      alive = false;
      unsub?.();
    };
  }, [initNow]); // eslint-disable-line react-hooks/exhaustive-deps

  const redirect = () => (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : undefined);

  const loginWithGoogle = async (): Promise<Res> => {
    const p = getSupabase();
    if (!p) return OFF;
    const sb = await p;
    const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirect() } });
    return error ? { success: false, error: friendly(error.message) } : { success: true };
  };

  const loginWithFacebook = async (): Promise<Res> => OFF;

  const loginWithEmail = async (email: string, password: string): Promise<Res> => {
    const p = getSupabase();
    if (!p) return OFF;
    const sb = await p;
    const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return { success: false, error: friendly(error.message) };
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const registerWithEmail = async (name: string, email: string, password: string): Promise<Res> => {
    const p = getSupabase();
    if (!p) return OFF;
    const sb = await p;
    const { data, error } = await sb.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: name.trim() }, emailRedirectTo: redirect() }
    });
    if (error) return { success: false, error: friendly(error.message) };
    // e-posta onayı açıksa oturum gelmez: kullanıcıya gelen kutusunu kontrol etmesini söyle
    if (!data.session) return { success: true, info: 'Hesabın oluşturuldu. E-postana gelen onay bağlantısına tıkla, sonra giriş yap. / Check your inbox to confirm your email.' };
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const resetPassword = async (email: string): Promise<Res> => {
    const p = getSupabase();
    if (!p) return OFF;
    const sb = await p;
    const { error } = await sb.auth.resetPasswordForEmail(email.trim(), { redirectTo: redirect() });
    if (error) return { success: false, error: friendly(error.message) };
    return { success: true, info: 'Şifre sıfırlama bağlantısını e-postana gönderdik. / We sent you a reset link.' };
  };

  const setNewPassword = async (password: string): Promise<Res> => {
    const p = getSupabase();
    if (!p) return OFF;
    const sb = await p;
    const { error } = await sb.auth.updateUser({ password });
    if (error) return { success: false, error: friendly(error.message) };
    setRecoveryMode(false);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    const p = getSupabase();
    setUser(null);
    p?.then((sb) => sb.auth.signOut()).catch(() => {});
  };

  const updateUser = useCallback(
    (updates: Partial<AuthUser>) => {
      if (!user) return;
      setUser({ ...user, ...updates });
      const meta: Record<string, unknown> = {};
      if (updates.name !== undefined) meta.full_name = updates.name;
      if (updates.primaryPassport !== undefined) meta.primaryPassport = updates.primaryPassport;
      if (updates.secondaryPassport !== undefined) meta.secondaryPassport = updates.secondaryPassport;
      if (Object.keys(meta).length) getSupabase()?.then((sb) => sb.auth.updateUser({ data: meta })).catch(() => {});
    },
    [user]
  );

  const openAuthModal = (initialTab: 'login' | 'register' = 'login') => {
    setAuthModalTab(initialTab);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        authReady: CONFIGURED,
        loading,
        loginWithGoogle,
        loginWithFacebook,
        loginWithEmail,
        registerWithEmail,
        resetPassword,
        setNewPassword,
        recoveryMode,
        logout,
        updateUser,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalTab,
        setAuthModalTab
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
