import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Toc } from "@/components/FullTextReader";
import { getManual, MANUALS } from "@/lib/data/manuals";
import { loadManualHtml } from "@/lib/manualHtml";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MANUALS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = getManual(slug);
  if (!m) return {};
  return {
    title: `${m.title}${m.subtitle ? `. ${m.subtitle}` : ""}`,
    description: `${m.author}. ${m.title}. ${m.subtitle ?? m.type}. Полный текст.`,
  };
}

export default async function ManualPage({ params }: Props) {
  const { slug } = await params;
  const m = getManual(slug);
  if (!m) notFound();
  const { html, toc } = loadManualHtml(slug);
  const rows: [string, string][] = [
    ["Автор", m.author],
    ...(m.editor ? ([["Общая редакция", m.editor]] as [string, string][]) : []),
    ...(m.reviewers?.length ? ([["Рецензент", m.reviewers.join("; ")]] as [string, string][]) : []),
    ["Тип", m.type],
  ];
  return (
    <article>
      <header className="border-b border-line">
        <div className="wrap py-12 sm:py-16">
          <nav aria-label="Навигация" className="text-[14px] text-ink-soft">
            <Link href="/biblioteka" className="link">
              Библиотека
            </Link>
            <span className="mx-2">/</span>
            <Link href="/biblioteka?tip=posobiya" className="link">
              Учебные пособия
            </Link>
          </nav>
          <p className="eyebrow mt-8">{m.subtitle ?? m.type}</p>
          <h1 className="mt-4 text-[44px] leading-[1.1] sm:text-[60px]">{m.title}</h1>
          <div className="rule mt-6" />
          <dl className="mt-8 grid max-w-5xl gap-x-8 gap-y-3 text-[15px] sm:grid-cols-[210px_1fr]">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-[12px] uppercase leading-relaxed tracking-[0.15em] text-gold-deep">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 max-w-4xl space-y-3 text-[16px]">
            <p className="eyebrow">Аннотация</p>
            {m.annotation.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </header>
      <div className="wrap grid gap-12 py-14 lg:grid-cols-[280px_1fr] lg:gap-16">
        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <Toc toc={toc} />
        </aside>
        <div className="doc-html min-w-0 max-w-[50rem]" lang="ru" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}
