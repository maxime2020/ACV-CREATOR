# Mon Plan TikTok ACV

Prototype du Lot 1 pour parcourir les six écrans avec les données fictives d’Atelier Ayo, une boutique de vêtements à Cotonou. Les actions de démonstration utilisent des exemples locaux. Les réponses enregistrées et les modifications restent dans le navigateur utilisé.

## Démarrer

Depuis la racine du dépôt, avec Node.js 22.18 ou une version plus récente.

```sh
npm ci
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) pour accéder à l’accueil. Le menu donne accès à tous les écrans. Pour tester le parcours guidé, sélectionne **Commencer ma stratégie**, termine le questionnaire, puis ouvre les idées et le calendrier. L’écran d’export permet de comparer les deux aperçus PDF de démonstration.

## Vérifier

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:ui
```

Les tests de navigation utilisent le build de production sur le port 3100 et vérifient le parcours sous Chromium, avec des fenêtres adaptées à l’ordinateur et au téléphone. Pour passer un Chromium déjà installé, définis `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` avec le chemin de l’exécutable. Pour générer les captures des six écrans aux deux formats, définis `ACV_CAPTURE_DIR` avec le chemin absolu du dossier souhaité avant `npm run test:ui`.
