// FILLER LOGO: replace this file when the school (or product) has a real logo.
// It draws a gold "help ticket" with a check mark on a charcoal tile, followed
// by the product name. Colors come from theme.css, so it changes with the theme.
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
        width={size}
        height={size}
        viewBox="0 0 40 40"
        aria-hidden="true" // decorative: the text next to it says the name
        focusable="false"
      >
        {/* Background tile */}
        <rect width="40" height="40" rx="9" fill="var(--charcoal)" />
        {/* Ticket shape with a half-circle notch cut into each side */}
        <path
          d="M8 10H32a4 4 0 0 1 4 4V17a3 3 0 0 0 0 6V26a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V23a3 3 0 0 0 0-6V14a4 4 0 0 1 4-4Z"
          fill="var(--gold)"
        />
        {/* Dashed "tear here" line */}
        <line x1="13" y1="13" x2="13" y2="27" stroke="var(--charcoal)" strokeWidth="1.6" strokeDasharray="2 2" />
        {/* Check mark = "solved" */}
        <polyline
          points="18,20 22.5,24.5 30,15.5"
          fill="none"
          stroke="var(--charcoal)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText && <span className="logo-text">My IT Helper</span>}
    </span>
  );
}
