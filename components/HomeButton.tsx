"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Кнопка «На главную» в конце каждой страницы, кроме самой главной. */
export default function HomeButton() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <nav aria-label="Возврат на главную" className="wrap mt-16 flex flex-wrap items-center justify-center gap-3 border-t border-line pt-10">
      <Link href="/" className="btn min-h-11">
        <span aria-hidden="true">←</span> На главную
      </Link>
      <a href="#main" className="btn-ghost min-h-11">
        <span aria-hidden="true">↑</span> Наверх
      </a>
    </nav>
  );
}
