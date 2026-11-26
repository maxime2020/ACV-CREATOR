# CAHIER DES CHARGES — MON PLAN TIKTOK ACV

**Projet :** Mon Plan TikTok ACV  
**Écosystème :** Un Max de Clients — Formation « 30 jours pour trouver des clients sur TikTok »  
**Version du document :** 1.0 — Périmètre V1  
**Date :** 26 novembre 2026  
**Destinataires :** Développement avec Codex, design, tests et intégration  
**Statut :** Cahier des charges de référence pour le lancement de la V1

> **Principe produit :** transformer le workbook de formation en un assistant web guidé. L'utilisateur présente son business, clarifie sa stratégie, obtient 30 idées de vidéos conformes à la méthode ACV, peut créer leurs scripts, organise son calendrier et exporte son plan au format PDF.

---

## 1. Vision et objectifs

### 1.1 Problème à résoudre

Le workbook PDF actuel impose plusieurs étapes manuelles : télécharger, imprimer ou annoter, remplir les exercices, rechercher des idées et composer un calendrier. Pour un entrepreneur débutant, cela représente une friction importante.

### 1.2 Solution attendue

Une application web **mobile-first**, entièrement en français, qui :

1. Pose des questions simples, sans jargon, sur l'activité et les clients de l'utilisateur.
2. Transforme les réponses en positionnement et stratégie **ATTIRER → CONVAINCRE → VENDRE (ACV)**.
3. Génère **30 idées personnalisées** selon une répartition fixe de 9 formats.
4. Permet d'approuver, modifier et remplacer les idées.
5. Génère, à la demande ou par lot, des **scripts de vidéos filmables**.
6. Place les 30 vidéos dans un calendrier modifiable sur 30 jours.
7. Enregistre la progression et permet un export PDF clair, lisible et utile.
8. Donne accès à la V1 aux acheteurs éligibles de la formation, avec vérification des droits côté serveur.

### 1.3 Promesse et limites

L'application aide à préparer et exécuter une stratégie de contenu orientée vers l'acquisition de clients. **Elle ne garantit ni viralité, ni nombre de vues, ni ventes.** Elle ne publie pas automatiquement sur TikTok en V1.

### 1.4 Indicateurs internes de qualité

- Un nouvel utilisateur peut aller du questionnaire à un calendrier complet sans assistance technique.
- Le calendrier contient toujours exactement 30 vidéos, dont 18 ATTIRER, 6 CONVAINCRE et 6 VENDRE.
- Les 9 formats et leurs quantités sont respectés.
- Les idées sont liées aux produits, services, clients et réalités commerciales déclarés.
- Un élève peut quitter puis reprendre son travail sans perte de données.
- Un export PDF reflète les dernières modifications sauvegardées.

## 2. Public et principes de conception

### 2.1 Utilisateurs prioritaires

Entrepreneurs francophones d'Afrique de l'Ouest, notamment au Bénin, au Togo, en Côte d'Ivoire, au Sénégal et au Burkina Faso. Cibles prioritaires de la formation : **petites boutiques de produits physiques/visuels et prestataires de services locaux** (coiffure, beauté, restauration, artisanat, photographie, etc.). L'application doit néanmoins pouvoir accepter d'autres métiers lorsqu'un utilisateur les saisit, sans changer la priorité pédagogique de la formation.

### 2.2 Principes UX

- Tutoiement, français clair, formulations très courtes et exemples locaux.
- **Une décision importante par écran ou par groupe de questions** ; pas de workbook de 53 pages reproduit tel quel.
- Choix préremplis et exemples modifiables, pas de cases obligatoires inutilement nombreuses.
- Indicateur de progression, boutons **Précédent**, **Continuer**, **Enregistrer**.
- Affichage agréable sur smartphone basique et connexion instable.
- L'IA **propose** ; l'utilisateur **garde le contrôle**.
- Les chiffres de performance et témoignages doivent être réels et vérifiables.

## 3. Périmètre fonctionnel de la V1

| Inclus V1 | Hors périmètre V1 / V2 |
|---|---|
| Compte et accès sécurisé | Publication et programmation automatique sur TikTok |
| Questionnaire business et diagnostic simple | Connexion aux statistiques TikTok et analyse de performance |
| Stratégie ACV personnalisée | Assistant « Jasper-like » avancé, Brand Voice approfondie |
| Génération de 30 idées selon 9 formats | Collaboration d'équipe, gestion d'agence multi-client |
| Édition, validation, régénération individuelle | Rappels WhatsApp automatiques |
| Scripts de vidéos générés à la demande et par lot | Génération ou montage de vidéos |
| Calendrier 30 jours avec date de début au choix | A/B testing publicitaire et scoring de conversion |
| Sauvegarde, reprise du parcours | Tableau de bord commercial avancé |
| Export PDF du plan et des scripts disponibles | Marketplace de modèles et bibliothèque exhaustive de 80 formats |
| Lien avec l'achat de la formation via Chariow | Paiement intégré alternatif ou abonnements complexes |

**Règle de conduite :** aucune fonction V2 ne doit retarder la V1.

## 4. Parcours utilisateur principal

### 4.1 Parcours de bout en bout

1. L'utilisateur accède à l'application depuis la formation.
2. Il se connecte et son droit d'accès est vérifié.
3. Il remplit les informations essentielles de son business.
4. Il reçoit un message commercial synthétique et une stratégie ACV qu'il peut ajuster.
5. Il lance la génération des 30 idées.
6. Il examine les propositions, modifie ou remplace les idées insatisfaisantes.
7. Il choisit une date de démarrage : l'application construit le calendrier.
8. Il ouvre une idée pour générer son script ; il peut aussi lancer la génération de tous les scripts.
9. Il exporte son calendrier seul ou le plan détaillé avec les scripts disponibles.
10. Il peut se reconnecter pour retrouver et ajuster son travail.

### 4.2 États du parcours

`non_commencé → questionnaire_en_cours → stratégie_prête → idées_générées → calendrier_prêt`

Chaque idée peut être `brouillon` ou `validée`. Un script peut être `non_généré`, `en_cours`, `prêt` ou `en_erreur`. Le suivi « publiée / non publiée » n'est pas obligatoire en V1 : il appartient au module de suivi futur.

## 5. Les six écrans obligatoires

### Écran 1 — Accueil / Tableau de bord

- Titre : « Construis ton plan TikTok de 30 jours ».
- Présentation en trois lignes de la méthode ACV.
- Progression de l'utilisateur en étapes.
- CTA principal : **Commencer ma stratégie** ou **Reprendre mon plan**.
- Après génération : résumé avec 18/6/6, date du calendrier et accès rapide à Mes 30 idées / Mon calendrier / Export.
- Si l'accès est absent : message explicatif et lien vers le parcours d'achat valide, sans révéler de données privées.

### Écran 2 — Mon business (questionnaire guidé)

**Étape A — Activité :** nom du business (facultatif si pas encore de nom), type d'activité, secteur, ville/pays ou zone desservie, produits/services principaux.

**Étape B — Clients :** clients visés, besoins/désirs fréquents, questions reçues, objections à l'achat, différenciateurs et éléments rassurants.

**Étape C — Offre :** produit/service prioritaire, avantages réels, prix ou gamme de prix (facultatif), canal de contact/commande (WhatsApp, visite, réservation, autre), éventuelle offre réelle.

**Étape D — Ressources et objectif :** compte TikTok (facultatif), niveau (débutant ou déjà actif), principal blocage, objectif de 30 jours, disponibilité pour filmer, existence ou non de témoignages, avant/après et réalisations documentées.

**Validation :** champs minimaux requis = activité, produit/service, cible, zone ou clientèle, objectif principal. L'utilisateur peut ignorer les champs non essentiels. Les réponses restent modifiables.

**Exemples contextuels :** boutique de vêtements, salon de coiffure, restaurant. Ne pas demander des informations sensibles sans utilité.

### Écran 3 — Ma stratégie ACV

Afficher une proposition de :

- Message principal : « J'aide / Nous proposons… à … pour … » adapté au business.
- Client idéal et motivations principales.
- Résumé de l'offre et des éléments de confiance réellement fournis.
- Trois cartes : **ATTIRER**, **CONVAINCRE**, **VENDRE**, avec le rôle, les formats et des axes de contenu.
- Action souhaitée : visite du profil, message WhatsApp, réservation, commande ou autre canal réellement disponible.

Boutons : **Modifier mon business**, **Modifier cette stratégie**, **Générer mes 30 idées**.

### Écran 4 — Mes 30 idées

- Compteurs visibles : 18 ATTIRER / 6 CONVAINCRE / 6 VENDRE.
- Liste ou cartes filtrables par pilier, format, numéro de jour.
- Chaque carte : titre, pilier, format, première phrase, objectif, statut.
- Actions : **Voir**, **Modifier**, **Valider**, **Proposer une autre idée**, **Générer le script**.
- En ouvrant une carte : détails du contenu à expliquer/montrer, éléments à filmer, CTA et script s'il existe.
- Régénération individuelle : seul l'élément demandé change ; les 29 autres restent inchangés.
- Si l'utilisateur modifie manuellement un titre ou script, conserver cette version tant qu'il n'a pas explicitement choisi de la remplacer.

### Écran 5 — Mon calendrier

- Choix d'une date de départ, dates consécutives sur 30 jours dans le fuseau horaire local choisi.
- Affichage liste mobile et grille/agenda ordinateur.
- Chaque jour affiche date, format, pilier ACV, idée et accès au script.
- Possibilité de déplacer ou permuter des vidéos entre jours sans changer leurs piliers ni le nombre total.
- Modification des dates sans suppression des idées.
- Action **Générer les scripts manquants** avec confirmation explicite du coût/temps éventuel côté produit si requis.
- Bouton **Exporter mon plan**.

### Écran 6 — Export PDF

- Aperçu du contenu du PDF.
- Choix : **Calendrier seul** ou **Plan complet (stratégie + 30 vidéos + scripts déjà disponibles)**.
- Indiquer clairement si certains scripts ne sont pas encore générés ; proposer leur génération séparément avant export.
- Export en français, A4, lisible sur téléphone et imprimable.
- Nom de fichier incluant le nom du business (neutralisé pour éviter caractères problématiques).

## 6. Méthode ACV : règles métier non négociables

**ATTIRER = se faire connaître ; CONVAINCRE = créer la confiance ; VENDRE = faire passer à l'action.**

| Pilier | Format officiel | Quantité |
|---|---|---:|
| ATTIRER | Conseils | 6 |
| ATTIRER | Astuces | 6 |
| ATTIRER | Questions / Réponses | 6 |
| CONVAINCRE | Avant / Après | 2 |
| CONVAINCRE | Témoignages / Résultats | 2 |
| CONVAINCRE | Coulisses / Process | 2 |
| VENDRE | Présentation produit / service | 2 |
| VENDRE | Offre / Promotion | 2 |
| VENDRE | Problème / Solution | 2 |
| **TOTAL** | **9 formats** | **30** |

### 6.1 Structures pédagogiques utilisées dans les scripts

- **Conseils :** situation/problème → conseils → explication → action.
- **Astuces :** situation → petite technique → démonstration → résultat attendu.
- **Questions/Réponses :** question réelle ou plausible → réponse directe → précision → action.
- **Avant/Après :** résultat ou image forte → point de départ → étapes → état final.
- **Témoignages/Résultats :** avis ou preuve authentique → contexte → illustration → invitation éventuelle.
- **Coulisses/Process :** préparation → étapes de travail → résultat final.
- **Présentation :** produit/service → caractéristiques/avantages → clientèle concernée → commande/réservation.
- **Offre/Promotion :** offre réelle → avantage → conditions réelles → action.
- **Problème/Solution :** situation réelle → besoin → proposition adaptée → offre → action.

### 6.2 Cas sans preuves commerciales

L'application doit **poser la question** de l'existence de témoignages/avant-après/résultats, et ne jamais en fabriquer. En l'absence de preuve, générer dans les emplacements concernés une idée clairement identifiée comme **démonstration**, **exemple simulé** ou **résultat concret de la méthode** (ex. : un calendrier réellement créé), sans prétendre qu'un client a obtenu des ventes. Les démonstrations doivent rester rattachées au format pédagogique correspondant sans inventer d'avis client.

### 6.3 Cas des promotions

Aucun faux stock limité, faux tarif barré, fausse urgence, résultat inventé ou remise non déclarée. Si aucune promotion réelle n'existe, proposer la présentation d'un pack, d'une offre standard ou d'un avantage vérifiable, sans présenter une fausse réduction.

### 6.4 Qualité des idées

- Sujets précis, réalisables avec un téléphone, utiles au métier concerné.
- Langage naturel et direct pour un public débutant francophone.
- Éviter les doublons sémantiques entre les 30 idées.
- Ne pas promettre que chaque vidéo produira une vente.
- Ne pas inventer prix, témoignages, bénéfices mesurés ou caractéristiques de produits.
- Les vidéos de vente proposent une action cohérente avec le canal de contact déclaré.

## 7. Calendrier éditorial par défaut

Cette séquence de 30 jours reprend le calendrier pédagogique du workbook ; la répartition par format doit rester exacte. Le moteur peut permuter des dates sans modifier les quotas.

| Jour | Format | Pilier |
|---:|---|---|
| 1 | Conseils | ATTIRER |
| 2 | Astuces | ATTIRER |
| 3 | Questions / Réponses | ATTIRER |
| 4 | Conseils | ATTIRER |
| 5 | Coulisses / Process | CONVAINCRE |
| 6 | Astuces | ATTIRER |
| 7 | Présentation produit / service | VENDRE |
| 8 | Questions / Réponses | ATTIRER |
| 9 | Conseils | ATTIRER |
| 10 | Avant / Après | CONVAINCRE |
| 11 | Astuces | ATTIRER |
| 12 | Questions / Réponses | ATTIRER |
| 13 | Offre / Promotion | VENDRE |
| 14 | Conseils | ATTIRER |
| 15 | Astuces | ATTIRER |
| 16 | Témoignages / Résultats | CONVAINCRE |
| 17 | Questions / Réponses | ATTIRER |
| 18 | Conseils | ATTIRER |
| 19 | Présentation produit / service | VENDRE |
| 20 | Astuces | ATTIRER |
| 21 | Questions / Réponses | ATTIRER |
| 22 | Coulisses / Process | CONVAINCRE |
| 23 | Conseils | ATTIRER |
| 24 | Offre / Promotion | VENDRE |
| 25 | Astuces | ATTIRER |
| 26 | Avant / Après | CONVAINCRE |
| 27 | Questions / Réponses | ATTIRER |
| 28 | Problème / Solution | VENDRE |
| 29 | Témoignages / Résultats | CONVAINCRE |
| 30 | Problème / Solution | VENDRE |

## 8. IA : génération des stratégies, idées et scripts

### 8.1 Architecture générale

Le navigateur envoie les données autorisées au **serveur applicatif**. Le serveur prépare le contexte, appelle l'API OpenAI, valide strictement la réponse structurée et enregistre les objets. **Aucune clé API n'est exposée côté navigateur.**

### 8.2 Trois opérations distinctes

**A. `generateStrategy(business)`** : produit message, cible synthétique, bénéfices réels, axes ATTIRER/CONVAINCRE/VENDRE, parcours de contact. Sortie structurée, éditable.

**B. `generateIdeas(strategy)`** : produit 30 propositions strictement conformes aux 9 quotas. Une idée = `pillar`, `format`, `title`, `opening`, `angle`, `outline`, `to_film`, `cta`, `evidence_type` et `disclosure` le cas échéant.

**C. `generateScript(idea, business, strategy)`** : produit un script court, oral et naturel (cible indicative 30–60 secondes), structuré en début / contenu / action, plus liste de plans et texte à l'écran. Génération individuelle ou par lot sur demande. La durée dépend de la vitesse réelle de parole ; l'outil doit la présenter comme indicative.

### 8.3 Schéma de sortie minimum d'une idée

```json
{
  "day": 1,
  "pillar": "ATTIRER",
  "format": "CONSEILS",
  "title": "3 erreurs qui empêchent ta boutique d'attirer des clients",
  "opening": "Tu publies sur TikTok mais personne ne te contacte ?",
  "angle": "Corriger les erreurs de contenu les plus fréquentes",
  "outline": ["...", "...", "..."],
  "to_film": ["...", "..."],
  "cta": "Abonne-toi pour plus de conseils",
  "evidence_type": "none",
  "disclosure": null
}
```

Les valeurs et formats normalisés doivent être des **énumérations définies dans le code**, pas du texte libre utilisé comme source d'autorité.

### 8.4 Validation côté serveur

Avant tout enregistrement :

1. Vérifier que la réponse correspond au schéma attendu.
2. Vérifier **30 objets uniques** avec jours de 1 à 30.
3. Vérifier exactement les neuf quotas ACV, et la cohérence pilier/format.
4. Vérifier les champs obligatoires, longueurs raisonnables, absence de doublons évidents.
5. Vérifier les protections contre les preuves et promotions inventées ; signaler à l'utilisateur les cas à revoir.
6. En cas de réponse invalide : tentative de correction ciblée avec limite configurable, puis message d'erreur sans effacer les données existantes.

L'utilisateur peut corriger le contenu, mais pas transformer silencieusement les 9 quotas en une autre méthode.

### 8.5 Consommation et coûts

- Modèle OpenAI configurable via variables serveur, sans figer un nom ou un tarif dans le code métier.
- Journaliser tokens et coût estimatif par opération, sans conserver de données sensibles inutilement.
- Mettre en cache / sauvegarder les générations validées.
- Limiter les appels concurrents, les tentatives et la régénération (valeur de lancement suggérée : 3 remplacements par idée, ajustable).
- Ne **pas** générer 30 scripts automatiquement dès le premier questionnaire ; proposer une génération à la demande ou « tous les scripts » après validation des idées.
- En cas d'échec du script d'une vidéo, garder les autres scripts intacts.

### 8.6 Protection contre les instructions malveillantes

Les données saisies par un utilisateur sont des **données métier**, pas des instructions système. Ne pas laisser une description de produit ou un avis fourni neutraliser les règles ACV, la sécurité, les quotas ou la confidentialité. Limiter la taille des champs et nettoyer les sorties affichées.

## 9. Comptes, sauvegarde et accès Chariow

### 9.1 Connexion

Authentification sécurisée via Supabase Auth (par exemple lien de connexion par email). Un utilisateur ne peut consulter que ses propres données. Le choix exact des méthodes de connexion sera fixé à l'intégration.

### 9.2 Droits d'accès

Deux modes distincts :

- **Démo interne** : données fictives, utilisée lors de la création des interfaces et des tests.
- **Production** : utilisateur identifié et droit d'accès actif associé à la formation.

### 9.3 Intégration Chariow

- Le paiement reste sur Chariow pour la V1.
- Le serveur reçoit les événements commerciaux documentés par Chariow ou effectue une vérification serveur autorisée.
- Chaque notification doit être authentifiée conformément à la documentation réelle du prestataire, traitée de manière **idempotente**, et rapprochée du bon utilisateur.
- Un état de paiement incertain **n'accorde pas** un accès payant par simple paramètre d'URL.
- Prévoir une procédure de rapprochement manuel en cas d'adresse email différente ou de notification manquante.
- Ne jamais supposer le format exact des webhooks ou signatures avant lecture de la documentation et tests en environnement adapté.

### 9.4 Reprise

Sauvegarde des formulaires et des modifications importantes ; aucune perte en cas de fermeture de l'onglet. L'utilisateur retrouve son dernier état après connexion.

## 10. Modèle de données initial

Structure logique proposée, à affiner dans les migrations Supabase :

| Table | Champs principaux | Rôle |
|---|---|---|
| `profiles` | `id`, `email`, `created_at` | Profil rattaché à l'authentification |
| `businesses` | `id`, `user_id`, `name`, `sector`, `city`, `country`, `audience`, `offer`, `answers_json` | Informations déclarées sur le business |
| `strategies` | `id`, `user_id`, `business_id`, `message`, `acv_json`, `start_date`, `status`, `version` | Stratégie et progression |
| `video_ideas` | `id`, `strategy_id`, `day`, `pillar`, `format`, `title`, `opening`, `outline_json`, `to_film_json`, `cta`, `evidence_type`, `status`, `scheduled_date` | Les 30 vidéos du calendrier |
| `video_scripts` | `id`, `video_idea_id`, `script_json`, `generation_status`, `updated_at` | Scripts générés et modifiés |
| `access_entitlements` | `id`, `user_id`, `source`, `external_order_id`, `status`, `granted_at` | Droit d'accès vérifié |
| `generation_logs` | `id`, `user_id`, `strategy_id`, `operation`, `model`, `input_tokens`, `output_tokens`, `status`, `created_at` | Audit technique et coûts |
| `processed_payment_events` | `id`, `provider_event_id`, `processed_at`, `status` | Idempotence des événements de paiement |

### Règles de base de données

- UUID comme identifiant ; dates en UTC en base ; affichage selon fuseau sélectionné.
- Index sur `user_id`, `strategy_id`, `day` et `external_order_id` selon accès.
- Contrainte unique sur `(strategy_id, day)` ; contraintes de validité pour piliers/formats/statuts.
- **Row Level Security (RLS) activée** sur toutes les tables contenant des données d'élèves.
- Accès administrateur et traitement des paiements **uniquement côté serveur** avec privilèges limités.
- Pour la V1, l'interface peut gérer **un business et un calendrier actifs par compte** ; la structure des tables permet une évolution ultérieure.
- Suppression des comptes et données : procédure d'effacement ou de désactivation à prévoir avant mise en production.

## 11. Stack et architecture de code

**Choix de référence :**

- **Développement assisté :** Codex + dépôt GitHub privé.
- **Front-end / back-end :** Next.js, TypeScript, React.
- **Design :** Tailwind CSS et composants accessibles réutilisables.
- **Données et authentification :** Supabase (PostgreSQL + Auth + RLS).
- **IA :** OpenAI API, appelée uniquement depuis le serveur.
- **PDF :** React-pdf ou une solution de rendu PDF adaptée après test d'export A4.
- **Déploiement :** Vercel, avec environnements distincts développement/production.
- **Paiement existant :** Chariow ; l'application vérifie les droits sans réimplémenter la caisse.

### Organisation suggérée

```text
src/
  app/
    (public)/
    (app)/dashboard/
    (app)/business/
    (app)/strategy/
    (app)/ideas/
    (app)/calendar/
    (app)/export/
    api/ai/
    api/payments/
  components/
    ui/
    acv/
    forms/
    calendar/
  lib/
    acv/rules.ts
    acv/calendar.ts
    ai/schemas.ts
    ai/prompts.ts
    auth/
    pdf/
    db/
  types/
supabase/migrations/
tests/
```

Le découpage final dépendra des conventions du projet Next.js. Les règles ACV doivent rester dans des modules testables indépendants du composant d'interface.

## 12. Design et accessibilité

### 12.1 Direction visuelle

S'inspirer du mockup UI validé : sidebar sombre, surface principale claire, cartes aérées, micro-accents cyan et rose. **Ne pas utiliser le logo officiel TikTok comme identité de marque propre.**

| Usage | Couleur de référence |
|---|---|
| Fond sombre / navigation | `#101116` |
| Fond principal | `#FFFFFF` |
| Cyan accent | `#25F4EE` |
| Rose accent | `#FE2C55` |
| Texte principal | `#101116` |
| Bordures / surfaces neutres | Gris clair accessibles |

### 12.2 Comportement responsive

- Mobile : cartes en une colonne, barre de navigation compacte, boutons faciles à toucher, formulaire en étapes.
- Desktop : barre latérale, zone principale large, vues tableau/calendrier confortables.
- Les pilier ACV ne doivent pas dépendre **uniquement de leur couleur** : toujours afficher le texte ATTIRER / CONVAINCRE / VENDRE.
- Contraste et tailles de police suffisants ; navigation clavier et labels sur tous les champs.
- États de chargement, erreurs compréhensibles, actions de confirmation avant une régénération destructrice.

## 13. Spécification de l'export PDF

### 13.1 Deux exports

1. **Calendrier seul :** couverture compacte + tableau des 30 jours (date, pilier, format, idée, CTA éventuel).
2. **Plan complet :** nom du business, message et cible, synthèse ACV, calendrier, puis fiches détaillées des 30 vidéos, avec scripts là où ils ont été générés.

### 13.2 Exigences

- Format A4, marges et sauts de page propres, police lisible, accents cyan/rose discrets.
- Ne pas créer de pages presque vides ni couper une fiche au milieu si évitable.
- Renseigner le vrai nom du business, ses données et **les versions actuellement sauvegardées** des idées/scripts.
- Si un script manque : afficher « Script non généré » dans le plan complet ; ne pas le créer implicitement.
- Mention « Plan de travail — résultats commerciaux non garantis » en bas du document.
- Téléchargement fonctionnel sur mobile et desktop.

## 14. Sécurité, confidentialité et fiabilité

- Clés OpenAI, Supabase privilégiées et Chariow uniquement dans les variables d'environnement serveur.
- RLS et vérifications serveur sur **chaque lecture ou écriture** de données privées.
- Validation des entrées (tailles, types, contenu), schémas de sorties IA, protections contre l'injection et le rendu HTML non sécurisé.
- Limitation des requêtes par compte et protection anti-abus des endpoints IA.
- Aucune donnée d'un utilisateur ne doit être visible dans le PDF ou le compte d'un autre.
- Politique de confidentialité et informations sur le traitement des données visibles avant le lancement public.
- Journalisation technique sans enregistrer inutilement des conversations clients ou données personnelles.
- Gestion des erreurs de réseau : un échec API ne supprime pas le calendrier déjà sauvegardé.
- Tests de sécurité et sauvegardes/possibilités de restauration avant ouverture commerciale.

## 15. Critères de recette (tests d'acceptation)

| ID | Scénario | Résultat attendu |
|---|---|---|
| ACV-01 | Générer un plan pour une boutique de vêtements | 30 idées, réparties 18/6/6 et 9 quotas exacts |
| ACV-02 | Générer un plan pour un salon de coiffure | Contenus différents, adaptés au service et aux clients déclarés |
| ACV-03 | Compte sans témoignage ni résultat | Aucun témoignage ou résultat de vente inventé ; démonstration explicitée |
| ACV-04 | Compte sans promotion | Aucune remise ou urgence fictive |
| IDEA-01 | Régénérer la vidéo du jour 4 | Seule cette vidéo change ; les autres sont identiques |
| IDEA-02 | Modifier et valider un titre | Modification conservée après déconnexion/reconnexion |
| SCRIPT-01 | Générer un script individuel | Script, liste de plans et CTA cohérents et sauvegardés |
| SCRIPT-02 | Échec de génération d'un script | Pas de suppression des idées ni des autres scripts |
| CAL-01 | Choisir une date de démarrage | 30 dates consécutives correctement calculées |
| CAL-02 | Permuter deux vidéos | Aucun doublon de jour ; quotas ACV préservés |
| PDF-01 | Export calendrier seul | 30 lignes, texte lisible, titres à jour |
| PDF-02 | Export complet avec scripts manquants | « Script non généré » affiché sans génération cachée |
| AUTH-01 | Utilisateur A tente d'accéder au plan B | Accès refusé côté serveur/base de données |
| PAY-01 | Webhook de paiement reçu deux fois | Un seul droit d'accès ; traitement idempotent |
| PAY-02 | URL modifiée pour simuler un achat | Aucun accès supplémentaire |
| UX-01 | Parcours sur smartphone | Champs, boutons et calendrier utilisables sans défilement horizontal excessif |
| UX-02 | Perte de connexion durant une génération | Message d'erreur compréhensible et données sauvegardées préservées |

**Jeux d'essai minimum :** boutique de vêtements à Cotonou, salon de coiffure à Lomé, restaurant à Abidjan, prestataire de services local, et consultant TikTok comme cas d'essai transversal. Aucun résultat client fictif présenté comme réel.

## 16. Plan de livraison par étapes

### Lot 1 — Prototype UI navigable

Six écrans, direction graphique fidèle, données d'exemple, responsive. **Aucun paiement et aucun appel IA réel.**

**Livrable :** démo navigable et capture des écrans mobile/desktop.

### Lot 2 — Authentification et données

Supabase, schéma initial, migrations, RLS, formulaire sauvegardé, stratégie éditable.

**Livrable :** un élève peut reprendre son projet après reconnexion.

### Lot 3 — Moteur ACV et génération IA

Règles métier testées, stratégies, 30 idées, validation, édition, régénérations, scripts individuels et par lot, logs de consommation.

**Livrable :** génération exploitable sur plusieurs métiers avec quotas garantis.

### Lot 4 — Calendrier et PDF

Date de départ, modification des jours, aperçu, export calendrier et export complet.

**Livrable :** PDF cohérent avec les données sauvegardées.

### Lot 5 — Accès formation et lancement

Intégration Chariow selon documentation confirmée, tests d'achat, contrôle des accès, erreurs, qualité mobile, sécurité et déploiement.

**Livrable :** V1 accessible aux élèves autorisés.

**Ordre impératif :** valider chaque lot avant d'engager le suivant.

## 17. Définition de « terminé » pour la V1

La V1 est prête lorsqu'un acheteur autorisé peut, sans intervention manuelle :

- Se connecter et remplir son questionnaire ;
- Recevoir une stratégie pertinente et éditable ;
- Générer et conserver exactement 30 idées conformes aux neuf formats ;
- Modifier et remplacer une idée, puis générer ses scripts ;
- Choisir une date de début et consulter un calendrier de 30 jours ;
- Exporter un PDF fidèle à son travail ;
- Revenir plus tard sans perdre ses données ;
- Être isolé des autres utilisateurs et protégé contre les accès non autorisés.

## 18. Décisions et validations restantes

Les éléments suivants sont des paramètres **à valider lors du développement**, et non des fonctionnalités supplémentaires à lancer :

1. Nom de domaine et identité de marque définitive.
2. Mode de connexion (lien email, mot de passe ou autre option Supabase).
3. Modalités exactes de l'accès post-achat Chariow, après vérification technique de son API.
4. Durée/longueur par défaut des scripts ; point de départ proposé : 30–60 secondes.
5. Règles de quotas IA (proposition initiale : 3 régénérations par idée) et politique de limitation par compte.
6. Si une deuxième stratégie/business peut être créé dans la V1 ; **choix par défaut : un projet actif par compte**.
7. Version validée du design graphique (le mockup constitue une référence, pas un écran fonctionnel).

Aucun de ces points ne doit être résolu en inventant une capacité non vérifiée d'un fournisseur.

---

## ANNEXE A — Instruction de démarrage pour Codex

```text
Lis entièrement PROJECT_SPEC.md avant de programmer.

Objectif de cette première itération : réaliser UNIQUEMENT le Lot 1,
soit un prototype responsive, navigable, des six écrans de Mon Plan
TikTok ACV, avec données de démonstration et la direction UI précisée.

Utilise Next.js, TypeScript et Tailwind CSS.
Organise le code avec des composants réutilisables.
Implémente les types et constantes ACV dans un module séparé.
Respecte la terminologie française et les quotas 18/6/6 et 9 formats.

N'appelle pas encore l'API OpenAI.
N'implémente pas encore les paiements ni les webhooks.
Ne crée pas de données utilisateur réelles.

Avant de coder, présente :
1. ton plan technique ;
2. les fichiers que tu vas créer ;
3. les risques et hypothèses.

Après développement, lance les vérifications disponibles
(typecheck, lint, tests pertinents, build), corrige les erreurs,
puis explique comment démarrer et tester le prototype localement.
```

## ANNEXE B — Références de travail

- Workbook pédagogique de la formation « 30 jours pour trouver des clients sur TikTok », version révisée dans la conversation.
- Document source « Formation TikTok v1.md » : décisions de méthode ACV, 9 formats, pédagogie et publics visés.
- Maquette multi-écrans « Mon Plan TikTok ACV » créée dans la conversation : **référence visuelle uniquement**.
- Évolution V2 évoquée : améliorations de copywriting inspirées de Jasper, suivi avancé et automatisations ; **exclues du présent périmètre**.
