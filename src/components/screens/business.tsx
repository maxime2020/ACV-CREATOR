"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Lightbulb, Save } from "lucide-react";
import type { Business as BusinessFields } from "@/lib/demo/data";
import { updatePlan, useDemoPlan } from "@/lib/demo/store";
import { PageIntro } from "@/components/ui/shared";

type Field = { name: keyof BusinessFields; label: string; required?: boolean; multiline?: boolean; options?: string[] };

const sections: { title: string; description: string; tip: string; fields: Field[] }[] = [
  {
    title: "Ton activité",
    description: "Parle-nous de ton activité pour personnaliser ta stratégie.",
    tip: "Par exemple, « Je tiens une boutique de vêtements à Cotonou et je propose des tenues en wax. »",
    fields: [
      { name: "name", label: "Comment s’appelle ton business ?" },
      { name: "activity", label: "Quelle est ton activité ?", required: true },
      { name: "sector", label: "Dans quel secteur travailles-tu ?" },
      { name: "location", label: "Dans quelle zone travailles-tu ?", required: true },
      { name: "products", label: "Quels produits ou services proposes-tu ?", required: true, multiline: true },
    ],
  },
  {
    title: "Tes clients",
    description: "Décris les personnes que tu aimerais toucher avec tes vidéos.",
    tip: "Pense aux questions et aux hésitations que tu entends le plus souvent en boutique ou sur WhatsApp.",
    fields: [
      { name: "audience", label: "Qui sont tes clients ?", required: true, multiline: true },
      { name: "needs", label: "Qu’est-ce qu’ils recherchent ?", multiline: true },
      { name: "questions", label: "Quelles questions te posent-ils ?" },
      { name: "objections", label: "Qu’est-ce qui les fait hésiter ?" },
      { name: "strengths", label: "Qu’est-ce qui les rassure ou te distingue ?", multiline: true },
    ],
  },
  {
    title: "Ton offre",
    description: "Choisis ce que tu veux mettre en avant et comment te contacter.",
    tip: "Tu peux mettre en avant une offre standard, comme une prestation ou un ensemble, même sans réduction.",
    fields: [
      { name: "offer", label: "Quel produit ou service veux-tu mettre en avant ?", multiline: true },
      { name: "benefits", label: "Quels avantages concrets apporte-t-il ?", multiline: true },
      { name: "price", label: "Quel est le prix ou la gamme de prix ?" },
      { name: "contact", label: "Comment les clients peuvent-ils te contacter ?", options: ["WhatsApp", "Visite en boutique", "Réservation", "Autre"] },
      { name: "promotion", label: "As-tu une promotion en cours ?", multiline: true },
    ],
  },
  {
    title: "Ton objectif",
    description: "Pour les 30 prochains jours, choisis un objectif que tu peux suivre.",
    tip: "Si tu n’as pas encore de témoignages, tu peux montrer concrètement ton produit ou ton travail.",
    fields: [
      { name: "goal", label: "Quel est ton objectif pour les 30 prochains jours ?", required: true, multiline: true },
      { name: "account", label: "Quel est ton compte TikTok ?" },
      { name: "level", label: "Où en es-tu sur TikTok ?", options: ["Débutant", "Déjà actif"] },
      { name: "blocker", label: "Quel est ton principal blocage ?" },
      { name: "time", label: "Combien de temps peux-tu consacrer au tournage ?" },
      { name: "proof", label: "Que peux-tu montrer pour donner confiance ?", multiline: true },
    ],
  },
];

export function Business() {
  const { business } = useDemoPlan();
  return <BusinessForm initial={business} />;
}

function BusinessForm({ initial }: { initial: BusinessFields }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Partial<BusinessFields>>({});
  const [message, setMessage] = useState("");
  const sectionTitle = useRef<HTMLHeadingElement>(null);
  const router = useRouter();
  const section = sections[step];
  const values = { ...initial, ...draft };
  const lastStep = step === sections.length - 1;

  function changeStep(next: number) {
    setStep(next);
    setMessage("");
    requestAnimationFrame(() => sectionTitle.current?.focus());
  }

  function save(complete: boolean) {
    updatePlan((plan) => ({ ...plan, business: values, businessSaved: complete || plan.businessSaved }));
    setDraft({});
    setMessage("Tes réponses de démonstration sont enregistrées dans ce navigateur.");
  }

  function goNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!lastStep) {
      changeStep(step + 1);
      return;
    }
    save(true);
    router.push("/strategy");
  }

  return (
    <>
      <PageIntro title="Mon business" description="Décris ton activité, tes clients et ton objectif pour les 30 prochains jours." />
      <div className="business-layout">
        <section className="surface business-form">
          <div className="form-progress"><span>Étape {step + 1} sur {sections.length}</span><strong>{(step + 1) * 25} %</strong></div>
          <progress value={step + 1} max={sections.length} aria-label="Étape du questionnaire" />
          <h2 tabIndex={-1} ref={sectionTitle}>{section.title}</h2>
          <p className="muted">{section.description}</p>
          <form onSubmit={goNext}>
            <div className="form-fields">
              {section.fields.map(({ name, label, required, multiline, options }) => {
                const inputProps = {
                  id: name,
                  name,
                  required,
                  value: values[name],
                  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                    const { value } = event.currentTarget;
                    setDraft((previous) => ({ ...previous, [name]: value }));
                    setMessage("");
                    event.currentTarget.setCustomValidity("");
                  },
                };
                return <div className={multiline ? "field full-field" : "field"} key={name}>
                  <label htmlFor={name}>{label}{required ? <span className="required"> *</span> : <small> Facultatif</small>}</label>
                  {options ? <select {...inputProps}><option value="">Choisis une réponse</option>{options.map((option) => <option key={option}>{option}</option>)}</select> : multiline ?
                    <textarea {...inputProps} rows={3} maxLength={500} onBlur={(event) => { if (required) event.currentTarget.setCustomValidity(event.target.value && !event.target.value.trim() ? "Renseigne une réponse." : ""); }} /> :
                    <input {...inputProps} maxLength={160} onBlur={(event) => { if (required) event.currentTarget.setCustomValidity(event.target.value && !event.target.value.trim() ? "Renseigne une réponse." : ""); }} />}
                </div>;
              })}
            </div>
            <div className="form-actions">
              {step > 0 && <button type="button" className="button secondary" onClick={() => changeStep(step - 1)}><ArrowLeft size={17} />Précédent</button>}
              <button type="button" className="button secondary" onClick={() => save(false)}><Save size={16} />Enregistrer</button>
              <button type="submit" className="button primary">{lastStep ? "Voir ma stratégie" : "Continuer"}<ArrowRight size={18} /></button>
            </div>
            <p className="status-message" role="status">{message}</p>
          </form>
        </section>
        <aside className="business-aside">
          <div className="surface step-panel"><h2>Ton questionnaire</h2><ol>{sections.map(({ title }, index) => <li key={title} aria-current={index === step ? "step" : undefined}><span>{index < step ? <Check size={15} /> : index + 1}</span>{title}</li>)}</ol></div>
          <div className="tip-panel"><Lightbulb size={20} /><div><h2>Un exemple pour t’aider</h2><p>{section.tip}</p></div></div>
        </aside>
      </div>
    </>
  );
}
