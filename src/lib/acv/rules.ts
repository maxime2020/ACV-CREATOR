export const pillars = {
  ATTIRER: { letter: "A", count: 18, color: "cyan", action: "Se faire connaître", description: "Donne des conseils utiles et réponds aux questions que tes clients se posent.", formats: "Conseils, astuces et questions-réponses" },
  CONVAINCRE: { letter: "C", count: 6, color: "purple", action: "Créer la confiance", description: "Montre ta façon de travailler, tes produits et ce que tu peux réellement démontrer.", formats: "Avant/après, résultats et coulisses" },
  VENDRE: { letter: "V", count: 6, color: "pink", action: "Passer à l’action", description: "Présente ton offre et explique comment commander ou te contacter.", formats: "Présentations, offres et problèmes/solutions" },
} as const;

export type Pillar = keyof typeof pillars;

export const formats = {
  CONSEILS: { label: "Conseils", pillar: "ATTIRER", count: 6 },
  ASTUCES: { label: "Astuces", pillar: "ATTIRER", count: 6 },
  QUESTIONS_REPONSES: { label: "Questions / Réponses", pillar: "ATTIRER", count: 6 },
  AVANT_APRES: { label: "Avant / Après", pillar: "CONVAINCRE", count: 2 },
  TEMOIGNAGES_RESULTATS: { label: "Témoignages / Résultats", pillar: "CONVAINCRE", count: 2 },
  COULISSES_PROCESS: { label: "Coulisses / Process", pillar: "CONVAINCRE", count: 2 },
  PRESENTATION: { label: "Présentation produit / service", pillar: "VENDRE", count: 2 },
  OFFRE_PROMOTION: { label: "Offre / Promotion", pillar: "VENDRE", count: 2 },
  PROBLEME_SOLUTION: { label: "Problème / Solution", pillar: "VENDRE", count: 2 },
} as const;

export type Format = keyof typeof formats;
export const pillarList = Object.keys(pillars) as Pillar[];
export const formatList = Object.keys(formats) as Format[];

export const calendarSequence = [
  "CONSEILS", "ASTUCES", "QUESTIONS_REPONSES", "CONSEILS", "COULISSES_PROCESS",
  "ASTUCES", "PRESENTATION", "QUESTIONS_REPONSES", "CONSEILS", "AVANT_APRES",
  "ASTUCES", "QUESTIONS_REPONSES", "OFFRE_PROMOTION", "CONSEILS", "ASTUCES",
  "TEMOIGNAGES_RESULTATS", "QUESTIONS_REPONSES", "CONSEILS", "PRESENTATION", "ASTUCES",
  "QUESTIONS_REPONSES", "COULISSES_PROCESS", "CONSEILS", "OFFRE_PROMOTION", "ASTUCES",
  "AVANT_APRES", "QUESTIONS_REPONSES", "PROBLEME_SOLUTION", "TEMOIGNAGES_RESULTATS", "PROBLEME_SOLUTION",
] as const satisfies readonly Format[];
