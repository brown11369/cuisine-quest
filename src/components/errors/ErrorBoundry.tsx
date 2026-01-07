import React, { type ReactNode } from "react";

type FallbackProps = {
  error: Error | null;
  onRetry: () => void;
};

type Props = {
  fallback?: React.ComponentType<FallbackProps>;
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
  retryKey: number;
};

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    retryKey: 0,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error:", error.message);
    console.error("Component Stack:", info.componentStack);
  }

  handleRetry = () => {
    this.setState((prev) => ({
      hasError: false,
      error: null,
      retryKey: prev.retryKey + 1,
    }));
  };

  render() {
    const { hasError, error, retryKey } = this.state;
    const { fallback: FallBack, children } = this.props;

    if (hasError) {
      if (!FallBack) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-4 bg-red-50 text-red-900 rounded">
            <h2 className="text-xl font-semibold mb-2">
              Something went wrong.
            </h2>
            {error && <p className="mb-4">{error.message}</p>}
            <button
              onClick={this.handleRetry}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        );
      }

      return <FallBack error={error} onRetry={this.handleRetry} />;
    }

    return <div key={retryKey}>{children}</div>;
  }
}

export default ErrorBoundary;
