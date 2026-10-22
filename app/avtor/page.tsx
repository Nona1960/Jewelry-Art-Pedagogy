import type { Metadata } from "next";
import { pageMeta, PERSON_LD } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Image from "next/image";
import Link from "next/link";
import { PageHeader, SectionTitle } from "@/components/ui";
import { articles, monographs, teaching } from "@/lib/data/bibliography";
import { works } from "@/lib/data/gallery";

export const metadata: Metadata = pageMeta({
  title: "Автор методологии — Дмитрий Сергеевич Дронов",
  description:
    "Дронов Дмитрий Сергеевич — кандидат педагогических наук, автор методологии обучения ручному ювелирному искусству, член Союза художников России, исследователь ювелирной культуры.",
  path: "/avtor",
  type: "profile",
});

const facts = [
  "Кандидат педагогических наук.",
  "Член Союза художников РФ.",
  "Член Экспертного совета при НГЦ.",
  "Исследователь ювелирной культуры.",
  "Автор научных трудов, учебных пособий, образовательных программ и методических разработок.",
  "Преподаватель и руководитель дипломных проектов художников-ювелиров.",
];

export default function AuthorPage() {
  return (
    <>
      <JsonLd data={{ ...PERSON_LD, "@type": "Person" }} />
      <PageHeader
        eyebrow="Автор методологии"
        title="Дмитрий Сергеевич Дронов"
        lead={
          <p>
            Кандидат педагогических наук, автор методологии обучения ручному ювелирному искусству, исследователь
            ювелирной культуры.
          </p>
        }
      />

      <section>
        <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <figure>
            <Image
              src="/images/dmitry-dronov-workshop.jpg"
              alt="Дмитрий Дронов за ювелирным верстаком"
              width={1600}
              height={1063}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="w-full"
              priority
            />
            <figcaption className="mt-3 text-[14px] text-ink-soft">Дмитрий Дронов за ювелирным верстаком</figcaption>
          </figure>
          <div>
            <SectionTitle eyebrow="Научная биография" title="Об авторе" />
            <ul className="mt-6 space-y-3 text-[17px]">
              {facts.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-[12px] h-[5px] w-[5px] shrink-0 bg-gold" />
                  {t}
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid grid-cols-3 gap-px border border-line bg-line">
              {[
                { k: "Монографии", v: monographs.length },
                { k: "Статьи", v: articles.length },
                { k: "Программы и пособия", v: teaching.length },
              ].map((s) => (
                <div key={s.k} className="flex flex-col-reverse justify-end bg-milk p-4">
                  <dt className="mt-2 text-[12px] uppercase leading-snug tracking-[0.12em] text-gold-deep">{s.k}</dt>
                  <dd className="font-display text-[38px] leading-none text-ink-deep">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white/50">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle eyebrow="Педагогическая деятельность" title="Вклад в профессиональное образование" />
            <div className="prose-academic mt-6">
              <p>
                Дмитрий Дронов — автор методологии обучения ручному ювелирному искусству, рабочих учебных программ для
                среднего профессионального и высшего образования (специальность 54.02.02, направления 54.03.02 и
                50.03.04), учебника и методических пособий для преподавателей.
              </p>
              <p>
                Как руководитель дипломных проектов он ведёт студентов от первого эскиза до полного воплощения изделия в
                материале. Результаты этой работы представлены в{" "}
                <Link href="/galereya" className="link">
                  галерее дипломных произведений
                </Link>{" "}
                — {works.length} работ 2020 года.
              </p>
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Ювелирная индустрия" title="Профессиональная деятельность" />
            <div className="prose-academic mt-6">
              <p>
                Наряду с научной, педагогической и художественной деятельностью Дмитрий Сергеевич активно участвует в
                развитии профессиональных коммуникаций в ювелирной отрасли.
              </p>
              <p>
                Он курирует работу департамента по связям с общественностью ювелирного холдинга SUNLIGHT и ведёт
                авторский блог «Академия бриллиантов» на сайте бренда.
              </p>
              <p>
                В своих публикациях Дмитрий Сергеевич обращается к вопросам ювелирного искусства, драгоценных камней,
                профессиональных знаний и культуры потребления ювелирных изделий.
              </p>
              <p>
                Эта деятельность объединяет его научные интересы с практикой современной ювелирной индустрии и
                способствует популяризации профессиональных знаний среди широкой аудитории.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap flex flex-wrap gap-3 py-14">
          <Link href="/metodologiya" className="btn">
            Методология
          </Link>
          <Link href="/nauka" className="btn-ghost">
            Научные труды
          </Link>
          <Link href="/biblioteka" className="btn-ghost">
            Библиотека
          </Link>
        </div>
      </section>
    </>
  );
}
