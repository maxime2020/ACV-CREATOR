import type { Metadata } from "next";
import { Ideas } from "@/components/screens/ideas";

export const metadata: Metadata = { title: "Mes 30 idées" };

export default async function IdeasPage({ searchParams }: { searchParams: Promise<{ video?: string; onglet?: string }> }) {
  const { video, onglet } = await searchParams;
  const id = Number(video);
  const ideaId = Number.isInteger(id) && id >= 1 && id <= 30 ? id : undefined;

  return <Ideas key={ideaId ?? "liste"} initialIdeaId={ideaId} initialTab={onglet === "script" ? "script" : "contenu"} />;
}
