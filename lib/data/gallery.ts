export interface Work {
  slug: string;
  n: number;
  title: string;
  kind: string;
  student: string;
  year: number;
  image: string;
  width: number;
  height: number;
  techniques: string[];
  stoneSetting: string[];
  materials: string[];
  supervisor: string;
  /** Краткое описание художественной концепции — добавляется по мере подготовки */
  concept?: string;
}

const SUPERVISOR = "Д. С. Дронов";

export const works: Work[] = [
  {
    slug: "tayna-letney-nochi",
    n: 1,
    title: "Тайна летней ночи",
    kind: "Колье",
    student: "Гульченко А.",
    year: 2020,
    image: "/images/works/work-01.jpg",
    width: 1372,
    height: 1266,
    techniques: ["выпиловка", "филигрань", "фактурирование", "диффовка", "гравировка", "монтировка"],
    stoneSetting: ["корнеровая", "крапановая", "глухая"],
    materials: ["мельхиор", "латунь", "фианиты"],
    supervisor: SUPERVISOR,
  },
  {
    slug: "divnye-gryozy",
    n: 2,
    title: "Дивные грёзы",
    kind: "Колье",
    student: "Крутецкая А.",
    year: 2020,
    image: "/images/works/work-02.jpg",
    width: 1492,
    height: 1250,
    techniques: ["выпиловка", "диффовка", "монтировка", "гравировка"],
    stoneSetting: ["корнеровая", "крапановая", "глухая"],
    materials: ["латунь", "фианиты"],
    supervisor: SUPERVISOR,
  },
  {
    slug: "pust-serdtsu-vechno-snitsya-mart",
    n: 3,
    title: "Пусть сердцу вечно снится март",
    kind: "Колье",
    student: "Травина П.",
    year: 2020,
    image: "/images/works/work-03.jpg",
    width: 1394,
    height: 1268,
    techniques: ["выпиловка", "диффовка", "монтировка", "гравировка"],
    stoneSetting: ["корнеровая", "крапановая", "штифтовая", "клеевая"],
    materials: ["мельхиор", "латунь", "фианиты", "перламутр", "жемчуг"],
    supervisor: SUPERVISOR,
  },
  {
    slug: "aprelskaya-nezhnost",
    n: 4,
    title: "Апрельская нежность",
    kind: "Колье",
    student: "Гордеева Н.",
    year: 2020,
    image: "/images/works/work-04.jpg",
    width: 1480,
    height: 1264,
    techniques: ["выпиловка", "диффовка", "монтировка", "гравировка"],
    stoneSetting: ["корнеровая", "крапановая", "глухая"],
    materials: ["мельхиор", "фианиты"],
    supervisor: SUPERVISOR,
  },
  {
    slug: "trepet-v-letnem-sadu",
    n: 5,
    title: "Трепет в летнем саду",
    kind: "Колье",
    student: "Селезнёва В.",
    year: 2020,
    image: "/images/works/work-05.jpg",
    width: 1522,
    height: 1268,
    techniques: ["выпиловка", "диффовка", "монтировка", "гравировка"],
    stoneSetting: ["корнеровая", "крапановая", "глухая", "штифтовая", "клеевая"],
    materials: ["мельхиор", "латунь", "фианиты", "перламутр", "стекло"],
    supervisor: SUPERVISOR,
  },
  {
    slug: "sokrovishche-snezhnoy-korolevy",
    n: 6,
    title: "Сокровище снежной королевы",
    kind: "Колье",
    student: "Кузнецов А.",
    year: 2020,
    image: "/images/works/work-06.jpg",
    width: 1360,
    height: 1254,
    techniques: ["выпиловка", "диффовка", "монтировка", "гравировка"],
    stoneSetting: ["корнеровая", "глухая", "штифтовая", "клеевая"],
    materials: ["мельхиор", "фианиты", "стекло"],
    supervisor: SUPERVISOR,
  },
  {
    slug: "luchezarnyy-polden",
    n: 7,
    title: "Лучезарный полдень",
    kind: "Гарнитур (браслет, кольцо)",
    student: "Шмаков В.",
    year: 2020,
    image: "/images/works/work-07.jpg",
    width: 1506,
    height: 1210,
    techniques: ["выпиловка", "диффовка", "монтировка", "гравировка"],
    stoneSetting: ["корнеровая", "крапановая", "глухая"],
    materials: ["мельхиор", "медь", "фианиты"],
    supervisor: SUPERVISOR,
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
