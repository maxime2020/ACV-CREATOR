import { calendarSequence, formats, type Format } from "../acv/rules.ts";

export const demoBusiness = {
  name: "Atelier Ayo",
  activity: "Boutique de vêtements",
  sector: "Mode et accessoires",
  location: "Cotonou, Bénin",
  products: "Tenues en wax et accessoires",
  audience: "Les personnes à Cotonou qui cherchent une tenue pour une occasion ou le quotidien",
  needs: "Choisir une tenue facile à porter et adaptée à l’événement",
  questions: "Comment choisir la bonne taille et entretenir le wax ?",
  objections: "Hésitation sur la taille et les associations de couleurs",
  strengths: "Conseils pour composer une tenue et vérifier les mesures",
  offer: "Tenues en wax et conseils pour les assortir",
  benefits: "Des pièces faciles à associer et un accompagnement pour choisir la taille",
  price: "",
  contact: "WhatsApp",
  promotion: "",
  account: "",
  level: "Débutant",
  blocker: "Je manque d’idées de vidéos",
  goal: "Recevoir plus de demandes sur WhatsApp",
  time: "Deux heures par semaine",
  proof: "Démonstrations avec les pièces de la boutique",
};
export type Business = typeof demoBusiness;

export const demoStrategy = {
  message: "J’aide les personnes à Cotonou à trouver une tenue en wax qui leur plaît et qu’elles savent comment porter, grâce à des idées de looks simples et des conseils pour choisir la bonne taille.",
  audience: demoBusiness.audience,
  offer: demoBusiness.offer,
  trust: "Montre les tissus, les finitions et la prise de mesures en boutique.",
  action: "Écris-nous sur WhatsApp pour vérifier les modèles et tailles disponibles.",
};
export type Strategy = typeof demoStrategy;

export type Idea = {
  id: number;
  format: Format;
  title: string;
  opening: string;
  objective: string;
  outline: string[];
  shots: string[];
  cta: string;
  disclosure?: string;
  status: "brouillon" | "validée";
  script?: string;
};

const videoExamples: [string, string, string][] = [
  ["3 erreurs à éviter quand tu choisis une tenue en wax", "La prochaine fois que tu choisis du wax, vérifie ces trois détails.", "Compare les couleurs, la coupe et le confort sur des pièces différentes."],
  ["Une astuce pour assortir deux imprimés", "Tu peux mélanger deux imprimés avec cette règle toute simple.", "Choisis deux tissus qui partagent une couleur et montre l’association."],
  ["Comment choisir la bonne taille à distance ?", "Tu veux commander une tenue sans l’essayer sur place ?", "Montre les mesures utiles et compare-les à celles d’un vêtement qui va bien."],
  ["3 pièces pour commencer une garde-robe en wax", "Tu aimes le wax mais tu ne sais pas par quelle pièce commencer ?", "Présente trois pièces faciles à porter séparément."],
  ["Comment on prépare une tenue en boutique", "Suis-moi en boutique, je te montre comment on prépare un look.", "Filme le choix des pièces, leur mise en place et le dernier contrôle."],
  ["Noue ton foulard en moins d’une minute", "Si ton foulard ne tient jamais, teste ce nœud.", "Fais le nœud une fois lentement et montre le résultat face caméra."],
  ["Découvre une tenue pour les grandes occasions", "Tu cherches une idée de tenue pour ta prochaine fête ?", "Présente une tenue, sa coupe et deux façons de l’accessoiriser."],
  ["Peut-on laver du wax en machine ?", "Avant ton premier lavage, regarde cette étiquette.", "Montre comment lire les conseils d’entretien sur deux pièces."],
  ["Choisir les couleurs autour d’un imprimé", "Une seule couleur de ton tissu peut guider tout le look.", "Sors deux pièces unies qui reprennent une couleur du motif."],
  ["Transformer un look simple avec une pièce en wax", "Voici le même look avant et après l’ajout d’une pièce forte.", "Filme la même silhouette avec puis sans la pièce en wax."],
  ["Prendre ton tour de taille sans serrer", "Si tu tires trop sur le mètre, tu risques de choisir une taille trop petite.", "Place le mètre au bon endroit et montre comment respirer normalement."],
  ["Quel imprimé choisir si je n’ose pas les motifs ?", "Tu peux commencer par une touche de wax toute simple.", "Compare un motif discret et un motif vif sur deux accessoires."],
  ["Ce que comprend un ensemble de la boutique", "Avant de choisir un ensemble, regarde les pièces que tu peux porter séparément.", "Présente les pièces d’un ensemble standard et leurs usages."],
  ["3 repères pour choisir une tenue de cérémonie", "Pour une cérémonie, pense d’abord à ces trois choses.", "Montre comment adapter la coupe, les accessoires et les chaussures à l’événement."],
  ["Réutiliser une ceinture pour changer la silhouette", "La même tenue peut changer juste en déplaçant la ceinture.", "Teste deux hauteurs de ceinture devant le miroir."],
  ["Démonstration : une tenue facile à composer", "Je te montre le résultat qu’on obtient avec ces trois pièces.", "Assemble les trois pièces en direct et détaille le résultat visible."],
  ["Comment distinguer deux épaisseurs de tissu ?", "Ces tissus se ressemblent, mais ils ne tombent pas pareil.", "Montre le tissu devant la lumière et compare le tombé."],
  ["Préparer tes vêtements pour un week-end", "Tu veux voyager léger tout en changeant de look ?", "Choisis quelques pièces qui se combinent dans une petite valise."],
  ["Un accessoire en wax, trois façons de le porter", "Regarde comme ce même accessoire peut changer de rôle.", "Montre l’accessoire, sa taille et trois usages possibles."],
  ["Plier un foulard sans marquer le tissu", "Voici comment je range mes foulards pour les retrouver facilement.", "Filme le pliage puis le rangement au-dessus d’une table."],
  ["Comment connaître la longueur d’une jupe ?", "Une photo ne suffit pas toujours pour imaginer la longueur.", "Mesure la jupe à plat puis compare à un point de repère sur le corps."],
  ["Les étapes de préparation d’une commande", "Voici ce qui se passe quand on prépare une commande en boutique.", "Montre le contrôle de la taille, le pliage et la préparation du sac."],
  ["Composer un look complet autour d’un pantalon", "Tout commence avec ce pantalon. Voici comment choisir le reste.", "Compose deux looks en changeant le haut et l’accessoire."],
  ["Choisir un duo foulard et accessoire", "Tu veux offrir du wax sans te tromper sur la taille ?", "Présente deux accessoires qui peuvent être achetés ensemble."],
  ["Un cintre pour préparer ton look la veille", "Choisis ton look ce soir avec une technique qui prend une minute.", "Accroche les pièces dans l’ordre où tu comptes les porter."],
  ["La même veste pour le bureau et une sortie", "Même veste, deux ambiances. Voici ce qui change.", "Présente les deux looks avec le même cadrage pour comparer."],
  ["Comment entretenir les couleurs de ton imprimé ?", "Tu veux garder les couleurs de cette pièce plus longtemps ?", "Présente les consignes d’entretien de la pièce filmée."],
  ["Une tenue pour passer du travail à une fête", "Tu ne peux pas rentrer te changer avant la fête ?", "Montre une tenue avec deux accessoires faciles à échanger."],
  ["Démonstration : vérifier le tombé d’une tenue", "Regarde comment le tissu bouge quand on marche et qu’on s’assoit.", "Filme le tombé du vêtement en mouvement sous deux angles."],
  ["Une idée de cadeau quand tu ignores la taille", "Tu veux offrir une pièce en wax sans connaître les mesures ?", "Présente un foulard et explique comment vérifier les modèles disponibles."],
];

export const demoIdeas: Idea[] = calendarSequence.map((format, index) => {
  const [title, opening, objective] = videoExamples[index];
  const pillar = formats[format].pillar;
  return {
    id: index + 1, format, title, opening, objective,
    outline: [objective, "Explique ce qu’on peut observer et donne un conseil simple à essayer."],
    shots: ["Un plan face caméra pour l’accroche", "Un plan rapproché des pièces montrées"],
    cta: pillar === "VENDRE" ? "Écris-nous sur WhatsApp pour voir les pièces disponibles." : "Enregistre cette vidéo pour ton prochain look.",
    disclosure: format === "TEMOIGNAGES_RESULTATS" ? "Démonstration sur les pièces de la boutique" : undefined,
    status: "brouillon",
  };
});

export function makeDemoScript(idea: Idea) {
  return `${idea.opening}\n\n${idea.outline.join(" ")}\n\n${idea.cta}`;
}
