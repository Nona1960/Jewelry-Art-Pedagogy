import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { works } from "@/lib/data/gallery";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/avtor", "/metodologiya", "/nauka", "/nauka/dissertaciya", "/nauka/avtoreferat", "/nauka/knigi/socialno-kulturnyy-podhod-2015", "/nauka/knigi/istoricheskoe-svoeobrazie-2011", "/nauka/knigi/cennosti-i-interesy-ch2-2010", "/biblioteka", "/biblioteka/posobiya/gemmologiya-ch1", "/galereya"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "monthly" as const, priority: p ? 0.8 : 1 })),
    ...works.map((w) => ({ url: `${SITE.url}/galereya/${w.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
