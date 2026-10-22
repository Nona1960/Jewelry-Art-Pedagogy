import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import { DISSERTATION as D } from "@/lib/data/dissertation";

export const metadata: Metadata = {
  title: `Автореферат диссертации: ${D.title}`,
  description: `${D.author}. ${D.title}. Автореферат диссертации на соискание учёной степени кандидата педагогических наук. ${D.city}, ${D.year}. Полный текст.`,
};

export default function AvtoreferatPage() {
  return (
    <DocumentPage
      name="avtoreferat"
      kind="Автореферат диссертации"
      pdf={D.pdf.avtoreferat}
      pdfLabel="Скачать автореферат"
      pages={24}
      other={{ href: "/nauka/dissertaciya", label: "Полный текст диссертации" }}
    />
  );
}
