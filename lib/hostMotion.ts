/** One finite narrative tied to ordinary page scroll, with static defaults. */
export async function createHostMotion(root: HTMLElement) {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add(
    "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 0.65,
        },
      });
      timeline.fromTo(
        ".host-room",
        { scale: 1 },
        { scale: 1.025, duration: 1, ease: "none" },
        0,
      );
      timeline.fromTo(
        ".host-opening",
        { opacity: 1 },
        { opacity: 0, duration: 0.22 },
        0.12,
      );
      timeline.fromTo(
        ".host-person",
        { opacity: 0, y: 28, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.32 },
        0.18,
      );
      timeline.fromTo(
        ".host-invitation",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.2 },
        0.38,
      );
      timeline.to(
        ".host-person",
        { opacity: 0, x: -8, duration: 0.18 },
        0.82,
      );
    },
    root,
  );
  return () => media.revert();
}
