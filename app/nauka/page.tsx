import type { Metadata } from "next";
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
              <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[180px_1fr]">
                <dt className="text-[13px] uppercase tracking-[0.15em] text-gold-deep">Автор</dt>
                <dd>Дронов Дмитрий Сергеевич</dd>
                <dt className="text-[13px] uppercase tracking-[0.15em] text-gold-deep">Степень</dt>
                <dd>Кандидат педагогических наук</dd>
              </dl>
              <div className="mt-6">
                <Pending>
                  Аннотация, библиографическое описание и электронная версия диссертации будут размещены после загрузки
                  текста.
                </Pending>
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
            <div className="mt-8">
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
