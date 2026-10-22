import fs from "node:fs";
import path from "node:path";

export interface MethodMeta {
  title: string;
  subtitle: string;
  annotation: string[];
  keywords: string;
  words: number;
}

export function loadMethod(slug: string) {
  const dir = path.join(process.cwd(), "content", "metodiki");
  const html = fs.readFileSync(path.join(dir, `${slug}.html`), "utf-8");
  const toc = JSON.parse(fs.readFileSync(path.join(dir, `${slug}.toc.json`), "utf-8")) as {
    id: string;
    text: string;
    level: 2 | 3;
  }[];
  const meta = JSON.parse(fs.readFileSync(path.join(dir, `${slug}.meta.json`), "utf-8")) as MethodMeta;
  return { html, toc, meta };
}
