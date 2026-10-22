import Image from "next/image";
import Link from "next/link";
import { authorsLine, type BibEntry } from "@/lib/data/bibliography";
import type { Work } from "@/lib/data/gallery";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="wrap py-14 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-[44px] sm:text-[60px]">{title}</h1>
        <div className="rule mt-6" />
        {lead && <div className="mt-6 max-w-3xl text-[18px] text-ink">{lead}</div>}
      </div>
    </section>
  );
}

export function SectionTitle({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-[34px] sm:text-[42px]">{title}</h2>
      <div className="rule mt-4" />
      {children && <div className="mt-5 max-w-3xl">{children}</div>}
    </div>
  );
}

/** Библиографическая запись в академическом оформлении */
export function PubItem({ b, showNumber = true }: { b: BibEntry; showNumber?: boolean }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-line py-4 last:border-b-0">
      <span className="w-8 pt-[2px] text-right font-display text-[18px] text-gold-deep tabular-nums">
        {showNumber ? b.n : ""}
      </span>
      <div>
        <p className="text-[16px] leading-relaxed">
          <span className="text-ink-soft">{authorsLine(b)}.</span>{" "}
          <span className="text-ink-deep">{b.title}</span>
          <span className="text-ink"> — {b.source}.</span>
        </p>
      </div>
    </li>
  );
}

export function PubList({ items, showNumber = true }: { items: BibEntry[]; showNumber?: boolean }) {
  return (
    <ol className="card px-4 sm:px-6">
      {items.map((b) => (
        <PubItem key={b.n} b={b} showNumber={showNumber} />
      ))}
    </ol>
  );
}

export function WorkCard({ w, priority = false }: { w: Work; priority?: boolean }) {
  return (
    <Link href={`/galereya/${w.slug}`} className="group block">
      <div className="overflow-hidden bg-white">
        <Image
          src={w.image}
          alt={`${w.kind} «${w.title}», ${w.student}, ${w.year}. Руководитель Д. С. Дронов`}
          width={w.width}
          height={w.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[6/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          priority={priority}
        />
      </div>
      <div className="pt-4">
        <p className="eyebrow">
          {w.kind} · {w.year}
        </p>
        <h3 className="mt-1 text-[26px] transition-colors group-hover:text-gold-deep">«{w.title}»</h3>
        <p className="mt-1 text-[15px] text-ink">
          {w.student} · руководитель {w.supervisor}
        </p>
      </div>
    </Link>
  );
}

export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-gold/60 bg-sand/30 px-4 py-3 text-[15px] italic text-ink">{children}</p>
  );
}
