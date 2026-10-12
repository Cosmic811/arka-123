"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

export function DepthPhoto({ enabled }: { enabled: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const node = canvas.current;
    const container = node?.parentElement;
    if (!node || !container || !enabled) return;
    const preference = matchMedia(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    if (
      device.connection?.saveData ||
      (device.deviceMemory && device.deviceMemory < 4)
    )
      return;
    let cancelled = false,
      started = false;
    let dispose: (() => void) | undefined;
    let generation = 0;
    function start() {
      if (!preference.matches || started || cancelled) return;
      started = true;
      const currentGeneration = ++generation;
      import("@/lib/depthScene")
        .then(({ createDepthScene }) =>
          cancelled || !preference.matches
            ? undefined
            : createDepthScene({
                canvas: node!,
                container: container!,
                image: site.space.layouts[0].media.src!,
                depth: site.space.depth,
                onFailure: () => setReady(false),
              }),
        )
        .then((cleanup) => {
          if (
            cancelled ||
            currentGeneration !== generation ||
            !preference.matches
          )
            cleanup?.();
          else {
            dispose = cleanup;
            setReady(Boolean(cleanup));
          }
        })
        .catch(() => {
          if (!cancelled) setReady(false);
        });
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
      },
      { rootMargin: "120px" },
    );
    observer.observe(container);
    function changed() {
      if (!preference.matches) {
        generation++;
        dispose?.();
        dispose = undefined;
        started = false;
        setReady(false);
      } else start();
    }
    preference.addEventListener("change", changed);
    return () => {
      cancelled = true;
      observer.disconnect();
      preference.removeEventListener("change", changed);
      dispose?.();
    };
  }, [enabled]);
  return (
    <canvas
      ref={canvas}
      className={`depth-canvas ${ready && enabled ? "is-ready" : ""}`}
      data-render-mode={ready && enabled ? "depth" : "static"}
      aria-hidden="true"
    />
  );
}
