"use client"; // runs in the browser: it reacts to typing and clicking

import { useRef, useState } from "react";
import PasswordField from "@/components/PasswordField";
import SocialButtons from "@/components/SocialButtons";
import { checkPassword, isValidEmail, passwordError } from "@/lib/validation";

// The sign-up form. STEP 1 = UI ONLY:
// nothing is sent to a server and nothing is saved (no database, no cookies,
// no localStorage). Values exist only in this page's memory until you leave it.

type Fields = { schoolName: string; adminName: string; email: string; password: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { schoolName: "", adminName: "", email: "", password: "" };

/** Returns an error message for each field that has a problem. */
function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (!f.schoolName.trim()) errors.schoolName = "Please enter your school's name.";
  if (!f.adminName.trim()) errors.adminName = "Please enter your name.";
  if (!f.email.trim()) errors.email = "Please enter your school email.";
  else if (!isValidEmail(f.email.trim())) errors.email = "That doesn't look like an email address (e.g. it@yourschool.org).";
  const pw = passwordError(f.password, f.email);
  if (pw) errors.password = pw;
  return errors;
}

export default function SignupForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false); // after the first submit, re-check while typing
  const [notice, setNotice] = useState<{ kind: "info" | "success"; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Update one field (and refresh its error if the user already tried submitting).
  function update(name: keyof Fields, value: string) {
    const next = { ...fields, [name]: value };
    setFields(next);
    if (submitted) setErrors(validate(next));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Stop the browser from actually sending the form anywhere.
    e.preventDefault();
    setSubmitted(true);

    const found = validate(fields);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setNotice(null);
      // Move keyboard focus to the first field with a problem (accessibility).
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }

    // SECURITY: clear the password from memory as soon as we're done with it.
    setFields({ ...fields, password: "" });
    setSubmitted(false);
    setNotice({
      kind: "success",
      text: `Looks good, ${fields.adminName.trim()}! Real sign-up arrives in the next step. Nothing was sent or saved.`,
    });
  }

  const strength = checkPassword(fields.password, fields.email);
  const strengthWidth = fields.password ? `${Math.min(strength.score, 5) * 20}%` : "0%";

  return (
    <>
      {notice && (
        // role="status" makes screen readers announce the message
        <div className={`notice notice-${notice.kind}`} role="status">{notice.text}</div>
      )}

      <SocialButtons
        onClick={(provider) =>
          setNotice({ kind: "info", text: `Sign up with ${provider} is coming in the next step.` })
        }
      />

      <div className="divider">or sign up with email</div>

      {/*
        SECURITY: method="post" matters even though we stop the submit in JavaScript.
        If JavaScript fails to load, a form without a method falls back to GET, which puts
        every field (INCLUDING THE PASSWORD) in the URL, browser history and server logs.
        noValidate = use our own friendly messages instead of the browser's pop-ups.
      */}
      <form ref={formRef} method="post" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="schoolName">School name</label>
          <input
            id="schoolName" name="schoolName" type="text"
            autoComplete="organization" maxLength={120} required
            value={fields.schoolName}
            onChange={(e) => update("schoolName", e.target.value)}
            aria-invalid={errors.schoolName ? true : undefined}
            aria-describedby={errors.schoolName ? "schoolName-error" : undefined}
          />
          {errors.schoolName && <p id="schoolName-error" className="error-text">{errors.schoolName}</p>}
        </div>

        <div className="field">
          <label htmlFor="adminName">IT admin name</label>
          <input
            id="adminName" name="adminName" type="text"
            autoComplete="name" maxLength={100} required
            value={fields.adminName}
            onChange={(e) => update("adminName", e.target.value)}
            aria-invalid={errors.adminName ? true : undefined}
            aria-describedby={errors.adminName ? "adminName-error" : undefined}
          />
          {errors.adminName && <p id="adminName-error" className="error-text">{errors.adminName}</p>}
        </div>

        <div className="field">
          <label htmlFor="email">School email</label>
          <input
            id="email" name="email" type="email" inputMode="email"
            autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={254} required
            placeholder="it@yourschool.org"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error email-hint" : "email-hint"}
          />
          {errors.email && <p id="email-error" className="error-text">{errors.email}</p>}
          <p id="email-hint" className="hint">Use your school address, not a personal one.</p>
        </div>

        <PasswordField
          id="password" name="password" label="Password"
          autoComplete="new-password"
          value={fields.password}
          onChange={(v) => update("password", v)}
          error={errors.password}
          describedBy="password-strength"
        />

        {/* Live strength hint: helps users pick a good password while typing */}
        <div id="password-strength" className="strength" style={{ marginTop: -8, marginBottom: 16 }}>
          <div className="strength-bar" aria-hidden="true">
            <div className={`strength-fill strength-${strength.strength}`} style={{ width: strengthWidth }} />
          </div>
          <p className="hint">
            {fields.password ? <>Strength: <strong>{strength.strength}</strong>. </> : null}
            Tip: a long passphrase like &ldquo;purple-tiger-reads-42&rdquo; is strong and easy to remember.
          </p>
          <ul className="strength-list">
            {strength.rules.map((rule) => (
              <li key={rule.label} className={rule.met ? "met" : "unmet"}>
                {rule.met ? "✓" : "○"} {rule.label}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="btn btn-primary form-submit">Create school account</button>
      </form>
    </>
  );
}
