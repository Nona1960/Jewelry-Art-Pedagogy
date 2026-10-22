export const SITE = {
  name: "Педагогика ювелирного искусства",
  tagline: "Авторская методология Дмитрия Дронова",
  motto: "Научные исследования · Методология образования · Художественная практика",
  /** Адрес сайта: задаётся переменной окружения NEXT_PUBLIC_SITE_URL на Vercel (по умолчанию — адрес проекта Vercel). */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://jewelry-art-pedagogy.vercel.app").replace(/\/$/, ""),
  /** Электронная почта Дмитрия Дронова для подвала. Пока пусто — строка в подвале скрыта. */
  email: "",
  copyrightHolder: "Дмитрий Дронов",
  startYear: 2026,
};

export const NAV = [
  { href: "/", label: "Главная" },
  { href: "/avtor", label: "Автор методологии" },
  { href: "/metodologiya", label: "Методология" },
  { href: "/nauka", label: "Наука" },
  { href: "/biblioteka", label: "Библиотека" },
  { href: "/galereya", label: "Галерея" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Автор и проект",
    links: [
      { href: "/avtor", label: "Автор методологии" },
      { href: "/#koncepciya", label: "Концепция проекта" },
      { href: "/metodologiya#podhod", label: "Педагогический подход" },
    ],
  },
  {
    title: "Методология и наука",
    links: [
      { href: "/metodologiya", label: "Основные принципы" },
      { href: "/nauka#dissertaciya", label: "Диссертация" },
      { href: "/nauka#monografiya", label: "Монография" },
      { href: "/nauka#publikacii", label: "Научные публикации" },
    ],
  },
  {
    title: "Электронная библиотека",
    links: [
      { href: "/biblioteka?tip=posobiya", label: "Учебные пособия" },
      { href: "/biblioteka?tip=programmy", label: "Учебные программы" },
      { href: "/biblioteka?tip=metodicheskie", label: "Методические разработки" },
      { href: "/nauka#bibliografiya", label: "Библиография и источники" },
    ],
  },
  {
    title: "Ювелирное искусство",
    links: [
      { href: "/galereya", label: "Галерея дипломных работ" },
      { href: "/nauka#istoriya", label: "История ювелирного искусства" },
      { href: "/metodologiya#proektirovanie", label: "Проектное обучение" },
    ],
  },
];
