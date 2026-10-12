import { site } from "@/content/site";
import { HostFilm } from "@/components/motion/HostFilm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Arrow } from "@/components/ui/Arrow";

export function Host() {
  return (
    <section
      id="host"
      className="section host-section"
      aria-labelledby="host-title"
    >
      <div className="shell">
        <div className="host-heading" data-reveal>
          <div>
            <SectionLabel number="04">Знакомство с пространством</SectionLabel>
            <h2 id="host-title" className="section-title">
              {site.host.title}
            </h2>
          </div>
          <div className="host-intro">
            <p>{site.host.description}</p>
            <a href="#inquiry" className="text-link">
              {site.host.cta}
              <Arrow diagonal />
            </a>
          </div>
        </div>
        <HostFilm />
      </div>
    </section>
  );
}
