import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { works } from "@/lib/data/gallery";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/avtor", "/metodologiya", "/nauka", "/biblioteka", "/galereya"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "monthly" as const, priority: p ? 0.8 : 1 })),
    ...works.map((w) => ({ url: `${SITE.url}/galereya/${w.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
