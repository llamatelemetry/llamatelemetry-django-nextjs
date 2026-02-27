"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { nav, normalizeHref } from "../lib/nav";

export default function Sidebar() {
  const pathname = normalizeHref(usePathname() || "/");

  return (
    <nav className="sidebar">
      {nav.map((section) => (
        <div key={section.section} className="sidebar-section">
          <div className="sidebar-title">{section.section}</div>
          <ul>
            {section.items.map((item) => {
              const href = normalizeHref(item.href);
              const isActive = pathname === href;
              return (
                <li key={item.href}>
                  <Link className={clsx("sidebar-link", isActive && "active")} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
