import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Arrow } from "@/components/ui/Arrow";

export function Formats() {
  return (
    <section
      id="formats"
      className="section shell formats"
      aria-labelledby="formats-title"
    >
      <div className="section-heading" data-reveal>
        <SectionLabel number="03">Форматы · наши услуги и цены</SectionLabel>
        <h2 id="formats-title" className="section-title title-narrow">
          {site.formats.title}
        </h2>
      </div>
      <div className="format-list">
        {site.formats.items.map((format, index) => (
          <article className="format-row" key={format.id} data-reveal>
            <span className="format-number" aria-hidden="true">
              0{index + 1}
            </span>
            <h3>{format.title}</h3>
            <p>{format.description}</p>
            <a
              href="#rates"
              className="format-link"
              aria-label={`Уточнить условия: ${format.title}`}
            >
              <Arrow diagonal />
            </a>
          </article>
        ))}
      </div>
      <div className="formats-bottom" data-reveal>
        <p>{site.formats.description}</p>
        <a href="#rates" className="text-link">
          Уточнить условия <Arrow />
        </a>
      </div>
    </section>
  );
}
