"use client";

import { useState } from "react";
import Link from "next/link";
import { DEMO_TEACHER } from "@/lib/demoData";
import { isVisibleInRange, rangeLabel, TEACHER_DEFAULT_RANGE, type RangeDays } from "@/lib/timeRange";
import { useDemo } from "../DemoProvider";
import { RangeSelect, TicketCard } from "../DemoBits";

export default function TeacherDashboard() {
  const { tickets } = useDemo();
  // Teachers get a longer default range than IT admins (see src/lib/timeRange.ts).
  const [range, setRange] = useState<RangeDays>(TEACHER_DEFAULT_RANGE);

  // A teacher only sees THEIR OWN tickets.
  // SECURITY (later): in the real product the SERVER must do this filtering, only
  // sending a teacher their own tickets. Hiding them in the browser isn't enough,
  // because anyone can inspect what the server sends.
  const mine = tickets.filter((t) => t.teacher === DEMO_TEACHER.name);
  const active = mine.filter((t) => t.status !== "solved");
  const allSolved = mine.filter((t) => t.status === "solved");
  const solved = allSolved.filter((t) => isVisibleInRange(t, range));
  const hidden = allSolved.length - solved.length;

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

      <div className="section-head">
        <h2>Solved ({solved.length})</h2>
        <RangeSelect id="teacher-range" value={range} onChange={setRange} />
      </div>
      {hidden > 0 && (
        <p className="hint" style={{ marginTop: 0 }}>
          {hidden} older solved {hidden === 1 ? "ticket is" : "tickets are"} hidden. Pick a longer time range to see {hidden === 1 ? "it" : "them"}.
        </p>
      )}
      {solved.length === 0 ? (
        <p className="empty">No solved tickets in the {rangeLabel(range).toLowerCase()}.</p>
      ) : (
        <ul className="ticket-list">
          {solved.map((t) => <TicketCard key={t.id} ticket={t} />)}
        </ul>
      )}
    </>
  );
}
