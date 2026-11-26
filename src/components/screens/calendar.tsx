"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, CalendarDays, FileText, Sparkles } from "lucide-react";
import { NextLink, PageIntro, PillarBadge } from "@/components/ui/shared";
import { dateForDay, formatDate, moveVideo } from "@/lib/acv/calendar";
import { formats } from "@/lib/acv/rules";
import { makeDemoScript } from "@/lib/demo/data";
import { updatePlan, useDemoPlan } from "@/lib/demo/store";

export function Calendar() {
  const { ideas, start } = useDemoPlan();
  const [swapFrom, setSwapFrom] = useState<number | null>(null);
  const [swapTo, setSwapTo] = useState("");
  const [confirmScripts, setConfirmScripts] = useState(false);
  const [notice, setNotice] = useState("");
  const missing = ideas.filter(({ script }) => !script).length;

  return (
    <>
      <PageIntro title="Mon calendrier" description="Programme tes 30 vidéos et choisis dans quel ordre les filmer." />
      <section className="surface calendar-toolbar" aria-label="Paramètres du calendrier">
        <label className="field"><span>Date de départ</span><input type="date" value={start} onChange={(event) => { const date = event.target.value; if (date && event.target.validity.valid) updatePlan((plan) => ({ ...plan, start: date, calendarOpened: true })); }} min="1900-01-01" max="9999-11-30" /></label>
        <div className="calendar-period"><CalendarDays size={21} /><div><strong>{formatDate(dateForDay(start, 1))} au {formatDate(dateForDay(start, 30))}</strong><span>30 jours consécutifs</span></div></div>
        <button type="button" className="button secondary" disabled={missing === 0 || confirmScripts} onClick={() => setConfirmScripts(true)}><Sparkles size={16} />Générer les scripts manquants</button>
        <NextLink href="/export">Exporter mon plan</NextLink>
      </section>
      {confirmScripts && <div className="tip-panel calendar-notice"><Sparkles size={20} /><div><h2>Générer {missing} {missing === 1 ? "script" : "scripts"} ?</h2><p>Ces scripts de démonstration sont créés ici, sans coût. Les scripts existants sont conservés.</p><div className="action-row"><button type="button" className="button secondary" onClick={() => setConfirmScripts(false)}>Annuler</button><button className="button primary" type="button" onClick={() => {
        updatePlan((plan) => ({ ...plan, calendarOpened: true, ideas: plan.ideas.map((idea) => idea.script ? idea : { ...idea, script: makeDemoScript(idea) }) }));
        setConfirmScripts(false);
        setNotice("Les scripts de démonstration sont prêts.");
      }}>Confirmer</button></div></div></div>}
      {swapFrom !== null && <form className="surface swap-panel" onSubmit={(event) => { event.preventDefault(); if (!swapTo) return; updatePlan((plan) => ({ ...plan, calendarOpened: true, ideas: moveVideo(plan.ideas, swapFrom, Number(swapTo)) })); setNotice(`Vidéos des jours ${swapFrom + 1} et ${Number(swapTo) + 1} permutées.`); setSwapFrom(null); }}>
        <label className="field"><span>Permuter le jour {swapFrom + 1} avec</span><select required value={swapTo} onChange={(event) => setSwapTo(event.target.value)}><option value="">Choisis un jour</option>{ideas.map(({ id }, index) => index !== swapFrom && <option key={id} value={index}>Jour {index + 1} · {formatDate(dateForDay(start, index + 1))}</option>)}</select></label>
        <button className="button primary" type="submit">Permuter</button><button className="button secondary" type="button" onClick={() => setSwapFrom(null)}>Annuler</button>
      </form>}
      <div className="calendar-heading"><h2>Ton programme</h2><p role="status">{notice}</p></div>
      <ol className="calendar-grid">
        {ideas.map((idea, index) => (
          <li className="surface calendar-card" key={idea.id}>
            <div className="calendar-card-top"><span className="day-chip">J{index + 1}</span><time dateTime={dateForDay(start, index + 1).toISOString().slice(0, 10)}>{formatDate(dateForDay(start, index + 1), true)}</time></div>
            <div className="tag-row"><PillarBadge pillar={formats[idea.format].pillar} /><span>{formats[idea.format].label}</span></div>
            <h3>{idea.title}</h3>
            <div className="calendar-card-actions">
              <Link href={`/ideas?video=${idea.id}&onglet=script`}><FileText size={15} />{idea.script ? "Voir le script" : "Préparer le script"}</Link>
              <button className="icon-button" type="button" aria-label={`Déplacer la vidéo du jour ${index + 1}`} onClick={() => { setSwapTo(""); setSwapFrom(index); requestAnimationFrame(() => document.querySelector<HTMLSelectElement>(".swap-panel select")?.focus()); }}><ArrowLeftRight size={16} /></button>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
