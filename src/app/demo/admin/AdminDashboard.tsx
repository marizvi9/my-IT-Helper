"use client";

import { useState } from "react";
import { DEMO_ADMIN, STATUS_LABELS, type Status, type Ticket } from "@/lib/demoData";
import { useDemo } from "../DemoProvider";
import { TicketCard } from "../DemoBits";

// The IT department's view of every ticket in the school.
//
// SECURITY (later): in the real product, only signed-in IT staff may open this page.
// The SERVER must check the user's role on every request (this is called "authorization").
// Hiding a link or a page in the browser does not protect anything.

type Filter = Status | "all";
const REPLY_MAX = 1000;

export default function AdminDashboard() {
  const { tickets } = useDemo();
  const [filter, setFilter] = useState<Filter>("all");

  const count = (s: Status) => tickets.filter((t) => t.status === s).length;
  const urgentOpen = tickets.filter((t) => t.urgency === "high" && t.status !== "solved").length;

  const shown = filter === "all" ? tickets : tickets.filter((t) => t.status === filter);
  // Urgent, unsolved tickets go to the top; otherwise newest (highest number) first.
  const sorted = [...shown].sort((a, b) => {
    const aUrgent = a.urgency === "high" && a.status !== "solved" ? 1 : 0;
    const bUrgent = b.urgency === "high" && b.status !== "solved" ? 1 : 0;
    return bUrgent - aUrgent || b.id - a.id;
  });

  const filters: { id: Filter; label: string; n: number }[] = [
    { id: "all", label: "All", n: tickets.length },
    { id: "open", label: STATUS_LABELS.open, n: count("open") },
    { id: "in-progress", label: STATUS_LABELS["in-progress"], n: count("in-progress") },
    { id: "solved", label: STATUS_LABELS.solved, n: count("solved") },
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>IT help desk</h1>
          <p>Signed in as {DEMO_ADMIN.name} · {DEMO_ADMIN.role}</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat stat-accent"><span className="stat-num">{count("open")}</span><span className="stat-label">Open</span></div>
        <div className="stat"><span className="stat-num">{count("in-progress")}</span><span className="stat-label">In progress</span></div>
        <div className="stat"><span className="stat-num">{count("solved")}</span><span className="stat-label">Solved</span></div>
        <div className="stat"><span className="stat-num">{urgentOpen}</span><span className="stat-label">Urgent &amp; unsolved</span></div>
      </div>

      <div className="chips" role="group" aria-label="Filter tickets by status" style={{ marginBottom: 16 }}>
        {filters.map((f) => (
          <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label} ({f.n})
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <p className="empty">No tickets here.</p>
      ) : (
        <ul className="ticket-list">
          {sorted.map((t) => (
            <TicketCard key={t.id} ticket={t} showTeacher>
              <AdminActions ticket={t} />
            </TicketCard>
          ))}
        </ul>
      )}
    </>
  );
}

/** Status dropdown + reply box shown inside each ticket for IT staff. */
function AdminActions({ ticket }: { ticket: Ticket }) {
  const { setStatus, addReply } = useDemo();
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const statusId = `status-${ticket.id}`;
  const replyId = `reply-${ticket.id}`;

  function sendReply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = reply.trim();
    if (!text) {
      setError("Write a reply first.");
      return;
    }
    addReply(ticket.id, { from: "it", author: DEMO_ADMIN.name, text, when: "Just now" });
    // Replying to a brand-new ticket moves it to "In progress" automatically.
    if (ticket.status === "open") setStatus(ticket.id, "in-progress");
    setReply("");
    setError("");
  }

  return (
    <div className="admin-actions">
      <div className="field" style={{ marginBottom: 0 }}>
        <label htmlFor={statusId}>Status</label>
        <select id={statusId} value={ticket.status} onChange={(e) => setStatus(ticket.id, e.target.value as Status)}>
          {(Object.keys(STATUS_LABELS) as Status[]).map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      <form method="post" onSubmit={sendReply} noValidate className="field" style={{ marginBottom: 0 }}>
        <label htmlFor={replyId}>Reply to {ticket.teacher}</label>
        <textarea
          id={replyId} maxLength={REPLY_MAX} style={{ minHeight: 80 }}
          value={reply} onChange={(e) => setReply(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${replyId}-error` : undefined}
        />
        {error && <p id={`${replyId}-error`} className="error-text">{error}</p>}
        <button type="submit" className="btn btn-dark btn-sm" style={{ marginTop: 8 }}>Send reply</button>
      </form>
    </div>
  );
}
