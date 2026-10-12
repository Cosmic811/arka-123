import type { Metadata } from "next";
import { siteOrigin } from "@/lib/siteOrigin";
import "@fontsource-variable/onest/index.css";
import "@fontsource/prata/cyrillic-400.css";
import "@fontsource/prata/latin-400.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteOrigin(process.env),
  title: "АРКА 123 — Встречаемся напротив Библиотеки",
  description:
    "Концепция пространства для мероприятий: 123 м², арочные окна и вид на Национальную библиотеку. Демонстрационная версия сайта вымышленной компании.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "АРКА 123 — Встреча начинается с вида",
    description:
      "123 м², арочные окна и вид на Национальную библиотеку. Пространство для мастер-классов, лекций и камерных встреч.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
