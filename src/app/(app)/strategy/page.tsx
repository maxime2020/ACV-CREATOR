import type { Metadata } from "next";
import { Strategy } from "@/components/screens/strategy";

export const metadata: Metadata = { title: "Ma stratégie ACV" };

export default function StrategyPage() {
  return <Strategy />;
}
