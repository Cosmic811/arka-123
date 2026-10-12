import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SpaceScene } from "@/components/motion/SpaceScene";

export function Space() {
  return (
    <section
      id="space"
      className="section space-section"
      aria-labelledby="space-title"
    >
      <div className="shell">
        <div className="section-heading" data-reveal>
          <SectionLabel number="02">Наше помещение</SectionLabel>
          <div className="heading-grid">
            <h2 id="space-title" className="section-title">
              {site.space.title}
            </h2>
            <p className="section-description">{site.space.description}</p>
          </div>
        </div>
        <SpaceScene />
        <dl className="space-facts" data-reveal>
          {site.space.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
