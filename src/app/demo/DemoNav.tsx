"use client";

import { useEffect, useRef } from "react";
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
  const navRef = useRef<HTMLElement>(null);

  // On narrow phones the tabs scroll sideways. Scroll the strip so the current tab is visible.
  useEffect(() => {
    const strip = navRef.current?.querySelector<HTMLElement>(".container");
    const active = navRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (strip && active) {
      strip.scrollTo({ left: active.offsetLeft - strip.offsetLeft - 16, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <nav ref={navRef} className="demo-nav" aria-label="Demo sections">
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
