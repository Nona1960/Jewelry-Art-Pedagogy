import type { Metadata } from "next";
import { abs, pageMeta, PERSON_LD } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Toc } from "@/components/FullTextReader";
import { doiUrl, getMethod, METHOD_BLOCKS, METHODS, METHODS_YEAR } from "@/lib/data/methods";
import { loadMethod } from "@/lib/methodContent";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return METHODS.filter((m) => m.slug).map((m) => ({ slug: m.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = getMethod(slug);
  if (!m) return {};
  const { meta } = loadMethod(slug);
  return pageMeta({
    title: m.title ?? meta.title,
    description: meta.annotation.join(" ") || (m.course ?? ""),
    path: `/metodologiya/metodiki/${m.slug}`,
    type: "article",
  });
}

export default async function MethodPage({ params }: Props) {
  const { slug } = await params;
  const m = getMethod(slug);
  if (!m) notFound();
  const { html, toc, meta } = loadMethod(slug);
  const title = m.title ?? meta.title;
  const cite = m.doi
    ? `Дронов Д. С. ${title}. — Zenodo, ${METHODS_YEAR}. — DOI: ${m.doi}`
    : `Дронов Д. С. ${title}. — ${METHODS_YEAR}.`;
  const block = METHOD_BLOCKS.find((b) => b.id === m.block);
  return (
    <article>
      <JsonLd
        data={{
          "@type": "ScholarlyArticle",
          headline: title.slice(0, 110),
          name: title,
          author: { "@id": PERSON_LD["@id"], "@type": "Person", name: PERSON_LD.name },
          inLanguage: "ru",
          datePublished: String(METHODS_YEAR),
          url: abs(`/metodologiya/metodiki/${m.slug}`),
          ...(meta.keywords ? { keywords: meta.keywords } : {}),
          ...(meta.annotation.length ? { abstract: meta.annotation.join(" ") } : {}),
          ...(m.doi
            ? { identifier: { "@type": "PropertyValue", propertyID: "DOI", value: m.doi }, sameAs: doiUrl(m.doi) }
            : {}),
        }}
      />
      <header className="border-b border-line">
        <div className="wrap py-12 sm:py-16">
          <nav aria-label="Навигация" className="text-[14px] text-ink-soft">
            <Link href="/metodologiya" className="link">
              Методология
            </Link>
            <span className="mx-2">/</span>
            <Link href="/metodologiya#metodiki" className="link">
              Методики обучения
            </Link>
          </nav>
          <p className="eyebrow mt-8">
            {block ? `${block.num}. ${block.title}` : "Методика обучения"}
          </p>
          {m.course && <p className="mt-2 text-[15px] text-ink">{m.course}</p>}
          <h1 className="mt-4 max-w-5xl text-[34px] leading-[1.12] sm:text-[48px]">{title}</h1>
          {meta.subtitle && <p className="mt-4 max-w-4xl font-display text-[22px] italic text-gold-deep">{meta.subtitle}</p>}
          <div className="rule mt-6" />
          <dl className="mt-8 grid max-w-5xl gap-x-8 gap-y-3 text-[15px] sm:grid-cols-[210px_1fr]">
            <dt className="text-[12px] uppercase leading-relaxed tracking-[0.15em] text-gold-deep">Автор</dt>
            <dd>Дронов Дмитрий Сергеевич</dd>
            {m.doi && (
              <>
                <dt className="text-[12px] uppercase leading-relaxed tracking-[0.15em] text-gold-deep">Публикация</dt>
                <dd>
                  Zenodo, {METHODS_YEAR} ·{" "}
                  <a href={doiUrl(m.doi)} className="link" target="_blank" rel="noopener">
                    DOI: {m.doi}
                  </a>
                </dd>
              </>
            )}
            {meta.keywords && (
              <>
                <dt className="text-[12px] uppercase leading-relaxed tracking-[0.15em] text-gold-deep">Ключевые слова</dt>
                <dd>{meta.keywords}</dd>
              </>
            )}
          </dl>
          {meta.annotation.length > 0 && (
            <div className="mt-8 max-w-4xl space-y-3 text-[16px]">
              <p className="eyebrow">Аннотация</p>
              {meta.annotation.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          )}
          <div className="mt-8 max-w-4xl border-l-2 border-gold/60 bg-sand/30 px-4 py-3 text-[14px]">
            <p className="font-serif text-[12px] uppercase tracking-[0.15em] text-gold-deep">Как ссылаться</p>
            <p className="mt-1 select-all">{cite}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {m.doi && (
              <a href={doiUrl(m.doi)} className="btn" target="_blank" rel="noopener">
                Открыть в Zenodo
              </a>
            )}
            <Link href="/metodologiya#metodiki" className={m.doi ? "btn-ghost" : "btn"}>
              Все методики
            </Link>
          </div>
        </div>
      </header>
      <div className="wrap grid gap-12 py-14 lg:grid-cols-[280px_1fr] lg:gap-16">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <Toc toc={toc} />
        </div>
        <div className="doc-html min-w-0 max-w-[50rem]" lang="ru" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}
