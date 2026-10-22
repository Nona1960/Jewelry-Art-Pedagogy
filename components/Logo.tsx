import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

/** Логотип — «семейное Солнце», всегда квадратный, без скруглений. */
export default function Logo({ size = 44, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={SITE.name}>
      <Image
        src="/images/logo-sun.jpg"
        alt="Логотип проекта — Солнце"
        width={size}
        height={size}
        className="shrink-0"
        priority
      />
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[20px] font-medium text-ink-deep sm:text-[22px]">
            {SITE.name}
          </span>
          <span className="mt-1 hidden font-serif text-[11px] uppercase tracking-[0.2em] text-gold-deep sm:block">
            {SITE.tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
