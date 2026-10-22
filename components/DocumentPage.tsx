import Link from "next/link";
import { loadFullText } from "@/lib/fulltext";
import { DISSERTATION as D } from "@/lib/data/dissertation";
import { TextBody, Toc } from "./FullTextReader";

export default function DocumentPage({
  name,
  kind,
  pdf,
  pdfLabel,
  pages,
  other,
}: {
  name: string;
  kind: string;
  pdf: string;
  pdfLabel: string;
  pages: number;
  other: { href: string; label: string };
}) {
  const { blocks, toc, words } = loadFullText(name);
  const rows: [string, string][] = [
    ["Автор", D.author],
    ["Специальность", D.specialty],
    ["Организация", D.institution],
    ["Научный руководитель", D.supervisor],
    ["Официальные оппоненты", D.opponents.join("; ")],
    ["Ведущая организация", D.leadingOrganization],
    ["Защита", D.defense],
  ];
  return (
    <article>
      <header className="border-b border-line">
        <div className="wrap py-12 sm:py-16">
          <nav aria-label="Навигация" className="text-[14px] text-ink-soft">
            <Link href="/nauka" className="link">
              Наука
            </Link>
            <span className="mx-2">/</span>
            <Link href="/nauka#dissertaciya" className="link">
              Диссертация
            </Link>
          </nav>
          <p className="eyebrow mt-8">
            {kind} · {D.city}, {D.year}
          </p>
          <h1 className="mt-4 max-w-5xl text-[36px] leading-[1.1] sm:text-[52px]">{D.title}</h1>
          <div className="rule mt-6" />
          <dl className="mt-8 grid max-w-5xl gap-x-8 gap-y-3 text-[15px] sm:grid-cols-[210px_1fr]">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-[12px] uppercase leading-relaxed tracking-[0.15em] text-gold-deep">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={pdf} className="btn" target="_blank" rel="noopener">
              {pdfLabel} · PDF, {pages} с.
            </a>
            <Link href={other.href} className="btn-ghost">
              {other.label}
            </Link>
          </div>
          <p className="mt-6 max-w-3xl text-[14px] italic text-ink-soft">
            Текст ниже распознан со сканов печатного оригинала ({words.toLocaleString("ru-RU")} слов). Отметки «с. N»
            соответствуют страницам оригинала; схемы и таблицы приведены сканами. При цитировании сверяйтесь с PDF.
          </p>
        </div>
      </header>
      <div className="wrap grid gap-12 py-14 lg:grid-cols-[280px_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Toc toc={toc} />
        </aside>
        <TextBody blocks={blocks} scanDir={`/scans/${name}`} title={`${kind}: ${D.title}`} />
      </div>
    </article>
  );
}
