import type { Metadata } from "next";
import { SITE } from "./site";

const DEFAULT_IMAGE = { url: "/images/dmitry-dronov-portrait.jpg", width: 964, height: 1280, alt: "Дмитрий Сергеевич Дронов" };

/** Единые метаданные страницы: заголовок, описание, каноническая ссылка, Open Graph, Twitter. */
export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title?: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt?: string };
  type?: "website" | "article" | "book" | "profile";
}): Metadata {
  // Короткий заголовок для поисковой выдачи (полное название остаётся на странице)
  let short = title;
  if (short && short.length > 70) short = short.split(/:\s/)[0];
  if (short && short.length > 70) short = short.slice(0, 67).replace(/\s+\S*$/, "") + "…";
  const desc = description.length > 300 ? description.slice(0, 297).replace(/\s+\S*$/, "") + "…" : description;
  const img = image ?? DEFAULT_IMAGE;
  const ogTitle = title ? (title.length > 90 ? short! : `${title} — ${SITE.name}`) : `${SITE.name} — ${SITE.tagline}`;
  return {
    ...(short ? { title: short.length > 55 ? { absolute: short } : short } : {}),
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: type === "book" || type === "profile" ? "article" : type,
      locale: "ru_RU",
      siteName: SITE.name,
      url: path,
      title: ogTitle,
      description: desc,
      images: [{ ...img, alt: img.alt ?? ogTitle }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: desc, images: [img.url] },
  };
}

export const abs = (path: string) => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

export const PERSON_LD = {
  "@type": "Person",
  "@id": `${SITE.url}/avtor#person`,
  name: "Дмитрий Сергеевич Дронов",
  alternateName: ["Дронов Дмитрий Сергеевич", "Д. С. Дронов", "Dmitriy Dronov"],
  jobTitle: "Кандидат педагогических наук",
  description: "Автор методологии обучения ручному ювелирному искусству, исследователь ювелирной культуры.",
  url: `${SITE.url}/avtor`,
  image: `${SITE.url}/images/dmitry-dronov-portrait.jpg`,
  memberOf: { "@type": "Organization", name: "Союз художников России" },
  knowsAbout: ["ювелирное искусство", "педагогика", "профессиональное художественное образование", "ювелирная культура", "геммология"],
};
