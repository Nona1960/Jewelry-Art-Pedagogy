import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHeader, WorkCard } from "@/components/ui";
import { works } from "@/lib/data/gallery";

export const metadata: Metadata = pageMeta({
  title: "Галерея дипломных работ",
  description:
    "Дипломные ювелирные произведения студентов, выполненные под руководством Дмитрия Дронова от эскиза до полного воплощения в материале.",
  path: "/galereya",
  image: { url: "/images/works/work-05.jpg", width: 1522, height: 1268, alt: "Колье «Трепет в летнем саду», дипломная работа" },
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Галерея"
        title="Дипломные ювелирные произведения"
        lead={
          <>
            <p>
              Работы выполнены студентами полностью под руководством Дмитрия Дронова — от эскизов до полного воплощения в
              материале. Галерея демонстрирует результаты педагогической деятельности и практическое воплощение авторских
              образовательных подходов.
            </p>
            <p className="mt-4 font-display text-[22px] italic text-gold-deep">
              Руководитель дипломных проектов — Дмитрий Дронов
            </p>
          </>
        }
      />
      <section>
        <div className="wrap py-16">
          <h2 className="sr-only">Дипломные работы</h2>
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((w, i) => (
              <WorkCard key={w.slug} w={w} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
