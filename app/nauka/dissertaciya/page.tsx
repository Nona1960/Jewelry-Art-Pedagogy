import type { Metadata } from "next";
import { abs, pageMeta, PERSON_LD } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import DocumentPage from "@/components/DocumentPage";
import { DISSERTATION as D, dissertationRows } from "@/lib/data/dissertation";

export const metadata: Metadata = pageMeta({
  title: `Диссертация: ${D.title}`,
  description: `${D.author}. ${D.title}. ${D.degree}. Специальность ${D.specialty}. ${D.city}, ${D.year}. Полный текст.`,
  path: "/nauka/dissertaciya",
  type: "article",
});

export default function DissertationPage() {
  return (
    <>
    <JsonLd
      data={{
        "@type": "Thesis",
        name: D.title,
        author: { "@id": PERSON_LD["@id"], "@type": "Person", name: PERSON_LD.name },
        datePublished: String(D.year),
        inSupportOf: "Кандидат педагогических наук (13.00.08)",
        sourceOrganization: { "@type": "Organization", name: D.institution },
        inLanguage: "ru",
        url: abs("/nauka/dissertaciya"),
        description: D.annotation.join(" "),
      }}
    />
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
    </>
  );
}
