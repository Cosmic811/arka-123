"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { BrandMark } from "@/components/brand/BrandMark";

/** Finite CSS timeline; content needs neither JS nor video. */
export function Preloader() {
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const ready = () => {
      if (!cancelled) setComplete(true);
    };
    document.fonts.ready.then(() => {
      if (document.readyState === "complete") ready();
      else window.addEventListener("load", ready, { once: true });
    });
    return () => {
      cancelled = true;
      window.removeEventListener("load", ready);
    };
  }, []);
  return (
    <div
      className={`preloader ${complete ? "preloader-complete" : ""}`}
      aria-hidden="true"
    >
      <div className="preloader-inner">
        <BrandMark entrance />
        <div className="preloader-line" />
        <span className="preloader-caption">{site.slogan}</span>
      </div>
    </div>
  );
}
