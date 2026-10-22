import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, PubList } from "@/components/ui";
import { directions } from "@/lib/data/methodology";
import { byNumbers } from "@/lib/data/bibliography";

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
    </>
  );
}
