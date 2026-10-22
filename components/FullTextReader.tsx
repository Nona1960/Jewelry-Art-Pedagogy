import Image from "next/image";
import type { Block, TocItem } from "@/lib/fulltext";

function PageMark({ n, inline = false }: { n: number; inline?: boolean }) {
  if (inline) {
    return (
      <span
        id={`s-${n}`}
        className="mx-1 inline-block scroll-mt-28 border border-gold/50 px-1 align-middle font-serif text-[11px] leading-[1.4] text-gold-deep"
        title={`Начало страницы ${n} оригинала`}
      >
        с. {n}
      </span>
    );
  }
  return (
    <div id={`s-${n}`} className="relative my-6 scroll-mt-28" aria-label={`Страница ${n}`}>
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="font-serif text-[12px] tracking-[0.15em] text-gold-deep">с. {n}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
    </div>
  );
}

export function TextBody({ blocks, scanDir, title }: { blocks: Block[]; scanDir: string; title: string }) {
  return (
    <div className="max-w-[46rem] text-[17px] leading-[1.8] text-ink-deep/95 [overflow-wrap:anywhere]">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "page":
            return <PageMark key={i} n={b.n} />;
          case "h2":
            return (
              <h2 key={i} id={b.id} className="mb-6 mt-14 scroll-mt-28 text-[32px] first:mt-0 sm:text-[36px]">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={b.id} className="mb-4 mt-10 scroll-mt-28 text-[25px] sm:text-[27px]">
                {b.text}
              </h3>
            );
          case "h4":
            return (
              <h3
                key={i}
                id={b.id}
                className="mb-3 mt-8 scroll-mt-28 font-serif text-[15px] font-bold uppercase tracking-[0.08em] text-gold-deep"
              >
                {b.text}
              </h3>
            );
          case "scan":
            return (
              <figure key={i} className="my-8 border border-line bg-white p-2">
                <Image
                  src={`${scanDir}/p-${String(b.n).padStart(3, "0")}.webp`}
                  alt={`${title}, страница ${b.n} (скан оригинала)`}
                  width={1240}
                  height={1754}
                  sizes="(min-width: 768px) 46rem, 100vw"
                  className="h-auto w-full"
                />
                <figcaption className="px-2 pt-2 text-[13px] text-ink-soft">
                  Страница {b.n} — скан оригинала
                </figcaption>
              </figure>
            );
          default:
            return (
              <p key={i} className="mb-5 [hyphens:auto] sm:text-justify" lang="ru">
                {b.parts.map((p, j) => (typeof p === "string" ? p : <PageMark key={j} n={p.page} inline />))}
              </p>
            );
        }
      })}
    </div>
  );
}

export function Toc({ toc }: { toc: TocItem[] }) {
  return (
    <nav aria-label="Оглавление">
      <p className="eyebrow">Оглавление</p>
      <ol className="mt-4 max-h-[70vh] space-y-1 overflow-y-auto border-l border-line pl-4 text-[14px] leading-snug">
        {toc.map((t) => (
          <li key={t.id} className={t.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${t.id}`}
              className={`block py-1 transition-colors hover:text-gold-deep ${t.level === 2 ? "text-ink-deep" : "text-ink"}`}
            >
              {t.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
