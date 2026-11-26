import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Mon Plan TikTok ACV", template: "%s · Mon Plan TikTok ACV" },
  description: "Construis ton plan TikTok de 30 jours avec la méthode Attirer, Convaincre, Vendre.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
