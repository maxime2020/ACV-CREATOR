"use client";

import { useMemo, useSyncExternalStore } from "react";
import { demoBusiness, demoIdeas, demoStrategy } from "./data";
import type { Business, Idea, Strategy } from "./data";

type DemoPlan = {
  business: Business;
  strategy: Strategy;
  ideas: Idea[];
  start: string;
  businessSaved: boolean;
  ideasOpened: boolean;
  calendarOpened: boolean;
};

const initialPlan: DemoPlan = {
  business: demoBusiness,
  strategy: demoStrategy,
  ideas: demoIdeas,
  start: "2026-12-01",
  businessSaved: false,
  ideasOpened: false,
  calendarOpened: false,
};

const storageKey = "acv-demo-v1";
const changeEvent = "acv-demo-update";
let inMemory: string | null = null;

function snapshot() {
  if (inMemory !== null) return inMemory;
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function serverSnapshot() {
  return null;
}

function subscribe(listener: () => void) {
  window.addEventListener(changeEvent, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener("storage", listener);
  };
}

function parse(value: string | null): DemoPlan {
  if (value === null) return initialPlan;
  try {
    return { ...initialPlan, ...JSON.parse(value) };
  } catch {
    return initialPlan;
  }
}

export function updatePlan(update: (current: DemoPlan) => DemoPlan) {
  const next = JSON.stringify(update(parse(snapshot())));
  try {
    window.localStorage.setItem(storageKey, next);
    inMemory = null;
  } catch {
    inMemory = next;
  }
  window.dispatchEvent(new Event(changeEvent));
}

export function useDemoPlan() {
  const value = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return useMemo(() => parse(value), [value]);
}
