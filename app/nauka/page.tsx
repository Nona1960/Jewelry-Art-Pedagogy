import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MONOGRAPH_2015 as M15 } from "@/lib/data/monograph2015";
import { DISSERTATION as D } from "@/lib/data/dissertation";
import { PageHeader, Pending, PubList, SectionTitle } from "@/components/ui";
import {
  articles,
  bibliography,
  BUSINESS_MATERIALS,
  byNumbers,
  citation,
  groupByYear,
  HISTORY_RESEARCH,
  MAIN_MONOGRAPH,
  monographs,
  published,
} from "@/lib/data/bibliography";

export const metadata: Metadata = {
  title: "Наука",
  description:
    "Научные труды Дмитрия Дронова: кандидатская диссертация, монография «Социодинамика ювелирной культуры», научные статьи, исследования истории российского ювелирного искусства.",
};

const TOC = [
  { id: "dissertaciya", label: "Кандидатская диссертация" },
  { id: "monografiya", label: "Монография «Социодинамика ювелирной культуры»" },
  { id: "monografii", label: "Монографии и авторские брошюры" },
  { id: "publikacii", label: "Научные статьи и публикации" },
  { id: "istoriya", label: "История российского ювелирного искусства" },
  { id: "biznes", label: "Материалы по ювелирному бизнесу" },
  { id: "bibliografiya", label: "Библиография и источники" },
];

export default function SciencePage() {
  const main = bibliography.find((b) => b.n === MAIN_MONOGRAPH)!;
  return (
    <>
      <PageHeader
        eyebrow="Научные труды"
        title="Наука"
        lead={
          <p>
            Научные исследования Дмитрия Дронова — от социодинамики ювелирной культуры до теории профессионального
            становления художников декоративно-прикладного искусства.
          </p>
        }
      />

      <div className="wrap grid gap-12 py-16 lg:grid-cols-[260px_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Разделы</p>
          <ol className="mt-4 space-y-2 border-l border-line pl-4 text-[15px]">
            {TOC.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="block py-1 text-ink transition-colors hover:text-gold-deep">
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="min-w-0 space-y-20">
          <section>
            <SectionTitle id="dissertaciya" eyebrow="Учёная степень" title="Кандидатская диссертация" />
            <div className="card mt-8 p-6 sm:p-8">
              <h3 className="text-[28px] leading-snug">«{D.title}»</h3>
              <dl className="mt-6 grid gap-x-8 gap-y-3 text-[16px] sm:grid-cols-[200px_1fr]">
                <dt className="text-[13px] uppercase tracking-[0.15em] text-gold-deep">Год</dt>
                <dd>{D.year}</dd>
                <dt className="text-[13px] uppercase tracking-[0.15em] text-gold-deep">Описание</dt>
                <dd>
                  {D.author}. {D.title} : дис. … канд. пед. наук : {D.specialty.split(" ")[0]}. — {D.city}, {D.year}. —
                  177 с.
                </dd>
                <dt className="text-[13px] uppercase tracking-[0.15em] text-gold-deep">Организация</dt>
                <dd>{D.institution}</dd>
                <dt className="text-[13px] uppercase tracking-[0.15em] text-gold-deep">Научный руководитель</dt>
                <dd>{D.supervisor}</dd>
              </dl>
              <h4 className="mt-8 font-serif text-[13px] uppercase tracking-[0.2em] text-gold-deep">Аннотация</h4>
              <div className="mt-3 space-y-3 text-[16px]">
                {D.annotation.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/nauka/dissertaciya" className="btn">
                  Читать полный текст
                </Link>
                <Link href="/nauka/avtoreferat" className="btn-ghost">
                  Автореферат
                </Link>
                <a href={D.pdf.dissertation} className="btn-ghost" target="_blank" rel="noopener">
                  PDF диссертации
                </a>
              </div>
            </div>
          </section>

          <section>
            <SectionTitle id="monografiya" eyebrow="Авторская монография" title="«Социодинамика ювелирной культуры»" />
            <div className="card mt-8 p-6 sm:p-8">
              <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[180px_1fr]">
                <dt className="text-[13px] uppercase tracking-[0.15em] text-gold-deep">Год</dt>
                <dd>{main.year}</dd>
                <dt className="text-[13px] uppercase tracking-[0.15em] text-gold-deep">Описание</dt>
                <dd>{citation(main)}</dd>
              </dl>
              <div className="mt-6">
                <Pending>Аннотация и электронная версия монографии будут добавлены после загрузки текста.</Pending>
              </div>
            </div>
          </section>

          <section>
            <SectionTitle id="monografii" eyebrow="Книги" title="Монографии и авторские брошюры" />
            <div className="card mt-8 grid gap-6 p-6 sm:grid-cols-[150px_1fr] sm:p-8">
              <Link href="/nauka/monografiya-2015" className="block">
                <Image
                  src={M15.cover.src}
                  alt={`Обложка монографии «${M15.title}»`}
                  width={M15.cover.width}
                  height={M15.cover.height}
                  sizes="150px"
                  className="h-auto w-full max-w-[150px] border border-line"
                />
              </Link>
              <div>
                <p className="eyebrow">
                  Монография · {M15.city}, {M15.year} · полный текст
                </p>
                <h3 className="mt-2 text-[26px] leading-snug">
                  <Link href="/nauka/monografiya-2015" className="hover:text-gold-deep">
                    «{M15.title}»
                  </Link>
                </h3>
                <p className="mt-3 text-[16px]">{M15.annotation[0]}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/nauka/monografiya-2015" className="btn">
                    Читать полный текст
                  </Link>
                  <a href={M15.pdf} className="btn-ghost" target="_blank" rel="noopener">
                    PDF
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <PubList items={monographs} />
            </div>
          </section>

          <section>
            <SectionTitle id="publikacii" eyebrow="Периодика и конференции" title="Научные статьи и публикации" />
            <div className="mt-8 space-y-10">
              {groupByYear(articles).map(([year, list]) => (
                <div key={year}>
                  <h3 className="mb-3 font-display text-[28px] text-gold-deep">{year}</h3>
                  <PubList items={list} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle
              id="istoriya"
              eyebrow="Исследования"
              title="История российского ювелирного искусства"
            />
            <div className="mt-8">
              <PubList items={byNumbers(HISTORY_RESEARCH)} />
            </div>
          </section>

          <section>
            <SectionTitle id="biznes" eyebrow="Ювелирная отрасль" title="Авторские материалы по ювелирному бизнесу" />
            <div className="mt-8">
              <PubList items={byNumbers(BUSINESS_MATERIALS).sort((a, b) => a.n - b.n)} />
            </div>
          </section>

          <section>
            <SectionTitle id="bibliografiya" eyebrow="Полный перечень" title="Библиография и источники">
              <p>
                Единая библиография Дмитрия Сергеевича Дронова — {published.length} записей: научные статьи, монографии,
                учебные пособия и образовательные программы.
              </p>
            </SectionTitle>
            <div className="mt-8">
              <PubList items={published} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
