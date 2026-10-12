import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  return (
    <section
      id="about"
      className="section shell about"
      aria-labelledby="about-title"
      data-reveal
    >
      <SectionLabel number="01">Об АРКА 123</SectionLabel>
      <div className="about-grid">
        <h2 id="about-title" className="section-title">
          {site.about.title}
        </h2>
        <div className="about-copy">
          <span className="about-number" aria-hidden="true">
            123
          </span>
          <p>{site.about.description}</p>
        </div>
      </div>
    </section>
  );
}
