"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Tabs across the top of every demo page. The current page is highlighted.
const LINKS = [
  { href: "/demo", label: "Overview" },
  { href: "/demo/teacher", label: "Teacher view" },
  { href: "/demo/submit", label: "Submit a ticket" },
  { href: "/demo/faq", label: "FAQ" },
  { href: "/demo/admin", label: "IT admin view" },
];

export default function DemoNav() {
  const pathname = usePathname(); // the current URL path, e.g. "/demo/faq"

  return (
    <nav className="demo-nav" aria-label="Demo sections">
      <div className="container">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="demo-tab"
            // aria-current tells screen readers which tab is the current page
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
