import Image from "next/image";
// The real My IT Helper logo (made from the owner's design files in design/logo/).
// Each version is a transparent PNG:
//   horizontal = "My IT HELPER" in one row (header, footer)
//   stacked    = "My" over a big gold "IT", with "HELPER" below (feature spots)
// "dark" has black lettering for light backgrounds;
// "light" has white lettering for dark backgrounds (header, chalkboard).
// The gold "IT" is the same in both: #DDBB30, which matches --gold in theme.css.
//
// To change the logo later, replace the files in src/assets/logo/ (same names).
import horizontalDark from "@/assets/logo/logo-horizontal-dark.png";
import horizontalLight from "@/assets/logo/logo-horizontal-light.png";
import stackedDark from "@/assets/logo/logo-stacked-dark.png";
import stackedLight from "@/assets/logo/logo-stacked-light.png";

const FILES = {
  horizontal: { dark: horizontalDark, light: horizontalLight },
  stacked: { dark: stackedDark, light: stackedLight },
};

type LogoProps = {
  variant?: "horizontal" | "stacked";
  tone?: "dark" | "light"; // color of the lettering
  height: number;          // display height in pixels (width follows automatically)
  preload?: boolean;       // true for the header logo, so it loads first
  className?: string;
};

export default function Logo({ variant = "horizontal", tone = "dark", height, preload = false, className }: LogoProps) {
  const file = FILES[variant][tone];
  // Keep the image's shape: width = height × (original width / original height)
  const width = Math.round((height * file.width) / file.height);

  return (
    <Image
      src={file}
      alt="My IT Helper"
      width={width}
      height={height}
      preload={preload}
      className={["logo", className].filter(Boolean).join(" ")}
    />
  );
}
