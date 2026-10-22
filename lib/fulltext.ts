import fs from "node:fs";
import path from "node:path";

export type Block =
  | { kind: "page"; n: number }
  | { kind: "h2" | "h3"; id: string; text: string }
  | { kind: "p"; parts: (string | { page: number })[] }
  | { kind: "scan"; n: number };

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slug(s: string, used: Set<string>) {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l",
    м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh",
    щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  let base = s
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  if (!base) base = "razdel";
  let id = base;
  let i = 2;
  while (used.has(id)) id = `${base}-${i++}`;
  used.add(id);
  return id;
}

/** Читает текст из content/<name>.md (формат см. в README) и разбирает его на блоки. */
export function loadFullText(name: string) {
  const file = path.join(process.cwd(), "content", `${name}.md`);
  const raw = fs.readFileSync(file, "utf-8");
  const used = new Set<string>();
  const blocks: Block[] = [];
  const toc: TocItem[] = [];

  for (const chunk of raw.split(/\n\s*\n/)) {
    const t = chunk.trim();
    if (!t) continue;
    let m: RegExpMatchArray | null;
    if ((m = t.match(/^<!--\s*p:(\d+)\s*-->$/))) {
      blocks.push({ kind: "page", n: Number(m[1]) });
    } else if ((m = t.match(/^!\[scan\]\(p:(\d+)\)$/))) {
      blocks.push({ kind: "scan", n: Number(m[1]) });
    } else if ((m = t.match(/^(#{2,3})\s+(.+)$/))) {
      const level = m[1].length as 2 | 3;
      const text = m[2].trim();
      const id = slug(text, used);
      blocks.push({ kind: level === 2 ? "h2" : "h3", id, text });
      toc.push({ id, text, level });
    } else {
      const parts: (string | { page: number })[] = [];
      for (const piece of t.replace(/\s*\n\s*/g, " ").split(/(\{\{p:\d+\}\})/)) {
        const pm = piece.match(/^\{\{p:(\d+)\}\}$/);
        if (pm) parts.push({ page: Number(pm[1]) });
        else if (piece) parts.push(piece);
      }
      blocks.push({ kind: "p", parts });
    }
  }
  const words = raw.replace(/<!--.*?-->|\{\{p:\d+\}\}/g, " ").split(/\s+/).filter(Boolean).length;
  return { blocks, toc, words };
}
