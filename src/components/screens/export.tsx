"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, FileText, Info } from "lucide-react";
import { PageIntro, PillarBadge } from "@/components/ui/shared";
import { dateForDay, formatDate } from "@/lib/acv/calendar";
import { formats, pillarList, pillars } from "@/lib/acv/rules";
import { useDemoPlan } from "@/lib/demo/store";

export function Export() {
  const [kind, setKind] = useState<"calendar" | "full">("calendar");
  const { business, strategy, ideas, start } = useDemoPlan();
  const available = ideas.filter(({ script }) => script).length;
  const businessName = business.name.trim() || "Mon business";

  return (
    <>
      <PageIntro title="Exporter en PDF" description="Choisis ce que tu veux retrouver dans ton document et vérifie l’aperçu." back={{ href: "/calendar", label: "Mon calendrier" }} />
      <div className="export-layout">
        <section className="surface export-options">
          <h2>Contenu du document</h2>
          <fieldset>
            <legend className="sr-only">Type de document</legend>
            <label className={`export-option ${kind === "calendar" ? "selected" : ""}`}>
              <CalendarDays size={22} /><span><strong>Calendrier seul</strong><small>Les 30 dates, les idées de vidéos, les formats et les appels à l’action.</small></span>
              <input type="radio" name="export-kind" value="calendar" checked={kind === "calendar"} onChange={() => setKind("calendar")} />
            </label>
            <label className={`export-option ${kind === "full" ? "selected" : ""}`}>
              <FileText size={22} /><span><strong>Plan complet</strong><small>Ta stratégie ACV, le calendrier et les scripts déjà disponibles.</small></span>
              <input type="radio" name="export-kind" value="full" checked={kind === "full"} onChange={() => setKind("full")} />
            </label>
          </fieldset>
          <div className="export-note"><Info size={18} /><p><strong>{available} script{available === 1 ? "" : "s"} disponible{available === 1 ? "" : "s"} sur 30.</strong>{available < 30 && <> <Link href="/calendar">Prépare les scripts manquants dans ton calendrier.</Link></>}</p></div>
          <p className="muted">Aperçu de démonstration. Le téléchargement PDF sera disponible lors du Lot 4.</p>
        </section>
        <section className="surface export-preview" aria-labelledby="preview-heading">
          <div className="section-title"><h2 id="preview-heading">Aperçu du document</h2><span className="day-chip">Format A4</span></div>
          <div className="paper">
            <header><p>{kind === "full" ? "PLAN COMPLET" : "CALENDRIER DE 30 JOURS"}</p><h3>{businessName}</h3><span>Du {formatDate(dateForDay(start, 1))} au {formatDate(dateForDay(start, 30))}</span></header>
            {kind === "full" && <section className="paper-strategy"><h4>Ma stratégie ACV</h4><p>{strategy.message}</p><p><strong>Client idéal</strong> {strategy.audience}</p><p><strong>Offre</strong> {strategy.offer}</p><p><strong>Éléments de confiance</strong> {strategy.trust}</p><p><strong>Appel à l’action</strong> {strategy.action}</p><div className="tag-row">{pillarList.map((pillar) => <span key={pillar}><PillarBadge pillar={pillar} /> {pillars[pillar].count}</span>)}</div></section>}
            <ol className="paper-ideas">{ideas.map((idea, index) => (
              <li key={idea.id}>
                <span>{formatDate(dateForDay(start, index + 1))}</span>
                <div><strong>{idea.title}</strong><small>{formats[idea.format].pillar} · {formats[idea.format].label}</small>
                {kind === "full" ? <details><summary>{idea.script ? "Voir le script" : "Script non généré"}</summary><p className="paper-script">{idea.script || idea.cta}</p></details> : <small>{idea.cta}</small>}</div>
              </li>
            ))}</ol>
            <footer>Plan de travail — résultats commerciaux non garantis</footer>
          </div>
        </section>
      </div>
    </>
  );
}
