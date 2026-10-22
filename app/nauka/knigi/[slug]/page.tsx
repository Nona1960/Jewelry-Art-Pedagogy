import type { Metadata } from "next";
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
  return {
    title: `${b.kind}: ${b.title}`,
    description: `${b.author}. ${b.title}. ${b.kind}. ${b.city}, ${b.year}. Полный текст.`,
    openGraph: { images: [{ url: b.cover.src, width: b.cover.width, height: b.cover.height }] },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const b = getBook(slug);
  if (!b) notFound();
  return (
    <DocumentPage
      name={b.content}
      eyebrow={`${b.kind} · ${b.city}, ${b.year}`}
      title={b.title}
      rows={bookRows(b)}
      annotation={b.annotation}
      crumb={{ href: "/nauka#monografii", label: "Монографии" }}
      cover={{ ...b.cover, alt: `Обложка книги Д. С. Дронова «${b.title}», ${b.year}` }}
      actions={[{ href: b.pdf, label: `Скачать книгу · PDF, ${b.pages} с.`, primary: true, file: true }]}
    />
  );
}
