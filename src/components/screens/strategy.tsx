"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Package, Pencil, Quote, ShieldCheck, Users } from "lucide-react";
import { PageIntro, PillarMark } from "@/components/ui/shared";
import { pillarList, pillars } from "@/lib/acv/rules";
import { updatePlan, useDemoPlan } from "@/lib/demo/store";
import type { Strategy as StrategyFields } from "@/lib/demo/data";

const details = [
  { name: "audience", label: "Ton client idéal", icon: Users },
  { name: "offer", label: "Ton offre", icon: Package },
  { name: "trust", label: "Tes éléments de confiance", icon: ShieldCheck },
  { name: "action", label: "Ton appel à l’action", icon: MessageCircle },
] as const;

export function Strategy() {
  const { strategy, business } = useDemoPlan();
  const [draft, setDraft] = useState<StrategyFields | null>(null);

  return (
    <>
      <PageIntro title="Ma stratégie ACV" description="Découvre comment te faire connaître, créer la confiance et donner envie de te contacter." />
      <div className="pillar-grid" id="les-piliers">
        {pillarList.map((pillar) => (
          <article className={`strategy-pillar ${pillars[pillar].color}`} key={pillar}>
            <div><PillarMark pillar={pillar} /><div><h2>{pillar}</h2><strong>{pillars[pillar].count} vidéos</strong></div></div>
            <h3>{pillars[pillar].action}</h3>
            <p>{pillars[pillar].description}</p>
            <small>{pillars[pillar].formats}</small>
          </article>
        ))}
      </div>
      <section id="mon-message" className="surface strategy-section">
        <div className="section-title"><div><h2>Ton message principal</h2><p>Stratégie de démonstration pour Atelier Ayo</p></div><button className="button secondary" type="button" onClick={() => setDraft(draft ? null : { ...strategy })}><Pencil size={16} />{draft ? "Annuler" : "Modifier cette stratégie"}</button></div>
        {draft ? (
          <form className="strategy-form" onSubmit={(event) => { event.preventDefault(); updatePlan((plan) => ({ ...plan, strategy: draft })); setDraft(null); }}>
            <div className="field"><label htmlFor="strategy-message">Message principal</label><textarea id="strategy-message" value={draft.message} required maxLength={500} rows={3} onChange={(event) => setDraft({ ...draft, message: event.target.value })} /></div>
            <div className="strategy-details">{details.map(({ name, label }) => <div className="field" key={name}><label htmlFor={`strategy-${name}`}>{label}</label><textarea id={`strategy-${name}`} value={draft[name]} maxLength={500} rows={2} onChange={(event) => setDraft({ ...draft, [name]: event.target.value })} /></div>)}</div>
            <button className="button primary" type="submit">Enregistrer la stratégie</button>
          </form>
        ) : (
          <>
            <div className="quote-panel"><Quote size={23} /><p>{strategy.message}</p></div>
            <div className="strategy-details">{details.map(({ name, label, icon: Icon }) => <div className="strategy-detail" key={name}><Icon size={19} /><div><h3>{label}</h3><p>{strategy[name] || "À compléter"}</p></div></div>)}</div>
          </>
        )}
      </section>
      <div className="bottom-action">
        <Link href="/business" className="button secondary">Modifier mon business</Link>
        <div><Link href="/ideas" className="button primary" onClick={() => updatePlan((plan) => ({ ...plan, ideasOpened: true }))}>Générer mes 30 idées <ArrowRight size={18} /></Link><p>Parcours de démonstration pour {business.name || "ton activité"}.</p></div>
      </div>
    </>
  );
}
