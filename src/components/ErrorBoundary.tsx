import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
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

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-3xl mb-4 border border-rose-500/30">
            ⚠️
          </div>
          <h1 className="text-2xl font-black mb-2 tracking-tight">Beklenmeyen Bir Hata Oluştu</h1>
          <p className="text-slate-400 text-sm max-w-md mb-4">
            Arayüz yüklenirken geçici bir hata meydana geldi. Sayfayı yenileyerek deneyebilirsiniz.
          </p>
          {import.meta.env?.DEV && this.state.error && (
            <pre id="error-details" className="text-xs text-rose-300 bg-black/60 border border-rose-500/30 p-4 rounded-xl max-w-2xl overflow-auto text-left mb-6 font-mono whitespace-pre-wrap">
              {this.state.error.name}: {this.state.error.message}
              {"\n"}
              {this.state.error.stack}
            </pre>
          )}
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
        </div>
      );
    }

    return this.props.children;
  }
}
