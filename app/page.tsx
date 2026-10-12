import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/motion/Preloader";
import { RevealController } from "@/components/motion/RevealController";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Space } from "@/components/sections/Space";
import { Formats } from "@/components/sections/Formats";
import { Host } from "@/components/sections/Host";
import { Gallery } from "@/components/sections/Gallery";
import { Rates } from "@/components/sections/Rates";
import { Reviews } from "@/components/sections/Reviews";
import { Inquiry } from "@/components/sections/Inquiry";

export default function Home() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>
      <Preloader />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Space />
        <Formats />
        <Host />
        <Gallery />
        <Rates />
        <Reviews />
        <Inquiry />
      </main>
      <Footer />
      <RevealController />
    </div>
  );
}
