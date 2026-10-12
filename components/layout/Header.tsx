"use client";

import { useRef, useState } from "react";
import { site } from "@/content/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Arrow } from "@/components/ui/Arrow";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useBodyScrollLock(open);
  function openMenu() {
    dialog.current?.showModal();
    setOpen(true);
  }
  function closeMenu() {
    dialog.current?.close();
  }
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <BrandLogo />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {site.navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#inquiry">
          Обсудить аренду <Arrow diagonal />
        </a>
        <button
          className="menu-trigger"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={openMenu}
        >
          Меню <span aria-hidden="true">☰</span>
        </button>
      </div>
      <noscript>
        <nav
          className="no-script-nav shell"
          aria-label="Навигация без JavaScript"
        >
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </noscript>
      <dialog
        id="mobile-navigation"
        ref={dialog}
        className="menu-dialog"
        aria-labelledby="menu-title"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className="menu-panel">
          <div className="menu-top">
            <p id="menu-title">Навигация</p>
            <button type="button" className="text-button" onClick={closeMenu}>
              Закрыть <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav aria-label="Мобильная навигация">
            {site.navigation.map((item, index) => (
              <a href={item.href} key={item.href} onClick={closeMenu}>
                <span className="menu-index" aria-hidden="true">
                  0{index + 1}
                </span>
                {item.label}
                <Arrow />
              </a>
            ))}
          </nav>
          <a
            className="button button-primary"
            href="#inquiry"
            onClick={closeMenu}
          >
            Обсудить аренду <Arrow diagonal />
          </a>
          <p className="menu-slogan">{site.slogan}</p>
        </div>
      </dialog>
    </header>
  );
}
