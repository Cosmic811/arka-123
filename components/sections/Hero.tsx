import { site } from "@/content/site";
import { AssetFrame } from "@/components/ui/AssetFrame";
import { Arrow } from "@/components/ui/Arrow";

export function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{site.hero.eyebrow}</p>
        <h1 id="hero-title">
          {site.hero.titleLines[0]}
          <br />
          {site.hero.titleLines[1]}
          <br />
          {site.hero.titleLines[2]}{" "}
          <span className="type-accent">{site.hero.titleAccent}</span>
        </h1>
        <p className="hero-description">{site.hero.description}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#inquiry">
            {site.hero.primary}
            <Arrow diagonal />
          </a>
          <a className="text-link hero-secondary" href="#space">
            {site.hero.secondary}
          </a>
        </div>
        <p className="hero-slogan">{site.slogan}</p>
      </div>
      <div className="hero-visual">
        <AssetFrame
          asset={site.hero.media}
          className="hero-frame"
          priority
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        <div className="hero-visual-caption">
          <span>Архитектура пространства</span>
          <span>01 / АРКА 123</span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>Мастер-классы · лекции · камерные встречи</span>
        <a href="#about">
          Знакомство с пространством <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
