import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.clear(); // Clear potentially corrupted state
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Oups ! Quelque chose s'est mal passé.</h1>
          <p className="text-slate-500 font-medium mb-8 max-w-md">
            Une erreur inattendue est survenue. Nous vous recommandons de recharger l'application.
          </p>
          
          <div className="space-y-4 w-full max-w-xs">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-5 h-5" /> Recharger
            </button>
            
            <button
              onClick={this.handleReset}
              className="w-full py-4 bg-white text-red-600 border-2 border-red-50 rounded-2xl font-black text-lg"
            >
              Réinitialiser l'application
            </button>
          </div>
          
          {(import.meta as any).env.DEV && (
            <div className="mt-12 p-4 bg-slate-100 rounded-xl text-left overflow-auto max-w-xl w-full">
              <p className="text-xs font-mono text-red-800 whitespace-pre-wrap">
                {this.state.error?.toString()}
              </p>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
