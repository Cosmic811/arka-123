import Image from "next/image";
import { site } from "@/content/site";
import { publicAsset } from "@/lib/publicAsset";
import { BrandMark } from "./BrandMark";

export function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#top"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="АРКА 123 — в начало страницы"
    >
      {site.logo.src ? (
        <>
          <BrandMark />
          <Image
            src={publicAsset("/brand/arka-wordmark.png")}
            alt={site.name}
            width={1887}
            height={321}
            className="brand-wordmark"
            sizes="112px"
          />
        </>
      ) : (
        <span className="brand-text">{site.name}</span>
      )}
    </a>
  );
}
