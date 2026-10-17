import React, { useState, useRef } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n';
import { useModalA11y } from '../utils/useModalA11y';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    loginWithGoogle,
    loginWithFacebook,
    loginWithEmail,
    registerWithEmail,
    authModalTab,
    setAuthModalTab
  } = useAuth();
  const { t, language, l } = useI18n();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useModalA11y({
    isOpen: isAuthModalOpen,
    onClose: closeAuthModal,
    modalRef
  });

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    const res = await loginWithGoogle();
    setLoading(false);
    if (!res.success) {
      setError(res.error || t.invalidCredentials);
    } else {
      setSuccessMsg(t.loginSuccess);
      setTimeout(() => {
        closeAuthModal();
      }, 500);
    }
  };

  const handleFacebookLogin = async () => {
    setError(null);
    setLoading(true);
    const res = await loginWithFacebook();
    setLoading(false);
    if (!res.success) {
      setError(res.error || t.invalidCredentials);
    } else {
      setSuccessMsg(t.loginSuccess);
      setTimeout(() => {
        closeAuthModal();
      }, 500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setError(l('Lütfen tüm alanları doldurun', 'Please fill in all fields', 'Bitte füllen Sie alle Felder aus'));
      return;
    }

    if (authModalTab === 'register') {
      if (password !== confirmPassword) {
        setError(t.passwordMismatch);
        return;
      }
      if (password.length < 6) {
        setError(l('Şifre en az 6 karakter olmalıdır', 'Password must be at least 6 characters', 'Das Passwort muss mindestens 6 Zeichen lang sein'));
        return;
      }

      setLoading(true);
      const res = await registerWithEmail(name, email, password);
      setLoading(false);
      if (!res.success) {
        setError(res.error || t.invalidCredentials);
      } else {
        setSuccessMsg(t.registerSuccess);
        setTimeout(() => closeAuthModal(), 600);
      }
    } else {
      setLoading(true);
      const res = await loginWithEmail(email, password);
      setLoading(false);
      if (!res.success) {
        setError(res.error || t.invalidCredentials);
      } else {
        setSuccessMsg(t.loginSuccess);
        setTimeout(() => closeAuthModal(), 500);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        tabIndex={-1}
        className="glass-panel rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative outline-none"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 pb-3 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">✈️</span>
            <div>
              <h2 id="auth-modal-title" className="text-base font-bold text-slate-900 dark:text-white tracking-[-0.02em]">
                {authModalTab === 'login' ? t.loginTitle : t.registerTitle}
              </h2>
              <p className="text-xs text-slate-500 dark:text-[#8E9DBE]">
                {authModalTab === 'login' ? t.loginSubtitle : t.registerSubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            aria-label={t.reportClose || 'Kapat'}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 dark:border-white/10 p-2 bg-slate-50/60 dark:bg-white/[0.03] gap-1.5">
          <button
            type="button"
            onClick={() => {
              setAuthModalTab('login');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              authModalTab === 'login'
                ? 'tab-chip-active'
                : 'tab-chip-inactive'
            }`}
          >
            {t.signIn}
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalTab('register');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              authModalTab === 'register'
                ? 'tab-chip-active'
                : 'tab-chip-inactive'
            }`}
          >
            {t.signUp}
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Social One-Click Login Buttons: Google & Facebook */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all shadow-xs hover:border-slate-400 cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{t.continueWithGoogle}</span>
            </button>

            <button
              type="button"
              onClick={handleFacebookLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>{t.continueWithFacebook}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-slate-900 px-3 text-xs text-slate-400 uppercase font-medium">
              {t.orContinueWithEmail}
            </span>
          </div>

          {/* Error & Success Messages */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authModalTab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.nameLabel}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.emailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t.passwordLabel}
                </label>
                {authModalTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('celebisahin1981@gmail.com');
                      setPassword('gezgin123');
                    }}
                    className="text-xs text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                  >
                    {l('Örnek bilgileri doldur', 'Quick demo fill', 'Demo-Daten ausfüllen')}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authModalTab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.confirmPasswordLabel}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141C3B]/80 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-white/20"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-nubair-primary !py-3 text-xs flex items-center justify-center gap-2"
            >
              {loading && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              <span>{authModalTab === 'login' ? t.signIn : t.signUp}</span>
            </button>
          </form>

          {/* Bottom Switch Note */}
          <div className="text-center pt-2 text-xs text-slate-500 dark:text-[#8E9DBE]">
            {authModalTab === 'login' ? (
              <span>
                {t.noAccountPrompt}{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalTab('register')}
                  className="font-bold text-slate-900 dark:text-white hover:underline cursor-pointer"
                >
                  {t.signUp}
                </button>
              </span>
            ) : (
              <span>
                {t.alreadyHaveAccount}{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalTab('login')}
                  className="font-bold text-slate-900 dark:text-white hover:underline cursor-pointer"
                >
                  {t.signIn}
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
