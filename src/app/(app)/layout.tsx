import type { ReactNode } from "react";
import { Shell } from "@/components/navigation/shell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <Shell>{children}</Shell>;
}
