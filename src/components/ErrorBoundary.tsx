import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  readonly children: ReactNode;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // In production, this would log to an external service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            fontFamily: "'Zen Kaku Gothic New', sans-serif",
            color: "#33291E",
            padding: 40,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 48,
              marginBottom: 24,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              color: "#C4A055",
            }}
          >
            ○
          </div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 300,
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "0.08em",
            }}
          >
            エラーが発生しました
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#A89070",
              marginTop: 16,
              lineHeight: 1.8,
            }}
          >
            申し訳ありません。予期しないエラーが発生しました。
            <br />
            ページを再読み込みしてお試しください。
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
            style={{
              marginTop: 32,
              borderRadius: 0,
            }}
          >
            再読み込み
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
