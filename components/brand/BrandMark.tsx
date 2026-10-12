import Image from "next/image";
import { publicAsset } from "@/lib/publicAsset";

/** Complementary masks reveal the supplied raster; no geometry is redrawn. */
export function BrandMark({ entrance = false }: { entrance?: boolean }) {
  return (
    <span
      className={`brand-mark ${entrance ? "brand-mark-entrance" : ""}`}
      aria-hidden="true"
    >
      <Image
        src={publicAsset("/brand/arka-mark.png")}
        width={678}
        height={769}
        alt=""
        className="brand-mark-outline"
        sizes="96px"
      />
      <Image
        src={publicAsset("/brand/arka-mark.png")}
        width={678}
        height={769}
        alt=""
        className="brand-mark-digits"
        sizes="96px"
      />
    </span>
  );
}
