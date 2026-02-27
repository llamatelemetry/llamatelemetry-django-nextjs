"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import clsx from "clsx";

import { useDocUIStore } from "../lib/store";

function scoreItem(item, tokens, scope) {
  const haystackTitle = item.title.toLowerCase();
  const haystackBody = item.body.toLowerCase();
  const haystackHeadings = item.headings.join(" ").toLowerCase();

  let score = 0;
  for (const token of tokens) {
    if (haystackTitle.includes(token)) score += 20;
    if (haystackHeadings.includes(token)) score += 8;
    if (haystackBody.includes(token)) score += 4;
  }

  if (scope !== "all" && item.category !== scope) {
    score = 0;
  }

  return score;
}

export default function SearchOverlay({ index }) {
  const {
    searchOpen,
    searchQuery,
    searchScope,
    closeSearch,
    setSearchQuery,
    setSearchScope,
    openSearch,
  } = useDocUIStore();

  useEffect(() => {
    const onKeyDown = (event) => {
      const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const isSlash = event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;
      if (isCmdK || isSlash) {
        event.preventDefault();
        openSearch();
      }
      if (event.key === "Escape") {
        closeSearch();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSearch, closeSearch]);

  const results = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return [];
    }
    const tokens = query.split(/\s+/).filter(Boolean);
    return index
      .map((item) => ({ item, score: scoreItem(item, tokens, searchScope) }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
  }, [index, searchQuery, searchScope]);

  if (!searchOpen) {
    return null;
  }

  return (
    <div className="search-overlay" role="dialog" aria-modal="true">
      <div className="search-panel">
        <div className="search-header">
          <div>
            <div className="search-title">Search the docs</div>
            <div className="search-subtitle">Quickstart, recipes, API reference, and semantics.</div>
          </div>
          <button className="ghost-button" onClick={closeSearch} aria-label="Close search">
            Close
          </button>
        </div>
        <div className="search-controls">
          <input
            autoFocus
            className="search-input"
            placeholder="Search for OTLP, GGUF, or span attributes…"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <div className="search-scope">
            {["all", "Get Started", "Guides", "API Reference", "Project"].map((scope) => (
              <button
                key={scope}
                className={clsx("chip", searchScope === scope && "chip-active")}
                onClick={() => setSearchScope(scope)}
              >
                {scope}
              </button>
            ))}
          </div>
        </div>
        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">No results yet. Try a different term.</div>
          ) : (
            results.map(({ item }) => (
              <Link key={item.id} href={item.href} className="search-result" onClick={closeSearch}>
                <div>
                  <div className="search-result-title">{item.title}</div>
                  <div className="search-result-meta">{item.category}</div>
                </div>
                <div className="search-result-excerpt">{item.excerpt}</div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
