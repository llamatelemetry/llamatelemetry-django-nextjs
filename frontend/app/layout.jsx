import "./globals.css";

import SearchOverlay from "../components/SearchOverlay";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { getSearchIndex } from "../lib/search";

export const metadata = {
  title: {
    default: "llamatelemetry Documentation",
    template: "%s - llamatelemetry Documentation",
  },
  description:
    "Extensive documentation for llamatelemetry v0.1.0: inference, observability, Kaggle, GGUF, APIs, and notebooks.",
};

export default async function RootLayout({ children }) {
  const searchIndex = getSearchIndex();

  return (
    <html lang="en">
      <body>
        <div className="page">
          <Topbar />
          <SearchOverlay index={searchIndex} />
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
