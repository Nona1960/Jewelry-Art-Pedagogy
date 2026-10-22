# Jewelry-Art-Pedagogy
Scientific and educational website dedicated to the original methodology of Dmitry Sergeevich Dronov, PhD in Pedagogical Sciences. Featuring academic research, scholarly publications, educational resources, and artistic practice in jewelry arts.

---

Авторская методология Дмитрия Дронова. Научно-образовательный сайт: Next.js 15, TypeScript, Tailwind CSS, размещение на Vercel.

## Разделы
Главная · Автор методологии · Методология · Наука · Библиотека · Галерея

## Где лежат данные
- `lib/data/bibliography.json` — единая библиография (97 записей; раздел IV «требует сверки» скрыт, флаг `SHOW_UNVERIFIED` в `bibliography.ts`)
- `lib/data/library.ts` — каталог библиотеки (поля `annotation`, `contents`, `file`, `yearUpdated` заполняются по мере загрузки)
- `lib/data/gallery.ts` — дипломные работы
- `lib/data/methodology.ts` — восемь направлений методологии
- `lib/site.ts` — меню, подвал, e-mail (поле `email`)

## Запуск
```
npm install
npm run dev
```
