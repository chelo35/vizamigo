import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isTabBoundary?: boolean;
  tabName?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Vizamigo Application Error:', error, errorInfo);
  }

  private handleSafeRecovery = () => {
    try {
      // Clear potentially corrupted session/theme storage without deleting user data
      sessionStorage.clear();
      // Remove bad route or state
      window.location.href = '/tr';
    } catch {
      window.location.reload();
    }
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  public render() {
    if (this.state.hasError) {
      // Tab-level localized boundary: Does NOT crash the app shell
      if (this.props.isTabBoundary) {
        return (
          <div className="bento-lagoon-card rounded-[26px] p-6 sm:p-8 text-center space-y-4 border-2 border-rose-500/30">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 mx-auto flex items-center justify-center text-2xl shadow-xs">
              ⚠️
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                {this.props.tabName ? `${this.props.tabName} Yüklenirken Geçici Bir Sorun Oluştu` : 'Bu Sekme Yüklenirken Bir Sorun Oluştu'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Veriler işlenirken beklenmeyen bir hata meydana geldi. Sekmeyi yeniden deneyebilir veya Keşfet panosuna dönebilirsiniz.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-xs shadow-md hover:brightness-110 transition-all cursor-pointer"
              >
                Yeniden Dene
              </button>
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/tr';
                }}
                className="px-5 py-2.5 rounded-full bg-white dark:bg-white/10 text-slate-700 dark:text-white font-bold text-xs border border-slate-200/80 dark:border-white/10 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Ana Sayfaya Dön
              </button>
            </div>
          </div>
        );
      }

      // Root Global Error Boundary
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-3xl mb-4 border border-rose-500/30">
            ⚠️
          </div>
          <h1 className="text-2xl font-black mb-2 tracking-tight">Beklenmeyen Bir Hata Oluştu</h1>
          <p className="text-slate-400 text-sm max-w-md mb-6">
            Arayüz yüklenirken geçici bir hata meydana geldi. Sayfayı yenileyebilir veya güvenli kurtarma modu ile ana sayfaya dönebilirsiniz.
          </p>

          {import.meta.env?.DEV && this.state.error && (
            <pre id="error-details" className="text-xs text-rose-300 bg-black/60 border border-rose-500/30 p-4 rounded-xl max-w-2xl overflow-auto text-left mb-6 font-mono whitespace-pre-wrap">
              {this.state.error.name}: {this.state.error.message}
              {"\n"}
              {this.state.error.stack}
            </pre>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              Sayfayı Yenile
            </button>
            <button
              type="button"
              onClick={this.handleSafeRecovery}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Güvenli Mod: Ana Sayfaya Dön
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

