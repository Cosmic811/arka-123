"use client";
import { useEffect } from "react";

export function RevealController() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    let observer: IntersectionObserver | undefined;
    function setup() {
      observer?.disconnect();
      nodes.forEach((node) => node.classList.remove("reveal-pending"));
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("reveal-pending");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );
      nodes.forEach((node) => {
        if (node.getBoundingClientRect().top > window.innerHeight) {
          node.classList.add("reveal-pending");
          observer?.observe(node);
        }
      });
    }
    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", setup);
      nodes.forEach((node) => node.classList.remove("reveal-pending"));
    };
  }, []);
  return null;
}
