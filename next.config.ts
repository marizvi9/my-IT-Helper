import type { NextConfig } from "next";

// Unlike al-zahra-library, we do NOT use `output: "export"` (static files only),
// because later steps need a real server for log in, sign up and tickets.
// Vercel runs the Next.js server for us.

const nextConfig: NextConfig = {
  // SECURITY: hides the "X-Powered-By: Next.js" header so we don't advertise
  // which framework (and possibly which version) the site runs on.
  poweredByHeader: false,

  // SECURITY: extra HTTP headers sent with every page. They tell the browser
  // to switch on built-in protections.
  headers() {
    return [
      {
        source: "/:path*", // every page on the site
        headers: [
          // Stops other websites from loading our pages inside an <iframe>,
          // which blocks "clickjacking" (tricking users into clicking hidden buttons).
          { key: "X-Frame-Options", value: "DENY" },
          // Tells the browser not to guess file types, so a file can't sneak in as a script.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // When a user clicks a link to another site, only send our domain, not the full URL.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // We don't use the camera, microphone or location, so switch them off entirely.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
