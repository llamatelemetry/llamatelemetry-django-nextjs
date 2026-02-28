"use client";

import Link from "next/link";

import { useDocUIStore } from "../lib/store";

const quickLinks = [
  { label: "Quickstart", href: "/get-started/quickstart" },
  { label: "Recipes", href: "/recipes" },
  { label: "Trace Semantics", href: "/semantics" },
  { label: "Demos", href: "/demos" },
];

export default function Topbar({ site }) {
  const { openSearch } = useDocUIStore();
  const siteName = site?.name || "llamatelemetry Documentation";
  const siteVersion = site?.version || "v0.1.0";

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <span className="brand-mark">llama</span>
          <span className="brand-name">{siteName}</span>
        </div>
        <div className="topbar-links">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="topbar-link">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="topbar-actions">
          <button className="search-button" onClick={openSearch}>
            Search
            <span className="shortcut">⌘K</span>
          </button>
          <span className="version-badge">{siteVersion}</span>
        </div>
      </div>
    </header>
  );
}
