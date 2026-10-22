"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-milk/95 backdrop-blur">
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Logo priority />
        <nav aria-label="Главное меню" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative py-2 font-serif text-[15px] transition-colors hover:text-ink-deep ${
                    isActive(item.href)
                      ? "text-ink-deep after:absolute after:inset-x-0 after:-bottom-[1px] after:h-px after:bg-gold"
                      : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-ink/40 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span className={`absolute left-0 top-[6px] h-px w-5 bg-ink ${open ? "opacity-0" : ""}`} />
            <span
              className={`absolute left-0 top-3 h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Главное меню" className="border-t border-line bg-milk lg:hidden">
          <ul className="wrap py-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block border-b border-line/70 py-3 font-display text-[22px] ${
                    isActive(item.href) ? "text-gold-deep" : "text-ink-deep"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
