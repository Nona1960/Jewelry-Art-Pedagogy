import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui";
import LibraryCatalog from "@/components/LibraryCatalog";

export const metadata: Metadata = {
  title: "Библиотека",
  description:
    "Электронная библиотека учебно-методических трудов Дмитрия Дронова: учебные пособия, учебные программы, методические разработки по ювелирному искусству.",
};

export default function LibraryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Электронная библиотека"
        title="Библиотека"
        lead={
          <>
            <p>
              Электронная библиотека оригинальных учебно-методических трудов Дмитрия Дронова: авторские учебные
              пособия, учебные программы, методические разработки и практические руководства.
            </p>
            <p className="mt-4">
              Все материалы разработаны Дмитрием Дроновым. Их обновлённые редакции отражают дальнейшее развитие авторской
              педагогической системы и учитывают современные требования к подготовке художников-ювелиров.
            </p>
          </>
        }
      />
      <div className="wrap py-14">
        <Suspense fallback={<p>Загрузка каталога…</p>}>
          <LibraryCatalog />
        </Suspense>
      </div>
    </>
  );
}
