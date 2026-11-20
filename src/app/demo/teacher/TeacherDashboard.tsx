"use client";

import Link from "next/link";
import { DEMO_TEACHER } from "@/lib/demoData";
import { useDemo } from "../DemoProvider";
import { TicketCard } from "../DemoBits";

export default function TeacherDashboard() {
  const { tickets } = useDemo();

  // A teacher only sees THEIR OWN tickets.
  // SECURITY (later): in the real product the SERVER must do this filtering, only
  // sending a teacher their own tickets. Hiding them in the browser isn't enough,
  // because anyone can inspect what the server sends.
  const mine = tickets.filter((t) => t.teacher === DEMO_TEACHER.name);
  const active = mine.filter((t) => t.status !== "solved");
  const solved = mine.filter((t) => t.status === "solved");

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Hi, {DEMO_TEACHER.name}</h1>
          <p>{DEMO_TEACHER.department} · Room {DEMO_TEACHER.room}</p>
        </div>
        <div className="cta-row" style={{ marginTop: 0 }}>
          <Link href="/demo/faq" className="btn btn-outline">Quick fixes (FAQ)</Link>
          <Link href="/demo/submit" className="btn btn-primary">Submit a ticket</Link>
        </div>
      </div>

      <h2>Open tickets ({active.length})</h2>
      {active.length === 0 ? (
        <p className="empty">No open tickets. Everything is working!</p>
      ) : (
        <ul className="ticket-list">
          {active.map((t) => <TicketCard key={t.id} ticket={t} />)}
        </ul>
      )}

      <h2 style={{ marginTop: 32 }}>Solved ({solved.length})</h2>
      {solved.length === 0 ? (
        <p className="empty">Nothing solved yet.</p>
      ) : (
        <ul className="ticket-list">
          {solved.map((t) => <TicketCard key={t.id} ticket={t} />)}
        </ul>
      )}
    </>
  );
}
