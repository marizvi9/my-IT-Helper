"use client";

import { createContext, useContext, useState } from "react";
import { SAMPLE_TICKETS, type Reply, type Status, type Ticket } from "@/lib/demoData";

// The demo's shared "memory".
//
// A React Context lets every demo page read and change the same list of tickets,
// so a ticket you submit as a teacher shows up in the admin view, and an admin's
// reply shows up in the teacher view.
//
// SECURITY / PRIVACY: this lives only in the browser's memory (React state).
// It is never sent to a server and never saved (no localStorage, no cookies).
// Refreshing the page resets the demo to the sample data.

/** What a teacher fills in. The rest (id, status, ...) is added automatically. */
export type NewTicket = Pick<Ticket, "title" | "category" | "room" | "urgency" | "description" | "teacher">;

type DemoState = {
  tickets: Ticket[];
  addTicket: (input: NewTicket) => Ticket;
  setStatus: (id: number, status: Status) => void;
  addReply: (id: number, reply: Reply) => void;
};

const DemoContext = createContext<DemoState | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(SAMPLE_TICKETS);

  function addTicket(input: NewTicket): Ticket {
    // Next ticket number = highest existing number + 1
    const id = Math.max(...tickets.map((t) => t.id)) + 1;
    const ticket: Ticket = { ...input, id, status: "open", when: "Just now", replies: [] };
    setTickets([ticket, ...tickets]); // newest first
    return ticket;
  }

  function setStatus(id: number, status: Status) {
    setTickets((all) => all.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  function addReply(id: number, reply: Reply) {
    setTickets((all) => all.map((t) => (t.id === id ? { ...t, replies: [...t.replies, reply] } : t)));
  }

  // In React 19 a context can be used directly as its own provider: <DemoContext value={...}>
  return <DemoContext value={{ tickets, addTicket, setStatus, addReply }}>{children}</DemoContext>;
}

/** Use this in any demo component to get the tickets and the functions that change them. */
export function useDemo(): DemoState {
  const state = useContext(DemoContext);
  if (!state) throw new Error("useDemo must be used inside <DemoProvider>");
  return state;
}
