"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ClipboardList, Film, Lightbulb, Pencil, Play, Sparkles, X } from "lucide-react";
import { NextLink, PageIntro, PillarBadge, PillarMark } from "@/components/ui/shared";
import { formatList, formats, pillarList, pillars, type Format, type Pillar } from "@/lib/acv/rules";
import { makeDemoScript, type Idea } from "@/lib/demo/data";
import { updatePlan, useDemoPlan } from "@/lib/demo/store";

function saveIdea(id: number, update: (idea: Idea) => Idea) {
  updatePlan((plan) => ({ ...plan, ideas: plan.ideas.map((item) => item.id === id ? update(item) : item) }));
}

export function Ideas({ initialIdeaId, initialTab = "contenu" }: { initialIdeaId?: number; initialTab?: "contenu" | "script" }) {
  const [pillarFilter, setPillarFilter] = useState<Pillar | "">("");
  const [formatFilter, setFormatFilter] = useState<Format | "">("");
  const [dayFilter, setDayFilter] = useState("");
  const [activeId, setActiveId] = useState(initialIdeaId);
  const router = useRouter();
  const { ideas } = useDemoPlan();
  const visibleIdeas = ideas.filter((idea, index) => {
    return (!pillarFilter || formats[idea.format].pillar === pillarFilter)
      && (!formatFilter || idea.format === formatFilter)
      && (!dayFilter || index + 1 === Number(dayFilter));
  });
  const activeIdea = ideas.find((idea) => idea.id === activeId);

  function closeIdea() {
    setActiveId(undefined);
    if (initialIdeaId !== undefined) router.replace("/ideas", { scroll: false });
  }

  return (
    <>
      <PageIntro title="Mes 30 idées" description="Retrouve tes idées de vidéos et prépare ce que tu vas filmer." />
      <div className="counter-grid">{pillarList.map((pillar) => <div className={`counter ${pillars[pillar].color}`} key={pillar}><PillarMark pillar={pillar} /><div><strong>{pillars[pillar].count} vidéos</strong><span>{pillar}</span></div></div>)}</div>
      <section className="surface ideas-surface" aria-label="Liste des idées">
        <div className="ideas-toolbar">
          <div className="filter-tabs" aria-label="Filtrer par pilier">
            <button type="button" aria-pressed={!pillarFilter} onClick={() => setPillarFilter("")}>Toutes (30)</button>
            {pillarList.map((pillar) => <button type="button" key={pillar} aria-pressed={pillarFilter === pillar} onClick={() => { setPillarFilter(pillar); setFormatFilter(""); }}>{pillar.charAt(0)}{pillar.slice(1).toLowerCase()} ({pillars[pillar].count})</button>)}
          </div>
          <div className="filter-selects">
            <div className="field"><label htmlFor="idea-filter-format">Format</label><select id="idea-filter-format" value={formatFilter} onChange={(event) => setFormatFilter(event.target.value as Format | "")}><option value="">Tous les formats</option>{formatList.filter((format) => !pillarFilter || formats[format].pillar === pillarFilter).map((format) => <option key={format} value={format}>{formats[format].label}</option>)}</select></div>
            <div className="field"><label htmlFor="idea-filter-day">Jour</label><select id="idea-filter-day" value={dayFilter} onChange={(event) => setDayFilter(event.target.value)}><option value="">Tous les jours</option>{ideas.map((_, index) => <option key={index} value={index + 1}>Jour {index + 1}</option>)}</select></div>
          </div>
        </div>
        <p className="result-count" role="status">{visibleIdeas.length} {visibleIdeas.length === 1 ? "idée" : "idées"}</p>
        {visibleIdeas.length ? <ul className="ideas-list">{visibleIdeas.map((idea) => {
          const day = ideas.findIndex(({ id }) => id === idea.id) + 1;
          return <li key={idea.id}><button className="idea-row" type="button" onClick={() => setActiveId(idea.id)}>
            <span className="day-chip">J{day}</span><div className="idea-row-main"><strong>{idea.title}</strong><span>{idea.opening}</span><small>{idea.objective}</small></div>
            <div className="idea-row-meta"><PillarBadge pillar={formats[idea.format].pillar} /><small>{formats[idea.format].label}</small><span className={`idea-status ${idea.status === "validée" ? "approved" : ""}`}>{idea.status === "validée" ? "Validée" : "Brouillon"}</span></div><ChevronRight size={18} aria-hidden="true" />
          </button></li>;
        })}</ul> : <div className="empty-state"><Lightbulb size={22} /><p>Aucune idée ne correspond à ces filtres.</p><button className="button secondary" type="button" onClick={() => { setPillarFilter(""); setFormatFilter(""); setDayFilter(""); }}>Réinitialiser les filtres</button></div>}
      </section>
      {activeIdea && <IdeaDialog key={activeIdea.id} idea={activeIdea} day={ideas.indexOf(activeIdea) + 1} onClose={closeIdea} initialTab={activeId === initialIdeaId ? initialTab : "contenu"} />}
      <div className="bottom-action align-end"><NextLink href="/calendar">Voir mon calendrier</NextLink></div>
    </>
  );
}

function IdeaDialog({ idea, day, onClose, initialTab }: { idea: Idea; day: number; onClose: () => void; initialTab: "contenu" | "script" }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [tab, setTab] = useState<"contenu" | "tournage" | "script">(initialTab);
  const [title, setTitle] = useState<string | null>(null);
  const [confirmReplace, setConfirmReplace] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog className="idea-dialog" ref={ref} onClose={onClose} aria-labelledby="idea-title">
      <div className="dialog-header"><strong>Jour {day}</strong><button className="icon-button" type="button" aria-label="Fermer l’idée" onClick={() => ref.current?.close()}><X size={21} /></button></div>
      <div className="dialog-body">
        <div className="tag-row"><PillarBadge pillar={formats[idea.format].pillar} /><span className="day-chip">{formats[idea.format].label}</span></div>
        <h2 id="idea-title">{idea.title}</h2>
        {title !== null && <form className="edit-title" onSubmit={(event) => { event.preventDefault(); if (!title.trim()) return; saveIdea(idea.id, (item) => ({ ...item, title: title.trim() })); setTitle(null); }}><label className="field"><span>Titre de la vidéo</span><input value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={160} /></label><button className="button primary" type="submit">Enregistrer le titre</button></form>}
        <div className="detail-tabs" aria-label="Détails de l’idée">
          <button aria-pressed={tab === "contenu"} type="button" onClick={() => setTab("contenu")}>Contenu</button><button aria-pressed={tab === "tournage"} type="button" onClick={() => setTab("tournage")}>Tournage</button><button aria-pressed={tab === "script"} type="button" onClick={() => setTab("script")}>Script</button>
        </div>
        {tab === "contenu" && <div className="dialog-details">
          <div><Play size={19} /><section><h3>Première phrase</h3><p>{idea.opening}</p></section></div>
          <div><ClipboardList size={19} /><section><h3>Points à aborder</h3><ul>{idea.outline.map((line) => <li key={line}>{line}</li>)}</ul>{idea.disclosure && <p className="muted">{idea.disclosure}</p>}</section></div>
          <div><Sparkles size={19} /><section><h3>Appel à l’action</h3><p>{idea.cta}</p></section></div>
        </div>}
        {tab === "tournage" && <div className="dialog-details"><div><Film size={19} /><section><h3>Éléments à filmer</h3><ul>{idea.shots.map((shot) => <li key={shot}>{shot}</li>)}</ul></section></div></div>}
        {tab === "script" && <div className="script-panel">{idea.script ? <><h3>Script de démonstration</h3><p>{idea.script}</p></> : <p>Script non généré.</p>}</div>}
        {confirmReplace && <div className="tip-panel"><div><h3>Remplacer cette idée ?</h3><p>Cette action remplace le titre, ramène l’idée en brouillon et efface son script de démonstration.</p><div className="action-row"><button type="button" className="button secondary" onClick={() => setConfirmReplace(false)}>Annuler</button><button type="button" className="button primary" onClick={() => { saveIdea(idea.id, (item) => ({ ...item, title: `À montrer en vidéo : ${item.objective.replace(/\.$/, "")}`, status: "brouillon", script: undefined })); setConfirmReplace(false); setTitle(null); setTab("contenu"); }}>Remplacer</button></div></div></div>}
        <div className="dialog-actions">
          <button type="button" className="button secondary" onClick={() => setTitle(title === null ? idea.title : null)}><Pencil size={15} />{title === null ? "Modifier" : "Annuler la modification"}</button>
          <button type="button" className="button secondary" disabled={confirmReplace} onClick={() => setConfirmReplace(true)}>Proposer une autre idée</button>
          <button type="button" className="button secondary" disabled={idea.status === "validée"} onClick={() => saveIdea(idea.id, (item) => ({ ...item, status: "validée" }))}>{idea.status === "validée" ? "Idée validée" : "Valider"}</button>
          <button type="button" className="button primary" onClick={() => { if (!idea.script) saveIdea(idea.id, (item) => ({ ...item, script: makeDemoScript(item) })); setTab("script"); }}><Sparkles size={15} />{idea.script ? "Voir le script" : "Générer le script"}</button>
        </div>
      </div>
    </dialog>
  );
}
