import type { Metadata } from "next";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = { title: "IT admin view" };

// IT ADMIN VIEW ("/demo/admin")
export default function AdminPage() {
  return <AdminDashboard />;
}
