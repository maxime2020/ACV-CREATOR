import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { pillars, type Pillar } from "@/lib/acv/rules";

export function PillarBadge({ pillar }: { pillar: Pillar }) {
  return <span className={`pillar-badge ${pillars[pillar].color}`}>{pillar}</span>;
}

export function PillarMark({ pillar }: { pillar: Pillar }) {
  const { letter, color } = pillars[pillar];
  return <span className={`pillar-mark ${color}`} aria-hidden="true">{letter}</span>;
}

export function PageIntro({ title, description, back, children }: {
  title: string;
  description: string;
  back?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <div className="page-intro">
      <div>
        {back && <Link href={back.href} className="breadcrumb-back"><ChevronLeft size={16} />{back.label}</Link>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}

export function NextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="button primary" href={href}>{children}<ArrowRight size={18} aria-hidden="true" /></Link>;
}
