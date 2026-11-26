const frenchDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });
const fullFrenchDate = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

export function dateForDay(start: string, day: number) {
  const date = new Date(`${start}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + day - 1);
  return date;
}

export function formatDate(date: Date, full = false) {
  return (full ? fullFrenchDate : frenchDate).format(date);
}

export function moveVideo<T>(items: T[], from: number, to: number): T[] {
  const result = [...items];
  [result[from], result[to]] = [result[to], result[from]];
  return result;
}
