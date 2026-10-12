"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/content/site";
import { AssetFrame } from "@/components/ui/AssetFrame";
import { DepthPhoto } from "./DepthPhoto";

export function SpaceScene() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const layouts = site.space.layouts;
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const directions: Record<string, number> = {
      ArrowRight: (index + 1) % layouts.length,
      ArrowLeft: (index - 1 + layouts.length) % layouts.length,
      Home: 0,
      End: layouts.length - 1,
    };
    const next = directions[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }
  return (
    <div className="space-scene">
      <div className="space-toolbar">
        <div
          className="space-tabs"
          role="tablist"
          aria-label="Сценарий использования пространства"
        >
          {layouts.map((layout, index) => (
            <button
              type="button"
              key={layout.id}
              ref={(node) => {
                buttons.current[index] = node;
              }}
              id={`tab-${layout.id}`}
              role="tab"
              aria-selected={active === index}
              aria-controls="space-panel"
              tabIndex={active === index ? 0 : -1}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
              onKeyDown={(event) => navigate(event, index)}
            >
              {layout.label}
            </button>
          ))}
        </div>
        <span className="scene-mode">{site.space.sceneLabel}</span>
      </div>
      <div
        id="space-panel"
        role="tabpanel"
        aria-labelledby={`tab-${layouts[active].id}`}
        className="space-viewport"
      >
        <div className="space-plane">
          <div className="space-take" key={layouts[active].id}>
            <AssetFrame
              asset={layouts[active].media}
              sizes="(max-width: 767px) 100vw, 90vw"
            />
            {active === 0 && (
              <DepthPhoto
                key={paused ? "paused" : "running"}
                enabled={!paused}
              />
            )}
          </div>
        </div>
      </div>
      <div className="space-caption" aria-live="polite">
        <span>
          {layouts[active].concept
            ? site.space.conceptNote
            : site.space.roomCaption}
        </span>
        {active === 0 && (
          <button
            type="button"
            className="scene-pause"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? site.space.resume : site.space.pause}
          </button>
        )}
      </div>
    </div>
  );
}
