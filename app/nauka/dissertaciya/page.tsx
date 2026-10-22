import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import { DISSERTATION as D, dissertationRows } from "@/lib/data/dissertation";

export const metadata: Metadata = {
  title: `Диссертация: ${D.title}`,
  description: `${D.author}. ${D.title}. ${D.degree}. Специальность ${D.specialty}. ${D.city}, ${D.year}. Полный текст.`,
};

export default function DissertationPage() {
  return (
    <DocumentPage
      name="dissertaciya"
      eyebrow={`Диссертация на соискание учёной степени кандидата педагогических наук · ${D.city}, ${D.year}`}
      title={D.title}
      rows={dissertationRows}
      crumb={{ href: "/nauka#dissertaciya", label: "Диссертация" }}
      actions={[
        { href: D.pdf.dissertation, label: "Скачать диссертацию · PDF, 177 с.", primary: true, file: true },
        { href: "/nauka/avtoreferat", label: "Автореферат" },
      ]}
    />
  );
}
