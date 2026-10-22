import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { directions } from "@/lib/data/methodology";
import { works } from "@/lib/data/gallery";
import { library } from "@/lib/data/library";
import { articles, byNumbers, monographs, MAIN_MONOGRAPH } from "@/lib/data/bibliography";
import { PubList, SectionTitle, WorkCard } from "@/components/ui";

export default function Home() {
  const selected = byNumbers([97, 89, MAIN_MONOGRAPH, 45]);
  return (
    <>
      {/* Первый экран */}
      <section className="border-b border-line">
        <div className="wrap grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow">{SITE.motto}</p>
            <h1 className="mt-5 text-[46px] leading-[1.05] sm:text-[68px] lg:text-[76px]">{SITE.name}</h1>
            <p className="mt-4 font-display text-[26px] italic text-gold-deep sm:text-[30px]">{SITE.tagline}</p>
            <div className="rule mt-7" />
            <p className="mt-7 max-w-xl text-[18px]">
              Научно-образовательный проект, представляющий оригинальные исследования, авторские учебно-методические
              труды и педагогическую практику Дмитрия Дронова.
            </p>
            <p className="mt-4 max-w-xl text-[18px]">
              В основе проекта — комплексный подход к подготовке художников-ювелиров, объединяющий художественное
              мышление, историко-культурное знание, проектирование и практическое мастерство.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/metodologiya" className="btn">
                Методология
              </Link>
              <Link href="/galereya" className="btn-ghost">
                Галерея дипломных работ
              </Link>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[440px] lg:max-w-none">
            <Image
              src="/images/dmitry-dronov-portrait.jpg"
              alt="Дмитрий Сергеевич Дронов, кандидат педагогических наук, автор методологии обучения ручному ювелирному искусству"
              width={964}
              height={1280}
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="w-full"
            />
            <figcaption className="mt-3 text-[14px] text-ink-soft">
              Дмитрий Сергеевич Дронов — кандидат педагогических наук, автор методологии обучения ручному ювелирному
              искусству
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Концепция и автор */}
      <section id="koncepciya" className="scroll-mt-24">
        <div className="wrap grid gap-12 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle eyebrow="Назначение проекта" title="Концепция" />
            <div className="prose-academic mt-6 text-[17px]">
              <p>
                «Педагогика ювелирного искусства» — авторский научно-образовательный проект Дмитрия Дронова, кандидата
                педагогических наук, посвящённый развитию методологии профессиональной подготовки художников-ювелиров.
              </p>
              <p>
                Проект объединяет оригинальные научные исследования, созданные им учебные пособия, авторские
                образовательные программы, методические разработки и результаты педагогической деятельности.
              </p>
              <p>
                Все представленные учебные пособия и методические разработки созданы Дмитрием Дроновым самостоятельно и
                впоследствии переработаны и актуализированы им с учётом современных требований к профессиональному
                художественному образованию, развития ювелирных технологий и изменений образовательной практики.
              </p>
            </div>
          </div>
          <div className="card self-start p-8 sm:p-10">
            <p className="eyebrow">Автор методологии</p>
            <h3 className="mt-2 text-[34px]">Дмитрий Дронов</h3>
            <ul className="mt-6 space-y-3 text-[16px]">
              {[
                "Кандидат педагогических наук",
                "Член Союза художников РФ",
                "Член Экспертного совета при НГЦ",
                "Исследователь ювелирной культуры",
                "Автор научных трудов, учебных пособий, образовательных программ и методических разработок",
                "Преподаватель и руководитель дипломных проектов художников-ювелиров",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-[11px] h-[5px] w-[5px] shrink-0 bg-gold" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/avtor" className="btn-ghost mt-8">
              Об авторе
            </Link>
          </div>
        </div>
      </section>

      {/* Направления методологии */}
      <section className="border-y border-line bg-white/50">
        <div className="wrap py-20">
          <SectionTitle eyebrow="Методология" title="Основные направления">
            <p>
              Методология развивается на основе оригинальных научных исследований, авторских образовательных программ и
              многолетнего педагогического опыта Дмитрия Дронова.
            </p>
          </SectionTitle>
          <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {directions.map((d) => (
              <li key={d.id} className="bg-milk">
                <Link
                  href={`/metodologiya#${d.id}`}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-white"
                >
                  <span className="font-display text-[36px] leading-none text-gold">{d.num}</span>
                  <span className="mt-4 font-display text-[22px] leading-snug text-ink-deep group-hover:text-gold-deep">
                    {d.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Избранные научные труды */}
      <section>
        <div className="wrap grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle eyebrow="Наука" title="Избранные научные труды">
              <p>Кандидатская диссертация, монографии, научные статьи и доклады международных конференций.</p>
            </SectionTitle>
            <dl className="mt-8 grid max-w-sm grid-cols-2 gap-px border border-line bg-line">
              <div className="bg-milk p-5">
                <dt className="text-[13px] uppercase tracking-[0.15em] text-gold-deep">Монографии</dt>
                <dd className="font-display text-[44px] leading-none text-ink-deep">{monographs.length}</dd>
              </div>
              <div className="bg-milk p-5">
                <dt className="text-[13px] uppercase tracking-[0.15em] text-gold-deep">Статьи</dt>
                <dd className="font-display text-[44px] leading-none text-ink-deep">{articles.length}</dd>
              </div>
            </dl>
            <Link href="/nauka" className="btn mt-8">
              Все научные труды
            </Link>
          </div>
          <PubList items={selected} />
        </div>
      </section>

      {/* Библиотека */}
      <section className="bg-ink text-white">
        <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-serif text-[12px] uppercase tracking-[0.22em] text-sand">Электронная библиотека</p>
            <h2 className="mt-3 text-[36px] text-white sm:text-[44px]">Учебно-методические труды</h2>
            <p className="mt-4 max-w-2xl text-[17px] text-white/85">
              Авторские учебные пособия, учебные программы, методические разработки и практические руководства — каталог
              из {library.length} позиций с поиском, тематическими фильтрами и сортировкой по году.
            </p>
          </div>
          <Link
            href="/biblioteka"
            className="inline-flex items-center justify-center border border-white px-6 py-3 font-serif text-[15px] tracking-wide text-white transition-colors hover:bg-white hover:text-ink"
          >
            Открыть библиотеку
          </Link>
        </div>
      </section>

      {/* Галерея */}
      <section>
        <div className="wrap py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Галерея" title="Дипломные ювелирные произведения">
              <p>
                Работы выполнены студентами полностью под руководством Дмитрия Дронова — от эскизов до воплощения в
                материале.
              </p>
            </SectionTitle>
            <Link href="/galereya" className="btn-ghost">
              Вся галерея
            </Link>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {works.slice(0, 3).map((w) => (
              <WorkCard key={w.slug} w={w} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
