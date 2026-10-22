import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import { DISSERTATION as D } from "@/lib/data/dissertation";

export const metadata: Metadata = {
  title: `Диссертация: ${D.title}`,
  description: `${D.author}. ${D.title}. ${D.degree}. Специальность ${D.specialty}. ${D.city}, ${D.year}. Полный текст.`,
};

export default function DissertationPage() {
  return (
    <DocumentPage
      name="dissertaciya"
      kind="Диссертация на соискание учёной степени кандидата педагогических наук"
      pdf={D.pdf.dissertation}
      pdfLabel="Скачать диссертацию"
      pages={177}
      other={{ href: "/nauka/avtoreferat", label: "Автореферат" }}
    />
  );
}
