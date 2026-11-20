import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { bodyFont, handFont, headingFont } from "./fonts";
import "./theme.css";   // school colors (load first so globals.css can use them)
import "./globals.css"; // shared styles

// <title> and description shown in browser tabs and search results.
export const metadata: Metadata = {
  title: { default: "My IT Helper", template: "%s · My IT Helper" },
  description: "IT help tickets made simple for schools. Teachers ask for help, IT fixes it.",
};

// Makes the site fit phone screens properly.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2b2f36", // browser bar color on phones (matches --charcoal in theme.css)
};

// The layout wraps EVERY page: header on top, the page in the middle, footer at the bottom.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The font classes create CSS variables (--font-heading, --font-body, --font-hand)
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${handFont.variable}`}>
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="home-link" aria-label="My IT Helper home page">
              <Logo tone="light" height={40} preload className="header-logo" />
            </Link>
            <nav aria-label="Account">
              <Link href="/login" className="btn btn-outline btn-sm">Log in</Link>
              <Link href="/signup" className="btn btn-primary btn-sm">Sign up</Link>
            </nav>
          </div>
          {/* Decorative gold ruler along the bottom of the header (drawn in CSS) */}
          <div className="ruler" aria-hidden="true" />
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container footer-top">
            <div>
              <Logo tone="dark" height={30} />
              <p className="footer-tagline">The IT help desk built for schools.</p>
            </div>
            <nav className="footer-links" aria-label="Footer">
              <Link href="/demo">Demo</Link>
              <Link href="/signup">Sign up</Link>
              <Link href="/login">Log in</Link>
            </nav>
          </div>
          <div className="footer-bottom">
            <div className="container">
              {/* The year is filled in when the site is built (each deploy). */}
              <p>© {new Date().getFullYear()} My IT Helper. All rights reserved.</p>
              <p>A project by <strong>Mahdi Rizvi</strong></p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
