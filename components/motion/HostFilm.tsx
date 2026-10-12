"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";

/** Cinematic web composition: preserved RGB portrait + real room, never fake video. */
export function HostFilm() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = root.current;
    if (!target) return;
    let cancelled = false,
      started = false;
    let dispose: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        import("@/lib/hostMotion")
          .then(({ createHostMotion }) =>
            cancelled ? undefined : createHostMotion(target),
          )
          .then((cleanup) => {
            if (cancelled) cleanup?.();
            else dispose = cleanup;
          })
          .catch(() => {
            /* The complete static composition remains visible. */
          });
      },
      { rootMargin: "160px" },
    );
    observer.observe(target);
    return () => {
      cancelled = true;
      observer.disconnect();
      dispose?.();
    };
  }, []);
  return (
    <div ref={root} className="host-scene">
      <figure className="host-stage">
        <div className="host-room">
          <Image
            src={site.space.layouts[0].media.src!}
            alt="Настоящее пространство АРКА 123 с арочными окнами"
            fill
            sizes="90vw"
          />
        </div>
        <p className="host-opening" aria-hidden="true">
          {site.host.scene.opening}
        </p>
        <div className="host-person">
          <Image
            src={site.host.cutout}
            alt={site.host.portrait.alt}
            width={1600}
            height={2000}
            sizes="(max-width: 900px) 52vw, 33vw"
          />
        </div>
        <figcaption className="host-invitation">
          <span className="eyebrow">{site.host.scene.caption}</span>
          <h3>{site.host.scene.title}</h3>
          <p>{site.host.scene.description}</p>
        </figcaption>
      </figure>
    </div>
  );
}
