import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import { DISSERTATION as D, dissertationRows } from "@/lib/data/dissertation";

export const metadata: Metadata = {
  title: `Автореферат диссертации: ${D.title}`,
  description: `${D.author}. ${D.title}. Автореферат диссертации на соискание учёной степени кандидата педагогических наук. ${D.city}, ${D.year}. Полный текст.`,
};

export default function AvtoreferatPage() {
  return (
    <DocumentPage
      name="avtoreferat"
      eyebrow={`Автореферат диссертации · ${D.city}, ${D.year}`}
      title={D.title}
      rows={dissertationRows}
      crumb={{ href: "/nauka#dissertaciya", label: "Диссертация" }}
      actions={[
        { href: D.pdf.avtoreferat, label: "Скачать автореферат · PDF, 24 с.", primary: true, file: true },
        { href: "/nauka/dissertaciya", label: "Полный текст диссертации" },
      ]}
    />
  );
}
