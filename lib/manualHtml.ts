import fs from "node:fs";
import path from "node:path";

export function loadManualHtml(slug: string) {
  const dir = path.join(process.cwd(), "content");
  const html = fs.readFileSync(path.join(dir, `${slug}.html`), "utf-8");
  const toc = JSON.parse(fs.readFileSync(path.join(dir, `${slug}.toc.json`), "utf-8")) as {
    id: string;
    text: string;
    level: 2 | 3;
  }[];
  return { html, toc };
}
