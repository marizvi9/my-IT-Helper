"use client";

import { useRef, useState } from "react";
import PasswordField from "@/components/PasswordField";
import SocialButtons from "@/components/SocialButtons";
import { isValidEmail } from "@/lib/validation";

// The log-in form. STEP 1 = UI ONLY: nothing is sent or saved.
//
// Note: the log-in form does NOT check password strength. Strength rules belong
// at sign-up. At log-in we only check the fields aren't empty, and the server
// decides if the password is right.

type Errors = { email?: string; password?: string };

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // don't send the form anywhere

    const found: Errors = {};
    if (!email.trim()) found.email = "Please enter your email.";
    else if (!isValidEmail(email.trim())) found.email = "That doesn't look like an email address.";
    if (!password) found.password = "Please enter your password.";
    setErrors(found);

    if (found.email || found.password) {
      setNotice(null);
      formRef.current?.querySelector<HTMLInputElement>(found.email ? "#email" : "#password")?.focus();
      return;
    }

    // SECURITY: forget the password right away.
    setPassword("");
    // SECURITY (for Step 2): when log-in is real, a failed attempt must show ONE generic
    // message like "Email or password is incorrect". Never say "no account with that email",
    // because that tells attackers which emails are registered.
    setNotice("Log in isn't connected yet. It arrives in the next step. Nothing was sent or saved.");
  }

  return (
    <>
      {notice && <div className="notice notice-info" role="status">{notice}</div>}

      <SocialButtons onClick={(provider) => setNotice(`Log in with ${provider} is coming in the next step.`)} />

      <div className="divider">or log in with email</div>

      {/* SECURITY: method="post" so the password can never end up in the URL (see SignupForm). */}
      <form ref={formRef} method="post" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" inputMode="email"
            // "username" tells password managers this is the login name to pair with the password
            autoComplete="username" autoCapitalize="none" spellCheck={false} maxLength={254} required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="error-text">{errors.email}</p>}
        </div>

        <PasswordField
          id="password" name="password" label="Password"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          labelExtra={<span className="hint" style={{ margin: 0 }}>Forgot password? (coming soon)</span>}
        />

        <button type="submit" className="btn btn-primary form-submit">Log in</button>
      </form>
    </>
  );
}
