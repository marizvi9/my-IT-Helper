"use client"; // needs the browser: it reacts to clicks (show/hide)

import { useState } from "react";

// A password input with a "Show / Hide" button.
//
// SECURITY:
// - type="password" masks what's typed, so people nearby can't read it.
// - The show button lets users check for typos (fewer lockouts) on their own screen.
// - `autoComplete` tells password managers what this field is:
//     "new-password"     → sign up: the manager offers to generate a strong password
//     "current-password" → log in:  the manager fills in the saved password
// - We never log the value or put it in a URL.

type Props = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: "new-password" | "current-password";
  error?: string;
  describedBy?: string; // id of extra help text (e.g. the strength meter)
  labelExtra?: React.ReactNode; // optional item on the right of the label (e.g. "Forgot password?")
};

export default function PasswordField({
  id, name, label, value, onChange, autoComplete, error, describedBy, labelExtra,
}: Props) {
  const [visible, setVisible] = useState(false);
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <div className="label-row">
        <label htmlFor={id}>{label}</label>
        {labelExtra}
      </div>
      <div className="password-wrap">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false} // stops the browser's spell-checker from inspecting the password
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={[error ? errorId : "", describedBy ?? ""].join(" ").trim() || undefined}
        />
        <button
          type="button" // "button" so clicking it doesn't submit the form
          className="toggle-visibility"
          onClick={() => setVisible((v) => !v)}
          aria-controls={id}
          aria-pressed={visible}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {error && <p id={errorId} className="error-text">{error}</p>}
    </div>
  );
}
