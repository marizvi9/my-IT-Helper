// FILLER LOGO: replace this file when the school (or product) has a real logo.
// A gold rounded tile with a tilted charcoal "help ticket" and a check mark,
// followed by the product name. Colors come from theme.css.
//
// To use an image file instead: put logo.svg in /public and return
//   <img src="/logo.svg" alt="My IT Helper" height={size} />

type LogoProps = {
  size?: number;        // height of the icon in pixels
  showText?: boolean;   // false = icon only
};

export default function Logo({ size = 36, showText = true }: LogoProps) {
  return (
    <span className="logo">
      <svg
        className="logo-mark"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        aria-hidden="true" // decorative: the text next to it says the name
        focusable="false"
      >
        {/* Gold tile */}
        <rect width="48" height="48" rx="14" fill="var(--gold)" />
        {/* Ticket, tilted a little for a friendly, hand-placed feel */}
        <g transform="rotate(-10 24 24)">
          <path
            d="M11 14H37a3.5 3.5 0 0 1 3.5 3.5V21a3 3 0 0 0 0 6V30.5A3.5 3.5 0 0 1 37 34H11a3.5 3.5 0 0 1-3.5-3.5V27a3 3 0 0 0 0-6V17.5A3.5 3.5 0 0 1 11 14Z"
            fill="var(--charcoal)"
          />
          {/* Dashed "tear here" line */}
          <line x1="16" y1="17" x2="16" y2="31" stroke="var(--gold)" strokeWidth="1.6" strokeDasharray="2 2.2" />
          {/* Check mark = "solved" */}
          <polyline
            points="21.5,24 25.5,28 33,19.5"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      {showText && (
        <span className="logo-text">
          My <span className="logo-it">IT</span> Helper
        </span>
      )}
    </span>
  );
}
