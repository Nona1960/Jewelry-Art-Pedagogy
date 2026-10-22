import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { works } from "@/lib/data/gallery";
import { METHODS } from "@/lib/data/methods";
import { BOOKS } from "@/lib/data/books";
import { MANUALS } from "@/lib/data/manuals";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    entry("/", 1),
    entry("/avtor", 0.9),
    entry("/metodologiya", 0.9),
    entry("/nauka", 0.9),
    entry("/biblioteka", 0.8),
    entry("/galereya", 0.8),
    entry("/nauka/dissertaciya", 0.8, "yearly"),
    entry("/nauka/avtoreferat", 0.7, "yearly"),
    ...BOOKS.map((b) => entry(`/nauka/knigi/${b.slug}`, 0.8, "yearly")),
    ...METHODS.filter((m) => m.slug).map((m) => entry(`/metodologiya/metodiki/${m.slug}`, 0.7, "yearly")),
    ...MANUALS.map((m) => entry(`/biblioteka/posobiya/${m.slug}`, 0.7, "yearly")),
    ...works.map((w) => entry(`/galereya/${w.slug}`, 0.6, "yearly")),
  ];
}
