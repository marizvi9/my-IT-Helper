// The site's fonts. next/font downloads them when the site is BUILT and serves
// them from our own domain.
// PRIVACY/SECURITY: visitors' browsers never contact Google, so Google can't see
// who visits the site, and we don't depend on a third-party server at runtime.
import { Caveat, Fredoka, Nunito } from "next/font/google";

// Headings: rounded and friendly
export const headingFont = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading", // usable in CSS as var(--font-heading)
  display: "swap",            // show text right away in a fallback font while loading
});

// Body text: soft, rounded and very readable
export const bodyFont = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

// Handwriting: only for small fun notes (sticky notes, doodle labels)
export const handFont = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-hand",
  display: "swap",
});
