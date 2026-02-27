"use client";

import Link from "next/link";
import clsx from "clsx";

import { useDocUIStore } from "../lib/store";

const quickLinks = [
  { label: "Quickstart", href: "/get-started/quickstart" },
  { label: "Recipes", href: "/recipes" },
  { label: "Trace Semantics", href: "/semantics" },
  { label: "Demos", href: "/demos" },
];

const versions = ["v0.1.0", "v0.0.x"];

export default function Topbar() {
  const { openSearch, version, setVersion } = useDocUIStore();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <span className="brand-mark">llama</span>
          <span className="brand-name">llamatelemetry Documentation</span>
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
          <div className="version-switcher">
            <span className="version-label">Version</span>
            <div className="version-options">
              {versions.map((item) => (
                <button
                  key={item}
                  className={clsx("chip", version === item && "chip-active")}
                  onClick={() => setVersion(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
