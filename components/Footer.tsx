import Link from "next/link";
import Image from "next/image";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const years = year > SITE.startYear ? `${SITE.startYear}–${year}` : `${year}`;
  return (
    <footer className="mt-24 bg-sand text-ink-deep">
      <div className="wrap py-14">
        <div className="mb-12 flex items-center gap-4">
          <Image src="/images/logo-sun.jpg" alt="Логотип проекта — Солнце" width={56} height={56} />
          <div>
            <p className="font-display text-[24px] leading-tight text-ink-deep">{SITE.name}</p>
            <p className="font-serif text-[12px] uppercase tracking-[0.2em] text-gold-deep">{SITE.tagline}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 border-b border-gold/50 pb-2 font-display text-[20px] text-ink-deep">{col.title}</h2>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[15px] text-ink-deep/90 transition-colors hover:text-gold-deep">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-gold/40 pt-6 text-[14px] text-ink-deep/80 sm:flex-row sm:items-center sm:justify-between">
          {SITE.email ? (
            <p>
              Электронная почта: <span className="select-all">{SITE.email}</span>
            </p>
          ) : (
            <span />
          )}
          <p>
            © {years} {SITE.copyrightHolder}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
