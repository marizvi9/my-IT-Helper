import Link from "next/link";
import Logo from "@/components/Logo";
import {
  CheckCircleIcon, ClipboardIcon, KeyIcon, PaletteIcon, PencilDoodle, PlaneIcon,
  SchoolIcon, SmileIcon, StarDoodle,
} from "@/components/Icons";

// LANDING PAGE ("/"): explains the product and points people to sign up, log in, or the demo.
// This is a Server Component (the default): it has no interactivity, so it sends no JavaScript.

const STEPS = [
  { icon: SchoolIcon, tone: "yellow", title: "IT signs up the school", text: "Your IT department creates the school's account using a school email." },
  { icon: PlaneIcon, tone: "blue", title: "Teachers send tickets", text: "Teachers describe the problem in a few clicks and check the FAQ for quick fixes." },
  { icon: CheckCircleIcon, tone: "green", title: "IT tracks & solves", text: "IT sees every request in one place, sorted and ready to work on." },
];

const FEATURES = [
  { icon: SmileIcon, tone: "pink", title: "Simple for teachers", text: "No tech jargon. Pick what's wrong, add a note, and you're done." },
  { icon: ClipboardIcon, tone: "blue", title: "Organized for IT", text: "Every request is tracked from “open” to “solved”, so nothing slips through." },
  { icon: PaletteIcon, tone: "yellow", title: "Your school's colors", text: "The site uses your school's colors so it feels like part of your campus." },
  { icon: KeyIcon, tone: "green", title: "Sign in with school accounts", text: "Use Google or Microsoft school accounts, or a regular email and password." },
];

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero: the first thing visitors see ---------- */}
      <section className="hero notebook">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><SchoolIcon size={16} /> IT help desk for schools</span>
            <h1>
              Help with tech shouldn&apos;t be <span className="highlight">this hard.</span>
            </h1>
            <p className="hero-lead">
              My IT Helper gives every teacher a simple way to report a broken projector, a
              forgotten password, or a laptop that won&apos;t connect, and gives your IT team one
              organized place to track and solve every request.
            </p>

            <div className="cta-row">
              <Link href="/signup" className="btn btn-primary btn-lg">Sign up your school</Link>
              <Link href="/demo" className="btn btn-dark btn-lg">View demo</Link>
              <Link href="/login" className="btn btn-outline btn-lg">Log in</Link>
            </div>
            <p className="hand-note">psst… take the demo for a spin first!</p>
          </div>

          {/* Decorative sticky-note tickets that show what the product is about */}
          <div className="hero-art" role="img" aria-label="Two example help tickets on sticky notes">
            <div className="note note-back" aria-hidden="true">
              <div className="note-top">
                <span>Ticket #1033</span>
                <span className="status status-solved">Solved</span>
              </div>
              <p className="note-title">Science app installed</p>
              <p className="note-hand">Works great, thank you!! ★</p>
            </div>

            <div className="note note-front" aria-hidden="true">
              <span className="tape" />
              <div className="note-top">
                <span>Ticket #1042 · Room 214</span>
                <span className="status status-open">Open</span>
              </div>
              <p className="note-title">Projector won&apos;t turn on</p>
              <p className="note-text">
                &ldquo;No picture, and the power light blinks orange. I have 3rd period at 10:15.&rdquo;
              </p>
              <p className="note-from">Ms. Rivera · Science</p>
            </div>

            <PencilDoodle className="doodle doodle-pencil" size={46} />
            <StarDoodle className="doodle doodle-star" size={30} />
            <PlaneIcon className="doodle doodle-plane" size={36} />
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-title">
            <p className="kicker">it&apos;s as easy as 1, 2, 3</p>
            <h2>How it works</h2>
          </div>
          <ol className="steps">
            {STEPS.map((step, i) => (
              <li key={step.title} className="card card-hover">
                <div className="card-icon-row">
                  <span className={`icon-bubble tone-${step.tone}`}><step.icon /></span>
                  <span className="step-num">{i + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <p className="kicker">teachers & IT both win</p>
            <h2>Made for busy classrooms</h2>
          </div>
          <ul className="features">
            {FEATURES.map((f) => (
              <li key={f.title} className="card card-hover feature">
                <span className={`icon-bubble tone-${f.tone}`}><f.icon /></span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Chalkboard call-to-action ---------- */}
      <section className="section section-tight">
        <div className="container">
          <div className="chalkboard">
            <Logo variant="stacked" tone="light" height={140} className="chalkboard-logo" />
            <h2>Ready to make tech help easy?</h2>
            <p>Sign up your school, or take the demo for a spin first.</p>
            <div className="cta-row cta-center">
              <Link href="/signup" className="btn btn-primary btn-lg">Sign up your school</Link>
              <Link href="/demo" className="btn btn-chalk btn-lg">View demo</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
