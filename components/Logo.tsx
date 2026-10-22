import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

/** Логотип — «семейное Солнце», прямоугольный (4:3), без скруглений и рамок. */
export default function Logo({
  width = 60,
  withText = true,
  priority = false,
  tone = "header",
}: {
  width?: number;
  withText?: boolean;
  priority?: boolean;
  tone?: "header" | "footer";
}) {
  const height = Math.round((width * 3) / 4);
  return (
    <Link
      href="/"
      className="group flex min-h-11 items-center gap-3"
      aria-label={`${SITE.name} — на главную`}
    >
      <Image
        src="/images/logo-sun-rect.jpg"
        alt=""
        width={width}
        height={height}
        className="shrink-0"
        style={{ width, height }}
        priority={priority}
      />
      {withText && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display font-medium text-ink-deep ${tone === "footer" ? "text-[24px]" : "text-[19px] sm:text-[22px]"}`}
          >
            {SITE.name}
          </span>
          <span
            className={`mt-1 font-serif uppercase tracking-[0.2em] ${tone === "footer" ? "text-ink-deep" : "text-gold-deep"} ${tone === "footer" ? "block text-[12px]" : "hidden text-[11px] sm:block"}`}
          >
            {SITE.tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
