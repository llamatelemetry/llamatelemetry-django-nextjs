import "./globals.css";

import SearchOverlay from "../components/SearchOverlay";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { getSearchIndex } from "../lib/search";
import { getSiteInfo } from "../lib/site";

export async function generateMetadata() {
  const site = await getSiteInfo();
  return {
    title: {
      default: site.name,
      template: site.titleTemplate,
    },
    description: site.description,
  };
}

export default async function RootLayout({ children }) {
  const searchIndex = getSearchIndex();
  const site = await getSiteInfo();

  return (
    <html lang="en">
      <body>
        <div className="page">
          <Topbar site={site} />
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
