import type { Metadata } from "next";
import { Dashboard } from "@/components/screens/dashboard";

export const metadata: Metadata = { title: "Accueil" };

export default function DashboardPage() {
  return <Dashboard />;
}
