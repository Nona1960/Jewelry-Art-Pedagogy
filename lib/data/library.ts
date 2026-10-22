import { teaching, type BibEntry } from "./bibliography";
import { MANUALS } from "./manuals";

export type LibType =
  | "Учебное пособие"
  | "Учебник"
  | "Учебная программа"
  | "Методическая разработка"
  | "Практическое руководство"
  | "Оценочные материалы";

export type LibTheme =
  | "Художественное проектирование"
  | "Технологии ювелирного производства"
  | "Практика и аттестация"
  | "История ювелирного искусства"
  | "Ювелирное искусство";

export interface LibItem {
  id: string;
  n: number;
  title: string;
  author: string;
  coauthors: string;
  type: LibType;
  theme: LibTheme;
  level: string;
  yearCreated: number | null;
  /** Год обновлённой авторской редакции — заполняется при загрузке новой редакции */
  yearUpdated: number | null;
  source: string;
  /** Аннотация, содержание и файл добавляются по мере загрузки материалов */
  annotation?: string;
  contents?: string[];
  file?: string;
  /** Страница с полным текстом на сайте */
  href?: string;
}

function detectType(b: BibEntry): LibType {
  const s = `${b.title} ${b.source}`;
  if (/Фонд оценочных средств/i.test(s)) return "Оценочные материалы";
  if (/Учебник/i.test(s)) return "Учебник";
  if (/учебное пособие/i.test(s)) return "Учебное пособие";
  if (/Методическое пособие/i.test(s)) return "Методическая разработка";
  return "Учебная программа";
}

function detectTheme(b: BibEntry): LibTheme {
  const t = b.title.toLowerCase();
  if (/истори/.test(t)) return "История ювелирного искусства";
  if (/практик|аттестац/.test(t)) return "Практика и аттестация";
  if (/проектир|композиц|рисун|моделир/.test(t)) return "Художественное проектирование";
  if (/технолог|материал|мастерств|геммолог/.test(t)) return "Технологии ювелирного производства";
  return "Ювелирное искусство";
}

function detectLevel(b: BibEntry): string {
  if (/54\.02\.02/.test(b.source)) return "СПО · 54.02.02";
  if (/54\.03\.02/.test(b.source)) return "Бакалавриат · 54.03.02";
  if (/50\.03\.04/.test(b.source)) return "Бакалавриат · 50.03.04";
  if (/бакалавр/i.test(b.source)) return "Бакалавриат";
  if (/повышения квалификации/i.test(b.source)) return "Повышение квалификации";
  if (/преподавател/i.test(b.source)) return "Для преподавателей";
  return "—";
}

const manualItems: LibItem[] = MANUALS.map((m, k) => ({
  id: `manual-${m.slug}`,
  n: 1000 + k,
  title: m.subtitle ? `${m.title}. ${m.subtitle.replace(/^Учебное пособие\.\s*/, "")}` : m.title,
  author: "Дмитрий Дронов",
  coauthors: "",
  type: m.type,
  theme: m.theme as LibTheme,
  level: m.level,
  yearCreated: m.year,
  yearUpdated: null,
  source: m.editor ? `Общая редакция: ${m.editor.split(" — ")[0]}` : "",
  annotation: m.annotation.join(" "),
  href: `/biblioteka/posobiya/${m.slug}`,
}));

const programItems: LibItem[] = teaching.map((b) => ({
  id: `lib-${b.n}`,
  n: b.n,
  title: b.title,
  author: "Дмитрий Дронов",
  coauthors: b.coauthors,
  type: detectType(b),
  theme: detectTheme(b),
  level: detectLevel(b),
  yearCreated: b.year,
  yearUpdated: null,
  source: b.source,
}));

export const library: LibItem[] = [...manualItems, ...programItems];

export const LIB_TYPES: LibType[] = [
  "Учебное пособие",
  "Учебник",
  "Учебная программа",
  "Методическая разработка",
  "Практическое руководство",
  "Оценочные материалы",
];

export const LIB_THEMES: LibTheme[] = [
  "Художественное проектирование",
  "Технологии ювелирного производства",
  "Практика и аттестация",
  "История ювелирного искусства",
  "Ювелирное искусство",
];
