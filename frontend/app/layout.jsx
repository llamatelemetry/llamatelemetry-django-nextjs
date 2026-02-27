import "./globals.css";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: {
    default: "llamatelemetry Documentation",
    template: "%s - llamatelemetry Documentation",
  },
  description:
    "Extensive documentation for llamatelemetry v0.1.0: inference, observability, Kaggle, GGUF, APIs, and notebooks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <header className="topbar">
            <div className="topbar-inner">
              <div className="brand">
                <span className="brand-mark">llama</span>
                <span className="brand-name">llamatelemetry Documentation</span>
              </div>
              <div className="brand-meta">v0.1.0 · CUDA-first Python SDK</div>
            </div>
          </header>
          <div className="layout">
            <aside className="layout-sidebar">
              <Sidebar />
            </aside>
            <main className="layout-content">{children}</main>
          </div>
          <footer className="footer">
            <div>Copyright © 2026 llamatelemetry</div>
            <div>Built with Django + Next.js</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
