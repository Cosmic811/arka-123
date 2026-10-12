"use client";

import { useRef, useState } from "react";
import { site } from "@/content/site";
import { AssetFrame } from "@/components/ui/AssetFrame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

export function Gallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const items = site.gallery.items;
  useBodyScrollLock(open);
  function show(next: number) {
    setIndex(next);
    dialog.current?.showModal();
    setOpen(true);
  }
  function close() {
    dialog.current?.close();
  }
  function move(direction: number) {
    setIndex(
      (previous) => (previous + direction + items.length) % items.length,
    );
  }
  return (
    <section
      id="gallery"
      className="section shell gallery"
      aria-labelledby="gallery-title"
    >
      <div className="gallery-heading" data-reveal>
        <div>
          <SectionLabel number="05">Фотогалерея</SectionLabel>
          <h2 id="gallery-title" className="section-title">
            {site.gallery.title}
          </h2>
        </div>
        <p className="gallery-hint">Общий вид · окна · детали</p>
      </div>
      <div className="gallery-grid">
        {items.map((asset, itemIndex) => (
          <div
            key={asset.id}
            className={`gallery-item gallery-item-${itemIndex + 1}`}
            data-reveal
          >
            <button
              className="gallery-trigger"
              type="button"
              onClick={() => show(itemIndex)}
              aria-label={`Открыть: ${asset.label}`}
            >
              <AssetFrame
                as="span"
                asset={asset}
                sizes="(max-width: 767px) 100vw, 50vw"
              />
              <span className="gallery-open" aria-hidden="true">
                ↗
              </span>
            </button>
            <div className="gallery-item-caption">
              <span>{asset.label}</span>
              <span>0{itemIndex + 1}</span>
            </div>
          </div>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        aria-labelledby="gallery-dialog-title"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <div className="gallery-dialog-inner">
          <div className="gallery-dialog-top">
            <h3 id="gallery-dialog-title">{items[index].label}</h3>
            <button type="button" className="text-button" onClick={close}>
              Закрыть <span aria-hidden="true">×</span>
            </button>
          </div>
          <AssetFrame
            asset={items[index]}
            className="gallery-dialog-media"
            sizes="90vw"
          />
          <div className="gallery-dialog-controls">
            <button
              type="button"
              className="text-button"
              aria-label="Предыдущая фотография"
              onClick={() => move(-1)}
            >
              ← <span>Назад</span>
            </button>
            <span aria-live="polite">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              className="text-button"
              aria-label="Следующая фотография"
              onClick={() => move(1)}
            >
              <span>Далее</span> →
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
