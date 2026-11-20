import type { Metadata } from "next";
import { DemoProvider } from "./DemoProvider";
import DemoNav from "./DemoNav";

// Wraps every page under /demo: a "this is a demo" banner, the demo tabs,
// and the DemoProvider that holds the demo's shared (in-memory) tickets.

export const metadata: Metadata = { title: { default: "Demo", template: "%s · Demo · My IT Helper" } };

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider>
      <div className="demo-banner" role="note">
        <div className="container">
          <strong>Demo mode</strong>: sample data only. Nothing you type is saved or sent, and
          refreshing the page resets the demo.
        </div>
      </div>
      <DemoNav />
      <div className="demo-page">
        <div className="container">{children}</div>
      </div>
    </DemoProvider>
  );
}
