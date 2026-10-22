/**
 * Методики обучения ювелирному искусству — обновлённые авторские редакции курсов Д. С. Дронова
 * и научно-методические статьи о его системе. Публикации в Zenodo (DOI).
 *
 * Полный текст: content/metodiki/<slug>.html (+ .toc.json, .meta.json).
 * Записи без slug пока показываются только ссылкой на Zenodo.
 * Записи без doi — тексты, для которых DOI ещё не указан/не опубликован.
 *
 * Порядок блоков и записей внутри блоков — методический: от научных оснований
 * к материально-технологической, художественно-проектной и исполнительской подготовке.
 */

export type MethodBlockId = "osnovaniya" | "materialy" | "proektirovanie" | "masterstvo";

export interface MethodBlock {
  id: MethodBlockId;
  num: string;
  title: string;
  lead: string;
}

export const METHOD_BLOCKS: MethodBlock[] = [
  {
    id: "osnovaniya",
    num: "I",
    title: "Научные основания авторской системы",
    lead: "Теоретико-методологическое ядро: педагогическая модель 2009 года, социокультурная концепция 2015 года и обобщающая методика формирования профессиональных компетенций.",
  },
  {
    id: "materialy",
    num: "II",
    title: "Материально-технологическая подготовка",
    lead: "Знание металлов, сплавов, камней и производственных процессов как фундамент профессиональных решений художника-ювелира.",
  },
  {
    id: "proektirovanie",
    num: "III",
    title: "Художественно-проектная подготовка",
    lead: "Историческое наследие, композиция, графика и проектирование: путь от художественной идеи к конструктивно обоснованному проекту.",
  },
  {
    id: "masterstvo",
    num: "IV",
    title: "Исполнительское мастерство и практика",
    lead: "Воплощение проекта в материале: от освоения ремесленных операций к профессиональной самостоятельности мастера.",
  },
];

export interface Method {
  block: MethodBlockId;
  /** Русское название (для записей с текстом на сайте) */
  title?: string;
  /** Учебные дисциплины и ступень обучения */
  course?: string;
  /** Название записи в Zenodo */
  zenodoTitle?: string;
  doi?: string;
  slug?: string;
  /** Тип: методика курса или аналитическая статья о научном труде */
  kind?: "course" | "analysis" | "general";
}

export const METHODS: Method[] = [
  // I. Научные основания
  {
    block: "osnovaniya",
    kind: "analysis",
    slug: "dissertaciya-2009-analiz",
    title:
      "Научная новизна и практическая значимость педагогической модели Д. С. Дронова (2009) как методологической основы современной международной школы профессионального образования художников-ювелиров",
    course: "Анализ кандидатской диссертации 2009 года",
  },
  {
    block: "osnovaniya",
    kind: "analysis",
    slug: "monografiya-2015-analiz",
    title:
      "Научная актуальность и концептуальная новизна социокультурного подхода Д. С. Дронова к профессиональному образованию в области традиционного ювелирного искусства",
    course: "Анализ монографии 2015 года",
  },
  {
    block: "osnovaniya",
    kind: "general",
    doi: "10.5281/zenodo.23500383",
    zenodoTitle: "Dronov’s Integrated Competency Development Method for Jewelry Art Education",
  },

  // II. Материально-технологическая подготовка
  {
    block: "materialy",
    kind: "course",
    slug: "materialovedenie",
    doi: "10.5281/zenodo.23504219",
    zenodoTitle:
      "Materials Science as a Foundation of Professional Jewelry Education: Integrating Theoretical Knowledge, Technological Practice, and Artistic Thinking",
    title:
      "Материаловедение как фундамент профессиональной подготовки художника-ювелира: интеграция теоретических знаний, технологической практики и художественного мышления",
    course: "«Технология и материаловедение» · бакалавриат, 1 курс",
  },
  {
    block: "materialy",
    kind: "course",
    doi: "10.5281/zenodo.23499927",
    zenodoTitle:
      "Competency-Based Gemology Education in Professional Jewelry Art Training: Educational Objectives, Teaching Methodology, and Assessment of Professional Competencies",
  },
  {
    block: "materialy",
    kind: "course",
    slug: "sovremennye-tehnologii",
    doi: "10.5281/zenodo.23505431",
    zenodoTitle:
      "Modern Technologies in the Professional Education of Jewelry Artists: The Scientific and Methodological Significance of D. S. Dronov’s 2020 Curriculum",
    title:
      "Современные технологии в системе профессионального образования художника-ювелира: научно-методическая значимость учебного курса Д. С. Дронова",
    course: "«Современные технологии в ювелирном искусстве» · магистратура",
  },

  // III. Художественно-проектная подготовка
  {
    block: "proektirovanie",
    kind: "course",
    slug: "tradicii-i-nasledie",
    doi: "10.5281/zenodo.23504323",
    zenodoTitle:
      "Jewelry Traditions and Historical Heritage as a Foundation for Developing the Professional Competencies of Jewelry Artists",
    title:
      "Традиции и историческое наследие ювелирного искусства как основа формирования профессиональных компетенций художника-ювелира",
    course: "«История и теория ювелирного искусства» · магистратура",
  },
  {
    block: "proektirovanie",
    kind: "course",
    doi: "10.5281/zenodo.23503386",
    zenodoTitle: "Composition, Creative Cognition, and the Psychology of Artistic Thinking in Jewelry Design Education",
  },
  {
    block: "proektirovanie",
    kind: "course",
    doi: "10.5281/zenodo.23503517",
    zenodoTitle: "Technical Drawing, Spatial Cognition, and Creative Thinking in Jewelry Education",
  },
  {
    block: "proektirovanie",
    kind: "general",
    slug: "proektnoe-myshlenie",
    doi: "10.5281/zenodo.23503225",
    zenodoTitle:
      "Dronov’s Methodology for the Staged Development of Artistic and Design Thinking in Jewelry Art: Integrating Composition, Construction, and Technological Feasibility",
    title:
      "Авторская методология Д. С. Дронова поэтапного формирования художественно-проектного мышления в ювелирном искусстве",
    course: "Художественное проектирование ювелирных изделий · сквозная методика",
  },
  {
    block: "proektirovanie",
    kind: "course",
    slug: "ot-proekta-k-konstruktsii",
    doi: "10.5281/zenodo.23504790",
    zenodoTitle:
      "From Artistic Design to Structural Realization: Continuity and Progression of Professional Competencies in Master’s-Level Jewelry Education",
    title:
      "От художественного проекта к конструктивному воплощению: преемственность профессиональных компетенций в магистерской подготовке художников-ювелиров",
    course: "«Проектирование» и «Конструирование ювелирных изделий» · магистратура",
  },
  {
    block: "proektirovanie",
    kind: "course",
    doi: "10.5281/zenodo.23503743",
    zenodoTitle:
      "Jewelry Renovation as a Method of Developing Design Thinking, Visuospatial Reconstruction, and Professional Creativity",
  },

  // IV. Исполнительское мастерство и практика
  {
    block: "masterstvo",
    kind: "course",
    doi: "10.5281/zenodo.23503608",
    zenodoTitle:
      "Wax Modeling in Jewelry Education: Material Cognition, Creative Psychology, and the Development of Professional Craftsmanship",
  },
  {
    block: "masterstvo",
    kind: "course",
    slug: "masterstvo",
    title:
      "От освоения ремесленных операций к профессиональному мастерству художника-ювелира: интегрированная методика практического образования",
    course: "«Мастерство» и «Совершенствование мастерства» · магистратура",
  },
  {
    block: "masterstvo",
    kind: "course",
    slug: "ispolnitelskoe-masterstvo",
    doi: "10.5281/zenodo.23501324",
    zenodoTitle: "Staged Development of Performance Mastery in Jewelry Art Education",
    title:
      "Поэтапное формирование исполнительского мастерства художников-ювелиров: интеграция технологической подготовки, художественного проектирования и критериальной оценки",
    course: "Исполнительское мастерство · от изделий по образцу к собственному проекту",
  },
  {
    block: "masterstvo",
    kind: "course",
    doi: "10.5281/zenodo.23500548",
    zenodoTitle:
      "Methodological Framework for Developing Professional Craftsmanship in Jewelry Art through Production Practice: A Competency-Based Approach",
  },
  {
    block: "masterstvo",
    kind: "general",
    doi: "10.5281/zenodo.23503901",
    zenodoTitle:
      "Интегрированная методика практического обучения ювелиров: от освоения ремесленных операций к художественному проектированию, самостоятельному производству и профессиональной экспертизе",
  },
];

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;
export const getMethod = (slug: string) => METHODS.find((m) => m.slug === slug);
export const methodsOf = (block: MethodBlockId) => METHODS.filter((m) => m.block === block);
export const METHODS_YEAR = 2026;
