// Small building blocks shared by the demo pages.
//
// SECURITY: everything typed by users (ticket titles, descriptions, replies) is shown
// with normal JSX like {ticket.title}. React automatically "escapes" text, so if
// someone types <script>alert(1)</script> it shows up as plain text instead of running.
// This blocks Cross-Site Scripting (XSS). We never use dangerouslySetInnerHTML.

import { categoryLabel, STATUS_LABELS, type Faq, type Status, type Ticket } from "@/lib/demoData";

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`status status-${status}`}>{STATUS_LABELS[status]}</span>;
}

/**
 * One ticket as an expandable card. Click the top to open or close it.
 * `children` lets a page add extra controls inside (the admin view adds status + reply tools).
 */
export function TicketCard({
  ticket, showTeacher = false, children,
}: { ticket: Ticket; showTeacher?: boolean; children?: React.ReactNode }) {
  return (
    <li>
      {/* <details>/<summary> is a built-in HTML open/close widget: no JavaScript needed */}
      <details className="ticket">
        <summary>
          <div className="ticket-row">
            <h3>{ticket.title}</h3>
            <StatusBadge status={ticket.status} />
          </div>
          <div className="ticket-meta">
            <span>#{ticket.id}</span>
            <span>{categoryLabel(ticket.category)}</span>
            <span>Room {ticket.room}</span>
            {showTeacher && <span>{ticket.teacher}</span>}
            <span>{ticket.when}</span>
            {ticket.urgency === "high" && <span className="urgency-high">High urgency</span>}
            {ticket.replies.length > 0 && (
              <span>{ticket.replies.length} {ticket.replies.length === 1 ? "reply" : "replies"}</span>
            )}
          </div>
        </summary>

        <div className="ticket-body">
          <h4>Problem</h4>
          <p className="ticket-desc">{ticket.description}</p>

          <h4>Conversation</h4>
          {ticket.replies.length === 0 ? (
            <p className="hint">No replies yet.</p>
          ) : (
            <ul className="replies">
              {ticket.replies.map((r, i) => (
                <li key={i} className={`reply reply-${r.from}`}>
                  <div className="reply-head">
                    <strong>{r.author}</strong> {r.from === "it" ? "(IT)" : ""} · {r.when}
                  </div>
                  <p>{r.text}</p>
                </li>
              ))}
            </ul>
          )}

          {children}
        </div>
      </details>
    </li>
  );
}

/** One FAQ question that opens to show its steps. */
export function FaqItem({ faq, showCategory = false }: { faq: Faq; showCategory?: boolean }) {
  return (
    <li>
      <details className="faq">
        <summary>
          {faq.question}
          {showCategory && <span className="faq-cat">{categoryLabel(faq.category)}</span>}
        </summary>
        <ol>
          {faq.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </details>
    </li>
  );
}
