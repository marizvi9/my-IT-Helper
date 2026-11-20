import type { Metadata } from "next";
import SubmitTicket from "./SubmitTicket";

export const metadata: Metadata = { title: "Submit a ticket" };

// TICKET-SUBMIT SIMULATOR ("/demo/submit")
export default function SubmitPage() {
  return <SubmitTicket />;
}
