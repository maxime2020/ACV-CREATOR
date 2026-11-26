import type { Metadata } from "next";
import { Business } from "@/components/screens/business";

export const metadata: Metadata = { title: "Mon business" };

export default function BusinessPage() {
  return <Business />;
}
