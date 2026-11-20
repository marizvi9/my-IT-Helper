import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import LoginForm from "./LoginForm";

// LOG-IN PAGE ("/login"): for IT admins and (later) teachers.

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <section className="auth-page notebook">
      <div className="container">
        <div className="auth-card">
          <Logo variant="stacked" height={100} className="auth-logo" />
          <h1>Welcome back</h1>
          <p className="auth-sub">Log in to My IT Helper.</p>
          <LoginForm />
          <p className="auth-switch">
            New school? <Link href="/signup">Sign up your school</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
