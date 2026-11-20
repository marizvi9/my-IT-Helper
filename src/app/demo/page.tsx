import Link from "next/link";
import { DEMO_ADMIN, DEMO_TEACHER } from "@/lib/demoData";

// DEMO OVERVIEW ("/demo"): explains the two sides of the product and links to each.

export default function DemoOverviewPage() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Try My IT Helper</h1>
          <p>Explore both sides of the help desk with a pretend school and sample tickets.</p>
        </div>
      </div>

      <div className="view-cards">
        <section className="card view-card">
          <span className="eyebrow" style={{ alignSelf: "flex-start" }}>For teachers</span>
          <h2>Teacher view</h2>
          <p>You&apos;re <strong>{DEMO_TEACHER.name}</strong>, a {DEMO_TEACHER.department.toLowerCase()} teacher in Room {DEMO_TEACHER.room}.</p>
          <ul>
            <li>See your tickets and IT&apos;s replies</li>
            <li>Submit a new ticket in under a minute</li>
            <li>Check the FAQ for quick fixes first</li>
          </ul>
          <Link href="/demo/teacher" className="btn btn-primary">Open teacher view</Link>
        </section>

        <section className="card view-card">
          <span className="eyebrow" style={{ alignSelf: "flex-start" }}>For IT staff</span>
          <h2>IT admin view</h2>
          <p>You&apos;re <strong>{DEMO_ADMIN.name}</strong>, the school&apos;s {DEMO_ADMIN.role}.</p>
          <ul>
            <li>See every ticket in the school at a glance</li>
            <li>Filter by status and spot urgent problems</li>
            <li>Update a ticket&apos;s status and reply to teachers</li>
          </ul>
          <Link href="/demo/admin" className="btn btn-dark">Open admin view</Link>
        </section>
      </div>

      <div className="notice notice-info tip">
        <strong>Try this:</strong> submit a ticket as the teacher, open the admin view to reply and
        mark it solved, then go back to the teacher view to see the answer.
      </div>
    </>
  );
}
