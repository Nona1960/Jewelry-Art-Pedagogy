import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import { MONOGRAPH_2015 as M, monograph2015Rows } from "@/lib/data/monograph2015";

export const metadata: Metadata = {
  title: `Монография: ${M.title}`,
  description: `${M.author}. ${M.title}. Монография. ${M.city}, ${M.year}. ISBN ${M.isbn}. Полный текст.`,
  openGraph: { images: [{ url: M.cover.src, width: M.cover.width, height: M.cover.height }] },
};

export default function Monograph2015Page() {
  return (
    <DocumentPage
      name="monografiya"
      eyebrow={`${M.kind} · ${M.city}, ${M.year}`}
      title={M.title}
      rows={monograph2015Rows}
      annotation={M.annotation}
      crumb={{ href: "/nauka#monografii", label: "Монографии" }}
      cover={{ ...M.cover, alt: `Обложка монографии Д. С. Дронова «${M.title}», ${M.year}` }}
      actions={[
        { href: M.pdf, label: `Скачать монографию · PDF, ${M.pages} с.`, primary: true, file: true },
        { href: "/nauka/dissertaciya", label: "Кандидатская диссертация" },
      ]}
    />
  );
}
