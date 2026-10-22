/**
 * Методики обучения ювелирному искусству — обновлённые авторские редакции курсов Д. С. Дронова,
 * опубликованные в Zenodo (DOI). Полный текст: content/metodiki/<slug>.html (+ .toc.json, .meta.json).
 * Записи без slug пока показываются только ссылкой на Zenodo.
 */
export interface Method {
  doi: string;
  /** Название записи в Zenodo */
  zenodoTitle: string;
  /** Русское название (если есть текст на сайте) */
  title?: string;
  course?: string;
  slug?: string;
}

export const METHODS: Method[] = [
  {
    "doi": "10.5281/zenodo.23503901",
    "zenodoTitle": "Интегрированная Методика Практического Обучения Ювелиров От Освоения Ремесленных Операций к Художественному Проектированию, Самостоятельному Производству и Профессиональной Экспертизе"
  },
  {
    "doi": "10.5281/zenodo.23499927",
    "zenodoTitle": "Competency-Based Gemology Education in Professional Jewelry Art Training: Educational Objectives, Teaching Methodology, and Assessment of Professional Competencies"
  },
  {
    "doi": "10.5281/zenodo.23503386",
    "zenodoTitle": "Composition, Creative Cognition, and the Psychology of Artistic Thinking in Jewelry Design Education"
  },
  {
    "doi": "10.5281/zenodo.23500383",
    "zenodoTitle": "Dronov’s Integrated Competency Development Method for Jewelry Art Education"
  },
  {
    "doi": "10.5281/zenodo.23503225",
    "zenodoTitle": "Dronov’s Methodology for the Staged Development of Artistic and Design Thinking in Jewelry Art: Integrating Composition, Construction, and Technological Feasibility"
  },
  {
    "doi": "10.5281/zenodo.23504790",
    "zenodoTitle": "FROM ARTISTIC DESIGN TO STRUCTURAL REALIZATION: CONTINUITY AND PROGRESSION OF PROFESSIONAL COMPETENCIES IN MASTER’S-LEVEL JEWELRY EDUCATION",
    "slug": "ot-proekta-k-konstruktsii",
    "title": "От художественного проекта к конструктивному воплощению: преемственность профессиональных компетенций в магистерской подготовке художников-ювелиров",
    "course": "Проектирование и конструирование ювелирных изделий · магистратура"
  },
  {
    "doi": "10.5281/zenodo.23503743",
    "zenodoTitle": "Jewelry Renovation as a Method of Developing Design Thinking, Visuospatial Reconstruction, and Professional Creativity"
  },
  {
    "doi": "10.5281/zenodo.23504323",
    "zenodoTitle": "JEWELRY TRADITIONS AND HISTORICAL HERITAGE AS A FOUNDATION FOR DEVELOPING THE PROFESSIONAL COMPETENCIES OF JEWELRY ARTISTS"
  },
  {
    "doi": "10.5281/zenodo.23504219",
    "zenodoTitle": "MATERIALS SCIENCE AS A FOUNDATION OF PROFESSIONAL JEWELRY EDUCATION: INTEGRATING THEORETICAL KNOWLEDGE, TECHNOLOGICAL PRACTICE, AND ARTISTIC THINKING"
  },
  {
    "doi": "10.5281/zenodo.23500548",
    "zenodoTitle": "Methodological Framework for Developing Professional Craftsmanship in Jewelry Art through Production Practice: A Competency-Based Approach"
  },
  {
    "doi": "10.5281/zenodo.23505431",
    "zenodoTitle": "Modern Technologies in the Professional Education of Jewelry Artists: The Scientific and Methodological Significance of D. S. Dronov’s 2020 Curriculum"
  },
  {
    "doi": "10.5281/zenodo.23501324",
    "zenodoTitle": "Staged Development of Performance Mastery in Jewelry Art Education"
  },
  {
    "doi": "10.5281/zenodo.23503517",
    "zenodoTitle": "Technical Drawing, Spatial Cognition, and Creative Thinking in Jewelry Education"
  },
  {
    "doi": "10.5281/zenodo.23503608",
    "zenodoTitle": "Wax Modeling in Jewelry Education: Material Cognition, Creative Psychology, and the Development of Professional Craftsmanship"
  }
];

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;
export const getMethod = (slug: string) => METHODS.find((m) => m.slug === slug);
export const METHODS_YEAR = 2026;
