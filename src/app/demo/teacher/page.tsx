import type { Metadata } from "next";
import TeacherDashboard from "./TeacherDashboard";

export const metadata: Metadata = { title: "Teacher view" };

// TEACHER VIEW ("/demo/teacher"). The page is a Server Component so it can set the
// <title>. The interactive part (reading the demo tickets) is TeacherDashboard.
export default function TeacherPage() {
  return <TeacherDashboard />;
}
