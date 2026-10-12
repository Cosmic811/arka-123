import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Arrow } from "@/components/ui/Arrow";

export function Rates() {
  return (
    <section
      id="rates"
      className="section rates-section"
      aria-labelledby="rates-title"
    >
      <div className="shell">
        <div className="rates-grid">
          <div data-reveal>
            <SectionLabel number="06">Тарифы и услуги</SectionLabel>
            <h2 id="rates-title" className="section-title">
              {site.rates.title}
            </h2>
            <p className="section-description">{site.rates.description}</p>
            <a className="button button-primary" href="#inquiry">
              {site.rates.cta}
              <Arrow diagonal />
            </a>
          </div>
          <div className="rates-details" data-reveal>
            <div className="tariff-list">
              {site.rates.items.map((item, index) => (
                <article className="tariff-row" key={item.id}>
                  <div className="tariff-heading">
                    <span className="rates-index">0{index + 1}</span>
                    <h3>{item.title}</h3>
                    <span>{item.duration}</span>
                  </div>
                  <p className="tariff-price">
                    {item.price} <span>{item.currency}</span>
                  </p>
                  <p className="tariff-description">{item.description}</p>
                  <a
                    className="text-link"
                    href="#inquiry"
                    aria-label={`${site.rates.itemCta}: ${item.title}, ${item.duration}`}
                  >
                    {site.rates.itemCta}
                    <Arrow diagonal />
                  </a>
                </article>
              ))}
            </div>
            <p className="rates-note">{site.rates.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
