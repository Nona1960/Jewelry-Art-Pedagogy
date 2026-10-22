import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, PubList } from "@/components/ui";
import { directions } from "@/lib/data/methodology";
import { byNumbers } from "@/lib/data/bibliography";
import { doiUrl, METHODS } from "@/lib/data/methods";

export const metadata: Metadata = {
  title: "Методология",
  description:
    "Авторская методология Дмитрия Дронова: научно-педагогическая концепция, принципы профессионального художественного образования, проектирование, технологическая подготовка и дипломная деятельность художников-ювелиров.",
};

export default function MethodologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Центральный раздел"
        title="Методология"
        lead={
          <p>
            Авторская методология преподавания ювелирного искусства развивается на основе оригинальных научных
            исследований, авторских образовательных программ и многолетнего педагогического опыта Дмитрия Дронова.
          </p>
        }
      />

      <div className="wrap grid gap-12 py-16 lg:grid-cols-[260px_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Содержание</p>
          <ol className="mt-4 space-y-2 border-l border-line pl-4 text-[15px]">
            {directions.map((d) => (
              <li key={d.id}>
                <a href={`#${d.id}`} className="block py-1 text-ink transition-colors hover:text-gold-deep">
                  <span className="mr-2 font-display text-gold">{d.num}</span>
                  {d.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="space-y-16">
          {directions.map((d) => (
            <article key={d.id} id={d.id} className="scroll-mt-28 border-t border-line pt-10 first:border-t-0 first:pt-0">
              <p className="font-display text-[56px] leading-none text-gold">{d.num}</p>
              <h2 className="mt-3 text-[32px] sm:text-[38px]">{d.title}</h2>
              <p className="mt-5 max-w-3xl text-[18px]">{d.summary}</p>
              {d.id === "diplom" && (
                <p className="mt-4">
                  <Link href="/galereya" className="link">
                    Смотреть дипломные работы в галерее →
                  </Link>
                </p>
              )}
              <h3 className="mt-8 font-serif text-[13px] uppercase tracking-[0.2em] text-gold-deep">
                Опорные труды автора
              </h3>
              <div className="mt-3">
                <PubList items={byNumbers(d.sources)} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <section id="metodiki" className="scroll-mt-24 border-t border-line bg-white/50">
        <div className="wrap py-16">
          <p className="eyebrow">Обновлённые авторские редакции курсов</p>
          <h2 className="mt-3 text-[38px] sm:text-[46px]">Методики обучения ювелирному искусству</h2>
          <div className="rule mt-5" />
          <div className="mt-6 max-w-3xl space-y-4 text-[17px]">
            <p>
              Учебные программы и пособия по ключевым дисциплинам подготовки художников-ювелиров Дмитрий Дронов создал
              самостоятельно в ходе преподавания в Высшей школе народных искусств. Здесь представлены их полностью
              переработанные авторские редакции, опубликованные в открытом научном репозитории Zenodo с постоянными
              идентификаторами DOI.
            </p>
          </div>
          <ol className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
            {METHODS.map((m, i) => (
              <li key={m.doi} className="flex flex-col bg-milk p-6">
                <span className="font-display text-[28px] leading-none text-gold">{String(i + 1).padStart(2, "0")}</span>
                {m.slug ? (
                  <>
                    <Link
                      href={`/metodologiya/metodiki/${m.slug}`}
                      className="mt-3 font-display text-[22px] leading-snug text-ink-deep hover:text-gold-deep"
                    >
                      {m.title}
                    </Link>
                    {m.course && <p className="mt-2 text-[14px] text-ink">{m.course}</p>}
                  </>
                ) : (
                  <p className="mt-3 font-display text-[21px] leading-snug text-ink-deep" lang="en">
                    {m.zenodoTitle}
                  </p>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-[14px]">
                  {m.slug && (
                    <Link href={`/metodologiya/metodiki/${m.slug}`} className="link">
                      Полный текст
                    </Link>
                  )}
                  <a href={doiUrl(m.doi)} className="link" target="_blank" rel="noopener">
                    DOI: {m.doi}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
