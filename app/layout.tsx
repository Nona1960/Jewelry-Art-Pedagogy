import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/pt-serif/400.css";
import "@fontsource/pt-serif/700.css";
import "@fontsource/pt-serif/400-italic.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Научно-образовательный проект Дмитрия Дронова, кандидата педагогических наук: авторская методология подготовки художников-ювелиров, научные труды, учебно-методическая библиотека и галерея дипломных работ.",
  keywords: [
    "педагогика ювелирного искусства",
    "Дмитрий Дронов",
    "Дронов Дмитрий Сергеевич",
    "методология обучения ювелирному искусству",
    "художник-ювелир",
    "ювелирная культура",
    "дипломные работы ювелиров",
  ],
  authors: [{ name: "Дмитрий Дронов" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.name,
    images: [{ url: "/images/dmitry-dronov-portrait.jpg", width: 964, height: 1280 }],
  },
  icons: { icon: "/icon.png", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Перейти к содержанию
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
