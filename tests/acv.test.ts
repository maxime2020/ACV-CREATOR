import assert from "node:assert/strict";
import { test } from "node:test";
import { dateForDay, moveVideo } from "../src/lib/acv/calendar.ts";
import { calendarSequence, formatList, formats, pillarList, pillars } from "../src/lib/acv/rules.ts";
import { demoIdeas } from "../src/lib/demo/data.ts";

test("la démo suit les 30 jours et les neuf quotas du cahier des charges", () => {
  assert.equal(demoIdeas.length, 30);
  assert.equal(new Set(demoIdeas.map((idea) => idea.title)).size, 30);
  assert.deepEqual(demoIdeas.map((idea) => idea.id), Array.from({ length: 30 }, (_, index) => index + 1));
  assert.deepEqual(demoIdeas.map((idea) => idea.format), calendarSequence);
  assert.equal(formatList.length, 9);
  for (const format of formatList) {
    assert.equal(demoIdeas.filter((idea) => idea.format === format).length, formats[format].count);
  }
  for (const pillar of pillarList) {
    assert.equal(demoIdeas.filter((idea) => formats[idea.format].pillar === pillar).length, pillars[pillar].count);
  }
});

test("les jours consécutifs passent le changement de mois et d’année", () => {
  assert.equal(dateForDay("2026-12-30", 1).toISOString().slice(0, 10), "2026-12-30");
  assert.equal(dateForDay("2026-12-30", 30).toISOString().slice(0, 10), "2027-01-28");
  assert.equal(dateForDay("2028-02-28", 2).toISOString().slice(0, 10), "2028-02-29");
});

test("la permutation ne modifie que les deux emplacements choisis", () => {
  const moved = moveVideo(demoIdeas, 0, 29);
  assert.equal(moved[0], demoIdeas[29]);
  assert.equal(moved[29], demoIdeas[0]);
  assert.deepEqual(moved.slice(1, 29), demoIdeas.slice(1, 29));
  assert.equal(demoIdeas[0].id, 1);
});

test("les résultats sans témoignage sont présentés comme des démonstrations", () => {
  const results = demoIdeas.filter((idea) => idea.format === "TEMOIGNAGES_RESULTATS");
  assert.ok(results.every((idea) => idea.disclosure?.includes("Démonstration")));
  assert.ok(demoIdeas.every((idea) => idea.script === undefined));
});
