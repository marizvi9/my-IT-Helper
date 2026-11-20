import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "./SignupForm";

// SIGN-UP PAGE ("/signup"): for a school's IT department.
// The page itself is a Server Component; the interactive form lives in SignupForm.tsx.

export const metadata: Metadata = { title: "Sign up your school" };

export default function SignupPage() {
  return (
    <section className="auth-page notebook">
      <div className="container">
        <div className="auth-card">
          <h1>Sign up your school</h1>
          <p className="auth-sub">
            For IT departments. Create your school&apos;s account, and your teachers get access once
            you&apos;re set up.
          </p>
          <SignupForm />
          <p className="auth-switch">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
