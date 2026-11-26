import type { Metadata } from "next";
import { Calendar } from "@/components/screens/calendar";

export const metadata: Metadata = { title: "Mon calendrier" };

export default function CalendarPage() {
  return <Calendar />;
}
