import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'facebook' | 'email';
  isPro: boolean;
  createdAt: string;
  primaryPassport: string;
  secondaryPassport?: string;
}

interface StoredAccount {
  user: AuthUser;
  passwordHash?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginWithFacebook: () => Promise<{ success: boolean; error?: string }>;
  loginWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (initialTab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
}

const STORAGE_KEY_SESSION = 'vr_current_user';
const STORAGE_KEY_ACCOUNTS = 'vr_user_accounts';

const DEFAULT_ACCOUNTS: StoredAccount[] = [
  {
    user: {
      id: 'usr_google_default',
      email: 'celebisahin1981@gmail.com',
      name: 'Şahin Çelebi',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      provider: 'google',
      isPro: true,
      createdAt: '2026-01-15T10:00:00.000Z',
      primaryPassport: 'TR',
      secondaryPassport: 'DE'
    }
  },
  {
    user: {
      id: 'usr_demo',
      email: 'gezgin@visacompass.com',
      name: 'Gezgin Gezen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      provider: 'email',
      isPro: false,
      createdAt: '2026-02-01T12:00:00.000Z',
      primaryPassport: 'TR'
    },
    passwordHash: 'gezgin123'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY_SESSION);
        if (saved) return JSON.parse(saved);
      }
    } catch {}
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  // Initialize stored accounts if not present
  useEffect(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        const existing = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
        if (!existing) {
          localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(DEFAULT_ACCOUNTS));
        }
      }
    } catch {}
  }, []);

  const getAccounts = (): StoredAccount[] => {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
        if (raw) return JSON.parse(raw);
      }
    } catch {}
    return DEFAULT_ACCOUNTS;
  };

  const saveAccounts = (accounts: StoredAccount[]) => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
      }
    } catch {}
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate real OAuth popup / connection delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // Standard Google authenticated profile
      const googleUser: AuthUser = {
        id: `usr_g_${Date.now()}`,
        email: 'celebisahin1981@gmail.com',
        name: 'Şahin Çelebi',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        provider: 'google',
        isPro: true,
        createdAt: new Date().toISOString(),
        primaryPassport: 'TR',
        secondaryPassport: 'DE'
      };

      setUser(googleUser);
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(googleUser));
      setIsAuthModalOpen(false);
      return { success: true };
    } catch {
      return { success: false, error: 'Google authentication failed' };
    }
  };

  const loginWithFacebook = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const fbUser: AuthUser = {
        id: `usr_fb_${Date.now()}`,
        email: 'facebook.user@vizamigo.com',
        name: 'Gezgin (Facebook)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        provider: 'facebook',
        isPro: true,
        createdAt: new Date().toISOString(),
        primaryPassport: 'TR'
      };

      setUser(fbUser);
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(fbUser));
      setIsAuthModalOpen(false);
      return { success: true };
    } catch {
      return { success: false, error: 'Facebook authentication failed' };
    }
  };

  const loginWithEmail = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const accounts = getAccounts();
      const cleanEmail = email.trim().toLowerCase();

      // Check if user exists
      const account = accounts.find(a => a.user.email.toLowerCase() === cleanEmail);

      if (!account) {
        // For convenience in testing: if user enters any valid email with 6+ char password, automatically register/log in!
        if (password.length >= 6) {
          const newUser: AuthUser = {
            id: `usr_em_${Date.now()}`,
            email: cleanEmail,
            name: cleanEmail.split('@')[0],
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}`,
            provider: 'email',
            isPro: false,
            createdAt: new Date().toISOString(),
            primaryPassport: 'TR'
          };
          const newAccount: StoredAccount = { user: newUser, passwordHash: password };
          saveAccounts([...accounts, newAccount]);
          setUser(newUser);
          localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(newUser));
          setIsAuthModalOpen(false);
          return { success: true };
        }
        return { success: false, error: 'Kullanıcı bulunamadı / User not found' };
      }

      if (account.passwordHash && account.passwordHash !== password) {
        return { success: false, error: 'Hatalı şifre / Invalid password' };
      }

      setUser(account.user);
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(account.user));
      setIsAuthModalOpen(false);
      return { success: true };
    } catch {
      return { success: false, error: 'Giriş yapılamadı / Login error' };
    }
  };

  const registerWithEmail = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const accounts = getAccounts();
      const cleanEmail = email.trim().toLowerCase();

      if (accounts.some(a => a.user.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'Bu e-posta adresi zaten kayıtlı / Email already registered' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Şifre en az 6 karakter olmalıdır / Password must be at least 6 characters' };
      }

      const newUser: AuthUser = {
        id: `usr_reg_${Date.now()}`,
        email: cleanEmail,
        name: name.trim() || cleanEmail.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || cleanEmail)}`,
        provider: 'email',
        isPro: false,
        createdAt: new Date().toISOString(),
        primaryPassport: 'TR'
      };

      const newAccounts: StoredAccount[] = [...accounts, { user: newUser, passwordHash: password }];
      saveAccounts(newAccounts);

      setUser(newUser);
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(newUser));
      setIsAuthModalOpen(false);
      return { success: true };
    } catch {
      return { success: false, error: 'Kayıt başarısız / Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    } catch {}
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    try {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(updated));
      const accounts = getAccounts();
      const idx = accounts.findIndex(a => a.user.id === user.id);
      if (idx !== -1) {
        accounts[idx].user = updated;
        saveAccounts(accounts);
      }
    } catch {}
  };

  const openAuthModal = (initialTab: 'login' | 'register' = 'login') => {
    setAuthModalTab(initialTab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithGoogle,
        loginWithFacebook,
        loginWithEmail,
        registerWithEmail,
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
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
