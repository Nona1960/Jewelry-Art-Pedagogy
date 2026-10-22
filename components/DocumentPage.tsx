import Image from "next/image";
import Link from "next/link";
import { loadFullText } from "@/lib/fulltext";
import { TextBody, Toc } from "./FullTextReader";

export interface DocAction {
  href: string;
  label: string;
  primary?: boolean;
  file?: boolean;
}

export default function DocumentPage({
  name,
  eyebrow,
  title,
  rows,
  crumb,
  actions,
  cover,
  annotation,
  fromSource = false,
}: {
  name: string;
  eyebrow: string;
  title: string;
  rows: [string, string][];
  crumb: { href: string; label: string };
  actions: DocAction[];
  cover?: { src: string; width: number; height: number; alt: string };
  annotation?: string[];
  fromSource?: boolean;
}) {
  const { blocks, toc, words } = loadFullText(name);
  return (
    <article>
      <header className="border-b border-line">
        <div className={`wrap py-12 sm:py-16 ${cover ? "grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16" : ""}`}>
          <div>
            <nav aria-label="Навигация" className="text-[14px] text-ink-soft">
              <Link href="/nauka" className="link">
                Наука
              </Link>
              <span className="mx-2">/</span>
              <Link href={crumb.href} className="link">
                {crumb.label}
              </Link>
            </nav>
            <p className="eyebrow mt-8">{eyebrow}</p>
            <h1 className="mt-4 max-w-5xl text-[36px] leading-[1.1] sm:text-[52px]">{title}</h1>
            <div className="rule mt-6" />
            <dl className="mt-8 grid max-w-5xl gap-x-8 gap-y-3 text-[15px] sm:grid-cols-[210px_1fr]">
              {rows.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-[12px] uppercase leading-relaxed tracking-[0.15em] text-gold-deep">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            {annotation && (
              <div className="mt-8 max-w-4xl space-y-3 text-[16px]">
                <p className="eyebrow">Аннотация</p>
                {annotation.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}
            <div className="mt-9 flex flex-wrap gap-3">
              {actions.map((a) =>
                a.file ? (
                  <a key={a.href} href={a.href} className={a.primary ? "btn" : "btn-ghost"} target="_blank" rel="noopener">
                    {a.label}
                  </a>
                ) : (
                  <Link key={a.href} href={a.href} className={a.primary ? "btn" : "btn-ghost"}>
                    {a.label}
                  </Link>
                ),
              )}
            </div>
            <p className="mt-6 max-w-3xl text-[14px] italic text-ink-soft">
              {fromSource
                ? `Текст ниже взят из электронного оригинала издания (${words.toLocaleString("ru-RU")} слов). Отметки «с. N» соответствуют страницам книги.`
                : `Текст ниже распознан со сканов печатного оригинала (${words.toLocaleString("ru-RU")} слов). Отметки «с. N» соответствуют страницам оригинала; схемы и таблицы приведены сканами. При цитировании сверяйтесь с PDF.`}
            </p>
          </div>
          {cover && (
            <figure className="mx-auto w-full max-w-[300px] self-start">
              <Image
                src={cover.src}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
                sizes="300px"
                className="h-auto w-full border border-line"
                priority
              />
            </figure>
          )}
        </div>
      </header>
      <div className="wrap grid gap-12 py-14 lg:grid-cols-[280px_1fr] lg:gap-16">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <Toc toc={toc} />
        </div>
        <div className="min-w-0">
          <TextBody blocks={blocks} scanDir={`/scans/${name}`} title={title} />
        </div>
      </div>
    </article>
  );
}
