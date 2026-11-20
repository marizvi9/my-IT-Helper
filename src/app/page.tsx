import Link from "next/link";

// LANDING PAGE ("/"): explains the product and points people to sign up, log in, or the demo.
// This is a Server Component (the default): it has no interactivity, so it sends no JavaScript.

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero: the first thing visitors see ---------- */}
      <section className="hero">
        <div className="container">
          <div>
            <span className="eyebrow">IT help desk for schools</span>
            <h1>Tech trouble? Teachers ask. IT fixes it.</h1>
            <p className="hero-lead">
              My IT Helper gives every teacher a simple way to report a broken projector, a
              forgotten password, or a laptop that won&apos;t connect, and gives your IT team one
              organized place to track and solve every request.
            </p>

            <div className="cta-row">
              <Link href="/signup" className="btn btn-primary">Sign up your school</Link>
              <Link href="/login" className="btn btn-dark">Log in</Link>
              <Link href="/demo" className="btn btn-outline">View demo</Link>
            </div>
          </div>

          {/* A sample ticket, just to show what the product is about */}
          <div className="ticket-card" aria-label="Example help ticket">
            <div className="ticket-top">
              <span>Ticket #1042 · Room 214</span>
              <span className="status status-open">Open</span>
            </div>
            <p className="ticket-title">Projector won&apos;t turn on</p>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              &ldquo;The projector in my classroom shows no picture. I have 3rd period at 10:15.&rdquo;
              <br />
              <span style={{ color: "var(--gray-500)" }}>Ms. Rivera, Science</span>
            </p>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="section section-alt">
        <div className="container">
          <h2>How it works</h2>
          <ol className="steps">
            <li className="card">
              <span className="step-num">1</span>
              <h3>IT signs up the school</h3>
              <p>Your IT department creates the school&apos;s account using a school email.</p>
            </li>
            <li className="card">
              <span className="step-num">2</span>
              <h3>Teachers submit tickets</h3>
              <p>Teachers describe the problem in a few clicks and check the FAQ for quick fixes.</p>
            </li>
            <li className="card">
              <span className="step-num">3</span>
              <h3>IT tracks &amp; solves</h3>
              <p>IT sees every request in one place, sorted and ready to work on.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="section">
        <div className="container">
          <h2>Made for busy classrooms</h2>
          <ul className="features">
            <li className="card">
              <h3>Simple for teachers</h3>
              <p>No tech jargon. Pick what&apos;s wrong, add a note, and you&apos;re done.</p>
            </li>
            <li className="card">
              <h3>Organized for IT</h3>
              <p>Every request is tracked from &ldquo;open&rdquo; to &ldquo;solved&rdquo;, so nothing slips through.</p>
            </li>
            <li className="card">
              <h3>Your school&apos;s look</h3>
              <p>The site uses your school&apos;s colors so it feels like part of your campus.</p>
            </li>
            <li className="card">
              <h3>Sign in with school accounts</h3>
              <p>Use Google or Microsoft school accounts, or a regular email and password.</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
