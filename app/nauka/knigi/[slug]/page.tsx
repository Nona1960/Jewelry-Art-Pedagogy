import type { Metadata } from "next";
import { abs, pageMeta, PERSON_LD } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { notFound } from "next/navigation";
import DocumentPage from "@/components/DocumentPage";
import { BOOKS, bookRows, getBook } from "@/lib/data/books";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BOOKS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBook(slug);
  if (!b) return {};
  return pageMeta({
    title: `${b.title} (${b.year})`,
    description: `${b.author}. ${b.title}. ${b.kind}. ${b.city}, ${b.year}. ${b.annotation[0]}`,
    path: `/nauka/knigi/${b.slug}`,
    image: { url: b.cover.src, width: b.cover.width, height: b.cover.height, alt: `Обложка книги «${b.title}»` },
    type: "book",
  });
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const b = getBook(slug);
  if (!b) notFound();
  return (
    <>
    <JsonLd
      data={{
        "@type": "Book",
        name: b.title,
        author: { "@id": PERSON_LD["@id"], "@type": "Person", name: PERSON_LD.name },
        datePublished: String(b.year),
        numberOfPages: b.pages,
        inLanguage: "ru",
        ...(b.isbn ? { isbn: b.isbn } : {}),
        ...(b.publisher ? { publisher: { "@type": "Organization", name: b.publisher } } : {}),
        image: abs(b.cover.src),
        url: abs(`/nauka/knigi/${b.slug}`),
        description: b.annotation.join(" "),
      }}
    />
    <DocumentPage
      name={b.content}
      eyebrow={`${b.kind} · ${b.city}, ${b.year}`}
      title={b.title}
      rows={bookRows(b)}
      annotation={b.annotation}
      fromSource={b.fromSource}
      crumb={{ href: "/nauka#monografii", label: "Монографии" }}
      cover={{ ...b.cover, alt: `Обложка книги Д. С. Дронова «${b.title}», ${b.year}` }}
      actions={[
        { href: b.pdf, label: `Скачать книгу · PDF, ${b.pages} с.`, primary: true, file: true },
        ...(b.analysis ? [{ href: b.analysis.href, label: b.analysis.label }] : []),
      ]}
    />
    </>
  );
}
