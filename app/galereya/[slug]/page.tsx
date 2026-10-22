import type { Metadata } from "next";
import { abs, pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork, works } from "@/lib/data/gallery";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return {};
  return pageMeta({
    title: `«${w.title}» — ${w.student}, ${w.year}`,
    description: `${w.kind} «${w.title}», ${w.student}, ${w.year}. Дипломная работа, руководитель ${w.supervisor}. Техники: ${w.techniques.join(", ")}. Материалы: ${w.materials.join(", ")}.`,
    path: `/galereya/${w.slug}`,
    image: { url: w.image, width: w.width, height: w.height, alt: `${w.kind} «${w.title}»` },
    type: "article",
  });
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();
  const idx = works.findIndex((x) => x.slug === w.slug);
  const prev = works[(idx - 1 + works.length) % works.length];
  const next = works[(idx + 1) % works.length];

  const rows: [string, React.ReactNode][] = [
    ["Автор произведения", w.student],
    ["Год создания", w.year],
    ["Техники", w.techniques.join(", ")],
    ["Закрепка камней", w.stoneSetting.join(", ")],
    ["Материалы", w.materials.join(", ")],
    ["Руководитель дипломного проекта", w.supervisor],
  ];

  return (
    <article>
      <JsonLd
        data={{
          "@type": "VisualArtwork",
          name: `${w.kind} «${w.title}»`,
          creator: { "@type": "Person", name: w.student },
          dateCreated: String(w.year),
          artMedium: w.materials.join(", "),
          artform: "Ювелирное искусство",
          image: abs(w.image),
          url: abs(`/galereya/${w.slug}`),
          description: `Дипломная работа. Руководитель ${w.supervisor}. Техники: ${w.techniques.join(", ")}.`,
        }}
      />
      <div className="wrap pt-10">
        <nav aria-label="Навигация" className="text-[14px] text-ink-soft">
          <Link href="/galereya" className="link">
            Галерея
          </Link>
          <span className="mx-2">/</span>
          <span>«{w.title}»</span>
        </nav>
      </div>
      <div className="wrap grid gap-12 py-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <figure className="bg-white">
          <Image
            src={w.image}
            alt={`${w.kind} «${w.title}», ${w.student}, ${w.year}. Руководитель Д. С. Дронов`}
            width={w.width}
            height={w.height}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="w-full"
            priority
          />
        </figure>
        <div>
          <p className="eyebrow">
            {w.kind} · {w.year}
          </p>
          <h1 className="mt-3 text-[42px] sm:text-[52px]">«{w.title}»</h1>
          <div className="rule mt-5" />
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {rows.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-4 sm:grid-cols-[170px_1fr] sm:gap-6">
                <dt className="text-[12px] uppercase leading-relaxed tracking-[0.15em] text-gold-deep">{k}</dt>
                <dd className="text-[16px] text-ink-deep">{v}</dd>
              </div>
            ))}
          </dl>
          {w.concept && <p className="mt-8 text-[17px]">{w.concept}</p>}
          <p className="mt-8 text-[15px] italic text-ink">
            Работа выполнена полностью под руководством Дмитрия Дронова — от эскизов до полного воплощения в материале.
          </p>
        </div>
      </div>
      <nav aria-label="Другие работы" className="wrap">
        <div className="grid grid-cols-2 border-t border-line">
          <Link href={`/galereya/${prev.slug}`} className="group py-6 pr-4">
            <span className="eyebrow">← Предыдущая</span>
            <span className="mt-1 block font-display text-[22px] text-ink-deep group-hover:text-gold-deep">
              «{prev.title}»
            </span>
          </Link>
          <Link href={`/galereya/${next.slug}`} className="group border-l border-line py-6 pl-4 text-right">
            <span className="eyebrow">Следующая →</span>
            <span className="mt-1 block font-display text-[22px] text-ink-deep group-hover:text-gold-deep">
              «{next.title}»
            </span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
