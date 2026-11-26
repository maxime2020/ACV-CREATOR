import type { Metadata } from "next";
import { Export } from "@/components/screens/export";

export const metadata: Metadata = { title: "Exporter en PDF" };

export default function ExportPage() {
  return <Export />;
}
