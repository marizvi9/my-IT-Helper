"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  CATEGORIES, DEMO_TEACHER, FAQS, URGENCY_LABELS, categoryLabel,
  type CategoryId, type Ticket, type Urgency,
} from "@/lib/demoData";
import { useDemo } from "../DemoProvider";
import { FaqItem } from "../DemoBits";

// The ticket form a teacher fills in. In the demo, "submitting" only adds the ticket
// to the in-memory demo list. Nothing leaves the browser.

// SECURITY: length limits. Real servers must enforce limits too, so nobody can send a
// huge block of text to fill up the database or slow the site down.
const TITLE_MAX = 100;
const ROOM_MAX = 30;
const DESC_MAX = 1000;

type Fields = { category: CategoryId | ""; title: string; room: string; urgency: Urgency; description: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (!f.category) errors.category = "Please choose what kind of problem it is.";
  if (f.title.trim().length < 5) errors.title = "Please add a short summary (at least 5 characters).";
  if (!f.room.trim()) errors.room = "Please enter the room or location.";
  if (f.description.trim().length < 10) errors.description = "Please describe the problem (at least 10 characters).";
  return errors;
}

const blank: Fields = { category: "", title: "", room: DEMO_TEACHER.room, urgency: "normal", description: "" };

export default function SubmitTicket() {
  const { addTicket } = useDemo();
  const [fields, setFields] = useState<Fields>(blank);
  const [errors, setErrors] = useState<Errors>({});
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [created, setCreated] = useState<Ticket | null>(null); // the ticket just submitted
  const formRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof Fields>(name: K, value: Fields[K]) {
    const next = { ...fields, [name]: value };
    setFields(next);
    if (triedSubmit) setErrors(validate(next));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTriedSubmit(true);
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // .trim() removes accidental spaces at the start/end
    const ticket = addTicket({
      category: fields.category as CategoryId,
      title: fields.title.trim(),
      room: fields.room.trim(),
      urgency: fields.urgency,
      description: fields.description.trim(),
      teacher: DEMO_TEACHER.name,
    });
    setCreated(ticket);
    setFields(blank);
    setTriedSubmit(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- After submitting: confirmation screen ----------
  if (created) {
    return (
      <div className="panel confirm" role="status" style={{ maxWidth: 640 }}>
        <h1 style={{ fontSize: "1.6rem" }}>Ticket #{created.id} submitted ✓</h1>
        <p>
          <strong>{created.title}</strong> ({categoryLabel(created.category)}, Room {created.room})
        </p>
        <p>IT has been notified. You&apos;ll see their replies in your teacher view.</p>
        <p className="hint" style={{ marginBottom: 16 }}>
          Demo: open the IT admin view to see your ticket arrive and answer it yourself.
        </p>
        <div className="cta-row" style={{ marginTop: 0 }}>
          <Link href="/demo/teacher" className="btn btn-primary">See my tickets</Link>
          <Link href="/demo/admin" className="btn btn-dark">Open admin view</Link>
          <button type="button" className="btn btn-outline" onClick={() => setCreated(null)}>
            Submit another
          </button>
        </div>
      </div>
    );
  }

  // Quick-fix suggestions for the chosen category (helps solve simple problems without a ticket)
  const suggestions = fields.category ? FAQS.filter((f) => f.category === fields.category) : [];

  // ---------- The form ----------
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Submit a ticket</h1>
          <p>Tell IT what&apos;s wrong. It takes less than a minute.</p>
        </div>
      </div>

      <div className="submit-layout">
        {/* method="post": same safety habit as the sign-up form */}
        <form ref={formRef} method="post" onSubmit={handleSubmit} noValidate className="panel">
          <div className="field">
            <label htmlFor="category">What kind of problem is it?</label>
            <select
              id="category" name="category" value={fields.category}
              onChange={(e) => update("category", e.target.value as CategoryId | "")}
              aria-invalid={errors.category ? true : undefined}
              aria-describedby={errors.category ? "category-error" : undefined}
            >
              <option value="">Choose a category…</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            {errors.category && <p id="category-error" className="error-text">{errors.category}</p>}
          </div>

          <div className="field">
            <label htmlFor="title">Short summary</label>
            <input
              id="title" name="title" type="text" maxLength={TITLE_MAX} autoComplete="off"
              placeholder="e.g. Projector won't turn on"
              value={fields.title} onChange={(e) => update("title", e.target.value)}
              aria-invalid={errors.title ? true : undefined}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && <p id="title-error" className="error-text">{errors.title}</p>}
          </div>

          <div className="field">
            <label htmlFor="room">Room or location</label>
            <input
              id="room" name="room" type="text" maxLength={ROOM_MAX} autoComplete="off"
              value={fields.room} onChange={(e) => update("room", e.target.value)}
              aria-invalid={errors.room ? true : undefined}
              aria-describedby={errors.room ? "room-error" : undefined}
            />
            {errors.room && <p id="room-error" className="error-text">{errors.room}</p>}
          </div>

          <fieldset className="field">
            <legend>How urgent is it?</legend>
            <div className="radio-list">
              {(Object.keys(URGENCY_LABELS) as Urgency[]).map((u) => (
                <label key={u} className="radio-option">
                  <input
                    type="radio" name="urgency" value={u}
                    checked={fields.urgency === u}
                    onChange={() => update("urgency", u)}
                  />
                  {URGENCY_LABELS[u]}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="description">What&apos;s happening?</label>
            <textarea
              id="description" name="description" maxLength={DESC_MAX}
              placeholder="What did you try? Any error messages? When do you need it fixed?"
              value={fields.description} onChange={(e) => update("description", e.target.value)}
              aria-invalid={errors.description ? true : undefined}
              aria-describedby={`${errors.description ? "description-error " : ""}description-count`}
            />
            {errors.description && <p id="description-error" className="error-text">{errors.description}</p>}
            <p id="description-count" className="hint char-count">{fields.description.length} / {DESC_MAX}</p>
            {/* SECURITY habit: remind people not to share secrets in tickets */}
            <p className="hint">Never include passwords in a ticket. IT will never ask for yours.</p>
          </div>

          <button type="submit" className="btn btn-primary form-submit">Submit ticket</button>
        </form>

        <aside className="panel" aria-live="polite">
          <h2>Try a quick fix first</h2>
          {suggestions.length === 0 ? (
            <p className="hint">
              {fields.category
                ? "No quick fixes for this category. Go ahead and submit your ticket."
                : "Pick a category and we'll show common fixes that might solve it right away."}
            </p>
          ) : (
            <ul className="faq-list">
              {suggestions.map((f) => <FaqItem key={f.id} faq={f} />)}
            </ul>
          )}
          <p className="hint" style={{ marginTop: 16, marginBottom: 0 }}>
            <Link href="/demo/faq">Browse all FAQs</Link>
          </p>
        </aside>
      </div>
    </>
  );
}
