import raw from "./bibliography.json";

export type BibSection = "articles" | "monographs" | "teaching" | "unverified";

export interface BibEntry {
  /** Номер записи в единой библиографии */
  n: number;
  section: BibSection;
  coauthors: string;
  title: string;
  source: string;
  year: number | null;
  /** Служебная пометка редактора — на сайте не показывается */
  editorNote: string;
}

export const AUTHOR_FULL = "Дронов Дмитрий Сергеевич";

/**
 * Записи раздела IV («требуют библиографической сверки») по умолчанию
 * на сайте не публикуются. После сверки поставьте true
 * или перенесите проверенные записи в нужный раздел bibliography.json.
 */
export const SHOW_UNVERIFIED = false;

export const bibliography: BibEntry[] = raw as BibEntry[];

export const published = bibliography.filter(
  (b) => SHOW_UNVERIFIED || b.section !== "unverified",
);

export const byNumbers = (nums: number[]) =>
  nums
    .map((n) => bibliography.find((b) => b.n === n))
    .filter((b): b is BibEntry => !!b && (SHOW_UNVERIFIED || b.section !== "unverified"));

export const articles = bibliography.filter((b) => b.section === "articles");
export const monographs = bibliography.filter((b) => b.section === "monographs");
export const teaching = bibliography.filter((b) => b.section === "teaching");

/** Авторская монография «Социодинамика ювелирной культуры» */
export const MAIN_MONOGRAPH = 49;

/** Тематические подборки для раздела «Наука» */
export const HISTORY_RESEARCH = [28, 46, 6, 44];
export const BUSINESS_MATERIALS = [1, 7, 8, 10, 11, 12, 16, 20, 21, 24, 29, 30, 9];

export function authorsLine(b: BibEntry) {
  return b.coauthors ? `${AUTHOR_FULL}; ${b.coauthors}` : AUTHOR_FULL;
}

export function citation(b: BibEntry) {
  return `${authorsLine(b)}. ${b.title}. — ${b.source}.`;
}

export function groupByYear(list: BibEntry[]) {
  const map = new Map<number, BibEntry[]>();
  for (const b of list) {
    const y = b.year ?? 0;
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(b);
  }
  return [...map.entries()].sort((a, b) => a[0] - b[0]);
}
