import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const screens = [
  ["/dashboard", "Construis ton plan TikTok de 30 jours", "01-accueil"],
  ["/business", "Mon business", "02-business"],
  ["/strategy", "Ma stratégie ACV", "03-strategie"],
  ["/ideas", "Mes 30 idées", "04-idees"],
  ["/calendar", "Mon calendrier", "05-calendrier"],
  ["/export", "Exporter en PDF", "06-export"],
] as const;

async function expectNoOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
}

test("les six écrans s’ouvrent depuis le menu et s’adaptent à la largeur d’écran", async ({ page, isMobile }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveURL(/\/dashboard$/);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const captureDir = process.env.ACV_CAPTURE_DIR;

  for (const [path, heading, filename] of screens) {
    if (isMobile) await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    const navLink = page.getByRole("navigation", { name: "Navigation principale" }).locator(`a[href="${path}"]`);
    await navLink.click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expectNoOverflow(page);

    if (path === "/dashboard") {
      await expect(page.locator(".hero-visual img")).toHaveJSProperty("complete", true);
      expect(await page.locator(".hero-visual img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    }

    if (captureDir) {
      const directory = join(captureDir, testInfo.project.name);
      await mkdir(directory, { recursive: true });
      await page.screenshot({ path: join(directory, `${filename}.png`), animations: "disabled", scale: "css", fullPage: path === "/dashboard" });
    }
  }

  expect(errors).toEqual([]);
});

test("le questionnaire, la stratégie et les idées restent modifiables dans la démo", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Commencer ma stratégie" }).click();
  const activity = page.getByLabel("Quelle est ton activité ?");
  await expect(activity).toHaveValue("Boutique de vêtements");
  await activity.fill("");
  await page.getByRole("button", { name: "Continuer" }).click();
  await expect(page.getByRole("heading", { name: "Ton activité" })).toBeVisible();
  await activity.fill("Boutique de vêtements");
  await page.getByLabel("Comment s’appelle ton business ?").fill("Atelier Ayo Démo");
  await page.getByRole("button", { name: "Enregistrer", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("enregistrées");
  await page.reload();
  await expect(page.getByLabel("Comment s’appelle ton business ?")).toHaveValue("Atelier Ayo Démo");

  for (let step = 0; step < 3; step += 1) {
    await page.getByRole("button", { name: "Continuer" }).click();
  }
  await page.getByRole("button", { name: "Voir ma stratégie" }).click();
  await page.getByRole("button", { name: "Modifier cette stratégie" }).click();
  await page.getByLabel("Message principal", { exact: true }).fill("Des tenues en wax faciles à porter.");
  await page.getByRole("button", { name: "Enregistrer la stratégie" }).click();
  await expect(page.getByText("Des tenues en wax faciles à porter.")).toBeVisible();

  await page.getByRole("link", { name: "Générer mes 30 idées" }).click();
  await expect(page.locator(".ideas-list > li")).toHaveCount(30);
  await page.getByRole("button", { name: "Vendre (6)" }).click();
  await expect(page.locator(".ideas-list > li")).toHaveCount(6);
  await page.getByLabel("Format", { exact: true }).selectOption("OFFRE_PROMOTION");
  await expect(page.locator(".ideas-list > li")).toHaveCount(2);
  await page.getByRole("button", { name: "Toutes (30)" }).click();
  await page.getByLabel("Format", { exact: true }).selectOption("");
  await page.getByLabel("Jour", { exact: true }).selectOption("4");

  await page.locator(".idea-row").click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { name: "3 pièces pour commencer une garde-robe en wax" })).toBeVisible();
  await dialog.getByRole("button", { name: "Modifier", exact: true }).click();
  await dialog.getByLabel("Titre de la vidéo").fill("Trois indispensables en wax");
  await dialog.getByRole("button", { name: "Enregistrer le titre" }).click();
  await dialog.getByRole("button", { name: "Valider", exact: true }).click();
  await dialog.getByRole("button", { name: "Générer le script" }).click();
  await expect(dialog.getByRole("heading", { name: "Script de démonstration" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.locator(".idea-row")).toContainText("Validée");

  await page.reload();
  await expect(page.locator(".idea-row-main strong").nth(3)).toHaveText("Trois indispensables en wax");
  const ideasBefore = await page.locator(".idea-row-main strong").allTextContents();
  await page.locator(".idea-row").nth(3).click();
  await dialog.getByRole("button", { name: "Proposer une autre idée" }).click();
  await dialog.getByRole("button", { name: "Remplacer", exact: true }).click();
  await dialog.getByRole("button", { name: "Fermer l’idée" }).click();
  const ideasAfter = await page.locator(".idea-row-main strong").allTextContents();
  expect(ideasAfter.filter((title, index) => title !== ideasBefore[index])).toHaveLength(1);
});

test("la date, la permutation et l’aperçu du plan suivent les vidéos", async ({ page }) => {
  await page.goto("/calendar");
  await page.getByLabel("Date de départ").fill("2026-12-30");
  await expect(page.locator(".calendar-card time")).toHaveCount(30);
  await expect(page.locator(".calendar-card time").last()).toHaveAttribute("datetime", "2027-01-28");
  const cards = page.locator(".calendar-card");
  await page.getByRole("button", { name: "Déplacer la vidéo du jour 1", exact: true }).click();
  await page.getByLabel("Permuter le jour 1 avec").selectOption("1");
  await page.getByRole("button", { name: "Permuter", exact: true }).click();
  await expect(cards.first().getByRole("heading")).toContainText("assortir deux imprimés");
  await expect(cards.nth(1).getByRole("heading")).toContainText("3 erreurs");

  await cards.first().getByRole("link", { name: "Préparer le script" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("Script non généré.", { exact: true })).toBeVisible();
  await dialog.getByRole("button", { name: "Générer le script" }).click();
  await expect(dialog.getByRole("heading", { name: "Script de démonstration" })).toBeVisible();

  await page.goto("/calendar");
  const bulk = page.getByRole("button", { name: "Générer les scripts manquants" });
  await bulk.click();
  await expect(page.getByRole("heading", { name: "Générer 29 scripts ?" })).toBeVisible();
  await page.getByRole("button", { name: "Annuler", exact: true }).click();
  await page.getByRole("link", { name: "Exporter mon plan" }).click();
  await expect(page.locator(".paper-ideas > li")).toHaveCount(30);
  await page.getByRole("radio", { name: "Plan complet" }).check();
  await expect(page.getByRole("heading", { name: "Ma stratégie ACV", exact: true })).toBeVisible();
  await expect(page.getByText("Script non généré", { exact: true })).toHaveCount(29);
  await expect(page.locator(".paper-ideas > li").first()).toContainText("Voir le script");
  await expectNoOverflow(page);

  await page.goto("/calendar");
  await bulk.click();
  await page.getByRole("button", { name: "Confirmer", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Les scripts de démonstration sont prêts.");
  await expect(cards.getByRole("link", { name: "Voir le script" })).toHaveCount(30);
});
