"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { library, LIB_THEMES, LIB_TYPES, type LibItem, type LibType } from "@/lib/data/library";

const PARAM_TO_TYPES: Record<string, LibType[]> = {
  posobiya: ["Учебное пособие", "Учебник"],
  programmy: ["Учебная программа"],
  metodicheskie: ["Методическая разработка", "Оценочные материалы"],
  rukovodstva: ["Практическое руководство"],
};

const ALL = "Все";

export default function LibraryCatalog() {
  const params = useSearchParams();
  const initialTypes = PARAM_TO_TYPES[params.get("tip") ?? ""] ?? [];

  const [q, setQ] = useState("");
  const [types, setTypes] = useState<LibType[]>(initialTypes);
  const [theme, setTheme] = useState<string>(ALL);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const tip = params.get("tip") ?? "";
  useEffect(() => {
    setTypes(PARAM_TO_TYPES[tip] ?? []);
  }, [tip]);

  const counts = useMemo(() => {
    const m = new Map<LibType, number>();
    library.forEach((i) => m.set(i.type, (m.get(i.type) ?? 0) + 1));
    return m;
  }, []);

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return library
      .filter((i) => (types.length ? types.includes(i.type) : true))
      .filter((i) => (theme === ALL ? true : i.theme === theme))
      .filter((i) =>
        needle
          ? `${i.title} ${i.source} ${i.level} ${i.theme} ${i.coauthors}`.toLowerCase().includes(needle)
          : true,
      )
      .sort((a, b) => {
        const d = (a.yearCreated ?? 0) - (b.yearCreated ?? 0);
        return (sort === "asc" ? d : -d) || a.title.localeCompare(b.title, "ru");
      });
  }, [q, types, theme, sort]);

  const toggleType = (t: LibType) =>
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
        <div>
          <label htmlFor="lib-search" className="eyebrow">
            Поиск
          </label>
          <input
            id="lib-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Название, дисциплина, код…"
            className="mt-3 w-full border border-ink/40 bg-white px-4 py-3 text-[15px] text-ink-deep placeholder:text-ink-soft focus:border-ink focus:outline-none"
          />
        </div>

        <fieldset>
          <legend className="eyebrow">Тип материала</legend>
          <div className="mt-3 space-y-2">
            {LIB_TYPES.map((t) => {
              const c = counts.get(t) ?? 0;
              return (
                <label
                  key={t}
                  className={`flex cursor-pointer items-center justify-between gap-3 text-[15px] ${c ? "" : "opacity-50"}`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={types.includes(t)}
                      onChange={() => toggleType(t)}
                      className="h-4 w-4 accent-[#526987]"
                    />
                    {t}
                  </span>
                  <span className="tabular-nums text-ink-soft">{c}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="lib-theme" className="eyebrow">
            Тематика
          </label>
          <select
            id="lib-theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="mt-3 w-full border border-ink/40 bg-white px-3 py-3 text-[15px] text-ink-deep focus:border-ink focus:outline-none"
          >
            <option>{ALL}</option>
            {LIB_THEMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="eyebrow">Сортировка по году</p>
          <div className="mt-3 grid grid-cols-2">
            {(["desc", "asc"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSort(s)}
                aria-pressed={sort === s}
                className={`border border-ink px-3 py-2 text-[14px] ${
                  sort === s ? "bg-ink text-white" : "bg-transparent text-ink hover:bg-white"
                } ${s === "asc" ? "-ml-px" : ""}`}
              >
                {s === "desc" ? "Сначала новые" : "Сначала ранние"}
              </button>
            ))}
          </div>
        </div>

        {(q || types.length > 0 || theme !== ALL) && (
          <button
            type="button"
            className="link text-[15px]"
            onClick={() => {
              setQ("");
              setTypes([]);
              setTheme(ALL);
            }}
          >
            Сбросить фильтры
          </button>
        )}
      </aside>

      <div className="min-w-0">
        <p className="mb-5 text-[15px] text-ink-soft" aria-live="polite">
          Найдено: <span className="text-ink-deep">{items.length}</span> из {library.length}
        </p>
        {items.length === 0 ? (
          <p className="card p-8 text-center">По заданным условиям материалов не найдено.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((i) => (
              <LibCard key={i.id} item={i} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function LibCard({ item: i }: { item: LibItem }) {
  return (
    <li className="card">
      <details className="group">
        <summary className="flex cursor-pointer list-none flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6 [&::-webkit-details-marker]:hidden">
          <div className="min-w-0">
            <p className="eyebrow">
              {i.type}
              {i.level !== "—" ? ` · ${i.level}` : ""}
            </p>
            <h3 className="mt-2 text-[26px] leading-snug group-hover:text-gold-deep">{i.title}</h3>
            {i.href && (
              <p className="mt-1 text-[13px] uppercase tracking-[0.15em] text-gold-deep">Полный текст на сайте</p>
            )}
            <p className="mt-1 text-[15px] text-ink">
              {i.author}
              {i.coauthors ? `; ${i.coauthors}` : ""}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end">
            <span className="font-display text-[30px] leading-none text-ink-deep">{i.yearCreated ?? "—"}</span>
            <span className="text-[13px] text-gold-deep">
              <span className="group-open:hidden">Подробнее +</span>
              <span className="hidden group-open:inline">Свернуть −</span>
            </span>
          </div>
        </summary>
        <div className="border-t border-line px-5 pb-6 pt-5 sm:px-6">
          <dl className="grid gap-x-8 gap-y-3 text-[15px] sm:grid-cols-[190px_1fr]">
            <dt className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Тип материала</dt>
            <dd>{i.type}</dd>
            <dt className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Тематика</dt>
            <dd>{i.theme}</dd>
            <dt className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Год создания</dt>
            <dd>{i.yearCreated ?? "—"}</dd>
            <dt className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Год обновления</dt>
            <dd>{i.yearUpdated ?? "Обновлённая редакция готовится к публикации"}</dd>
            <dt className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Выходные данные</dt>
            <dd>{i.source}</dd>
            <dt className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Аннотация</dt>
            <dd className={i.annotation ? "" : "italic text-ink-soft"}>{i.annotation ?? "Будет добавлена"}</dd>
            <dt className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Содержание</dt>
            <dd>
              {i.contents?.length ? (
                <ol className="list-decimal pl-5">
                  {i.contents.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ol>
              ) : (
                <span className="italic text-ink-soft">Будет добавлено</span>
              )}
            </dd>
            <dt className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Электронная версия</dt>
            <dd>
              {i.href ? (
                <a href={i.href} className="btn mt-1 px-4 py-2">
                  Читать полный текст
                </a>
              ) : i.file ? (
                <a href={i.file} className="btn mt-1 px-4 py-2" target="_blank" rel="noopener">
                  Открыть PDF
                </a>
              ) : (
                <span className="italic text-ink-soft">Готовится к размещению</span>
              )}
            </dd>
          </dl>
        </div>
      </details>
    </li>
  );
}
