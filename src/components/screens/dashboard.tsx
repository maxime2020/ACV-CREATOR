"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, FileDown, Layers, Lightbulb, Sparkles, Store, Target } from "lucide-react";
import { pillarList, pillars } from "@/lib/acv/rules";
import { dateForDay, formatDate } from "@/lib/acv/calendar";
import { useDemoPlan } from "@/lib/demo/store";
import { NextLink, PillarMark } from "@/components/ui/shared";

const steps = [
  { title: "Mon business", description: "Décris ton activité et tes clients.", href: "/business", icon: Store, color: "pink" },
  { title: "Mon message", description: "Clarifie ton offre et ses avantages.", href: "/strategy#mon-message", icon: Target, color: "cyan" },
  { title: "Ma stratégie ACV", description: "Structure tes contenus avec l’ACV.", href: "/strategy", icon: Layers, color: "purple" },
  { title: "Mes 30 idées", description: "Découvre quoi publier chaque jour.", href: "/ideas", icon: Lightbulb, color: "purple" },
  { title: "Mon calendrier", description: "Organise tes vidéos sur 30 jours.", href: "/calendar", icon: CalendarDays, color: "purple" },
  { title: "Exporter", description: "Prépare ton plan au format PDF.", href: "/export", icon: FileDown, color: "pink" },
];

export function Dashboard() {
  const plan = useDemoPlan();
  const progress = plan.calendarOpened ? 5 : plan.ideasOpened ? 4 : plan.businessSaved ? 1 : 0;
  const nextHref = steps[progress].href;

  return (
    <div className="dashboard">
      <div className="welcome"><h2>Bonjour ! <span aria-hidden="true">👋</span></h2><p>Bienvenue dans ton assistant de stratégie TikTok.</p></div>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-kicker"><Sparkles size={15} /> TA STRATÉGIE DE CONTENU</p>
          <h1 id="hero-title">Construis ton plan TikTok de 30 jours <em>avec la méthode ACV.</em></h1>
          <p className="hero-description">Réponds à quelques questions, découvre 30 idées de vidéos et organise tes contenus pour attirer des clients sur TikTok.</p>
          <NextLink href={nextHref}>{progress ? "Reprendre mon plan" : "Commencer ma stratégie"}</NextLink>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <span className="hero-orbit orbit-one" /><span className="hero-orbit orbit-two" />
          <Image src="/hero-phone.webp" alt="" width={560} height={560} priority />
        </div>
        <div className="hero-pillars">
          {pillarList.map((pillar) => {
            const item = pillars[pillar];
            return <div className={`hero-pillar ${item.color}`} key={pillar}><PillarMark pillar={pillar} /><div><strong>{pillar}</strong><b>{item.count} vidéos</b><small>{item.formats}</small></div></div>;
          })}
        </div>
      </section>
      <section className="journey" aria-labelledby="journey-title">
        <div className="journey-heading">
          <div><h2 id="journey-title">Ton parcours en 6 étapes</h2><p>De ton activité à ton calendrier de publication.</p></div>
          <div className="journey-progress"><div><span>Ta progression</span><strong>{progress} / 6</strong></div><progress value={progress} max={6} aria-label="Progression du parcours" /></div>
        </div>
        <div className="journey-grid">
          {steps.map(({ title, description, href, icon: Icon, color }, index) =>
            <Link key={title} href={href} className={`journey-card ${index === progress ? "current" : ""}`}>
              <span className={`journey-icon ${color}`}><Icon size={22} strokeWidth={2} /></span>
              <span className="journey-arrow">{index < progress ? <Check size={15} /> : <ArrowRight size={15} />}</span>
              <strong>{index + 1}. {title}</strong>
              <small>{description}</small>
            </Link>,
          )}
        </div>
      </section>
      {plan.ideasOpened && (
        <section aria-label="Accès rapides" className="dashboard-summary">
          <div><strong>Ton plan de 30 vidéos</strong><p>18 Attirer · 6 Convaincre · 6 Vendre{plan.calendarOpened && ` · Départ le ${formatDate(dateForDay(plan.start, 1), true)}`}</p></div>
          <div className="action-row"><Link href="/ideas" className="button secondary">Mes idées</Link><Link href="/calendar" className="button secondary">Mon calendrier</Link><Link href="/export" className="button secondary">Export</Link></div>
        </section>
      )}
    </div>
  );
}
