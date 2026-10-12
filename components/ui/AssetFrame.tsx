"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { MediaAsset } from "@/content/site";

type Props = {
  asset: MediaAsset;
  className?: string;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
  as?: "figure" | "span";
};

function Content({ asset, priority, sizes }: Props) {
  const [failed, setFailed] = useState(false);
  if (asset.src && !failed) {
    return (
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes ?? "(max-width: 767px) 100vw, 75vw"}
        preload={priority}
        className="asset-image"
        style={{
          objectFit: asset.objectFit,
          objectPosition: asset.objectPosition,
        }}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span
      className="asset-placeholder"
      role="img"
      aria-label={`${asset.label}. Материал ${failed ? "недоступен" : "не предоставлен"}. Ожидаемый файл: ${asset.expectedPath}`}
    >
      <span className="asset-placeholder-center">
        <span className="asset-placeholder-label">{asset.label}</span>
        <span className="asset-placeholder-file">
          {asset.expectedPath.split("/").pop()}
        </span>
        <span className="asset-placeholder-ratio">
          {asset.width} × {asset.height}
        </span>
      </span>
      <span className="asset-placeholder-status">
        {failed ? "Материал недоступен" : "Материал не предоставлен"}
      </span>
    </span>
  );
}

export function AssetFrame({
  asset,
  className = "",
  priority = false,
  sizes,
  showCaption = false,
  as = "figure",
}: Props) {
  const Tag = as;
  return (
    <Tag
      className={`asset-frame ${className}`}
      style={
        { "--asset-ratio": `${asset.width} / ${asset.height}` } as CSSProperties
      }
    >
      <span className="asset-surface">
        <Content
          key={`${asset.id}:${asset.src}`}
          asset={asset}
          priority={priority}
          sizes={sizes}
        />
      </span>
      {showCaption && as === "figure" && (
        <figcaption className="asset-caption">
          {asset.label}
          {asset.status === "concept" ? " · Концепция" : ""}
        </figcaption>
      )}
    </Tag>
  );
}
