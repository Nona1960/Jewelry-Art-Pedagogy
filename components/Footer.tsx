import Link from "next/link";
import Logo from "./Logo";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const years = year > SITE.startYear ? `${SITE.startYear}–${year}` : `${year}`;
  return (
    <footer className="mt-24 bg-sand text-ink-deep">
      <div className="wrap py-14">
        <div className="mb-12">
          <Logo width={96} tone="footer" />
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 border-b border-gold/50 pb-2 font-display text-[20px] text-ink-deep">{col.title}</h2>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[15px] text-ink-deep transition-colors hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-gold/40 pt-6 text-[14px] text-ink-deep sm:flex-row sm:items-center sm:justify-between">
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
