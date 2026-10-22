import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-28 text-center">
      <p className="eyebrow">Ошибка 404</p>
      <h1 className="mt-4 text-[48px]">Страница не найдена</h1>
      <Link href="/" className="btn mt-10">
        На главную
      </Link>
    </div>
  );
}
