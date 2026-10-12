import { site } from "@/content/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Arrow } from "@/components/ui/Arrow";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div>
            <BrandLogo footer />
            <p className="footer-slogan">{site.slogan}</p>
          </div>
          <nav aria-label="Навигация в подвале">
            {site.navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#top" className="footer-up">
            Наверх <Arrow diagonal />
          </a>
        </div>
        <div className="footer-bottom">
          <p>{site.footer.note}</p>
          <p>{site.inquiry.address}</p>
        </div>
      </div>
    </footer>
  );
}
