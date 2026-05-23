import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

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
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/dashboard';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#05160b] text-white font-sans relative overflow-hidden">
          {/* Background Glow Effect */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] left-[25%] w-[50%] h-[50%] bg-green-900/10 blur-[130px] rounded-full"></div>
            <div className="absolute bottom-[20%] right-[25%] w-[45%] h-[45%] bg-green-800/10 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative w-full max-w-lg bg-[#0a2313]/90 backdrop-blur-md rounded-[32px] border border-[#143d22] p-10 shadow-2xl text-center z-10">
            {/* Icon Banner */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                <AlertTriangle className="w-8 h-8" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-extrabold tracking-tight mb-3">Something Went Wrong</h1>
            <p className="text-[#8ba494] text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Recipro encountered an unexpected problem. We've logged this issue and are working on fixing it. Let's get you back to cooking!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="py-3 px-6 bg-green-500 hover:bg-green-400 text-[#05160b] rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-green-500/10 border-0"
              >
                <RotateCcw className="w-4 h-4" />
                Reload Page
              </button>
              <button
                type="button"
                onClick={() => { window.location.href = '/'; }}
                className="py-3 px-6 bg-[#0d2d18] hover:bg-[#143d22] border border-[#143d22] text-[#8ba494] hover:text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Go to Landing
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-[#143d22]/50 text-left">
              <details className="cursor-pointer group">
                <summary className="text-xs text-[#8ba494]/60 hover:text-[#8ba494] transition-colors font-mono">
                  View diagnostic information
                </summary>
                <div className="mt-3 p-4 bg-[#05160b] border border-[#143d22]/40 rounded-xl max-h-40 overflow-y-auto font-mono text-[10px] text-red-400/90 whitespace-pre-wrap">
                  {this.state.error?.toString() || 'Unknown error'}
                </div>
              </details>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
