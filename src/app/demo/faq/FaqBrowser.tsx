"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, FAQS, type CategoryId } from "@/lib/demoData";
import { FaqItem } from "../DemoBits";

export default function FaqBrowser() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");

  // Keep FAQs that match the chosen category AND contain the search words.
  const words = search.toLowerCase().trim();
  const results = FAQS.filter((f) => {
    if (category !== "all" && f.category !== category) return false;
    if (!words) return true;
    const text = (f.question + " " + f.steps.join(" ")).toLowerCase();
    return text.includes(words);
  });

  // Only show category chips that actually have FAQs.
  const usedCategories = CATEGORIES.filter((c) => FAQS.some((f) => f.category === c.id));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Quick fixes</h1>
          <p>Common problems you can often solve in a minute, no ticket needed.</p>
        </div>
      </div>

      <div className="faq-tools">
        <div className="field" style={{ marginBottom: 0 }}>
          <label htmlFor="faq-search">Search</label>
          <input
            id="faq-search" type="search" placeholder="e.g. projector, password, wi-fi"
            maxLength={100} autoComplete="off"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="chips" role="group" aria-label="Filter by category">
          <button type="button" className="chip" aria-pressed={category === "all"} onClick={() => setCategory("all")}>
            All
          </button>
          {usedCategories.map((c) => (
            <button
              key={c.id} type="button" className="chip"
              aria-pressed={category === c.id} onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* aria-live: screen readers announce when the number of results changes */}
      <p className="hint" aria-live="polite">{results.length} {results.length === 1 ? "answer" : "answers"}</p>

      {results.length === 0 ? (
        <p className="empty">No matches. Try different words, or <Link href="/demo/submit">submit a ticket</Link>.</p>
      ) : (
        <ul className="faq-list">
          {results.map((f) => <FaqItem key={f.id} faq={f} showCategory />)}
        </ul>
      )}

      <div className="notice notice-info tip">
        Didn&apos;t find a fix? <Link href="/demo/submit">Submit a ticket</Link> and IT will help.
      </div>
    </>
  );
}
