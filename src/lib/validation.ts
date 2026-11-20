// Simple form checks used by the sign-up and log-in pages.
//
// SECURITY: these checks run in the BROWSER, so they only make the form
// friendlier. Anyone can skip them (e.g. by sending a request directly).
// When real sign-up is built (Step 2), the SERVER must run the same checks again.

// Password length limits.
// Modern guidance (NIST SP 800-63B) says LENGTH matters most. A long passphrase like
// "purple-tiger-library-42" beats a short "P@ssw0rd!". We require at least 12 characters
// and cap at 128 so nobody can send a giant string to slow down the server later.
export const PASSWORD_MIN = 12;
export const PASSWORD_MAX = 128;

/** Returns true if the text looks like an email address (something@something.something). */
export function isValidEmail(email: string): boolean {
  // Deliberately simple: no spaces, one "@", and a dot in the domain part.
  // The only real proof an email works is sending a verification email (Step 2).
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.length <= 254 && pattern.test(email);
}

/** One line in the password checklist shown under the field. */
export type PasswordRule = { label: string; met: boolean };

/** Checks a password and returns the checklist plus an overall strength rating. */
export function checkPassword(password: string, email = "") {
  const emailName = email.split("@")[0].toLowerCase();

  const rules: PasswordRule[] = [
    { label: `At least ${PASSWORD_MIN} characters`, met: password.length >= PASSWORD_MIN },
    { label: "Mix of upper and lower case letters", met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: "Includes a number or symbol", met: /[^A-Za-z]/.test(password) },
    {
      // Passwords containing your own email name are easy to guess.
      label: "Doesn't contain your email name",
      met: password.length > 0 && !(emailName.length >= 3 && password.toLowerCase().includes(emailName)),
    },
  ];

  // Score = how many rules are met, with a bonus for extra length.
  let score = rules.filter((r) => r.met).length;
  if (password.length >= 16) score += 1;

  let strength: "weak" | "okay" | "strong" = "weak";
  if (password.length >= PASSWORD_MIN && score >= 5) strength = "strong";
  else if (password.length >= PASSWORD_MIN && score >= 3) strength = "okay";

  return { rules, strength, score };
}

/** The error message for a password on the SIGN-UP form, or "" if it's acceptable. */
export function passwordError(password: string, email = ""): string {
  if (!password) return "Please create a password.";
  if (password.length < PASSWORD_MIN) return `Password must be at least ${PASSWORD_MIN} characters.`;
  if (password.length > PASSWORD_MAX) return `Password must be ${PASSWORD_MAX} characters or fewer.`;
  const emailRule = checkPassword(password, email).rules[3];
  if (!emailRule.met) return "Password shouldn't contain your email name.";
  return "";
}
