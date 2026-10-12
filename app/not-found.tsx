import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell not-found">
      <p className="eyebrow">АРКА 123 · 404</p>
      <h1 className="section-title">Страница не найдена.</h1>
      <Link className="button button-primary" href="/">
        На главную <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
