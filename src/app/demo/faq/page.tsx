import type { Metadata } from "next";
import FaqBrowser from "./FaqBrowser";

export const metadata: Metadata = { title: "FAQ" };

// FAQ ("/demo/faq"): quick fixes teachers can try before submitting a ticket.
export default function FaqPage() {
  return <FaqBrowser />;
}
