import CustomCursor from "./components/CustomCursor";
import FilmGrain from "./components/film/FilmGrain";
import Letterbox from "./components/film/Letterbox";
import CameraHUD from "./components/film/CameraHUD";
import SmoothScroll from "./components/SmoothScroll";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Process from "./components/Process";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import CTAFinal from "./components/CTAFinal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Camada da sala de projeção.
          Tudo aqui é `position: fixed` e por isso vive FORA do
          ScrollSmoother — o transform do smoother anularia o fixed. */}
      <CustomCursor />
      <Letterbox />
      <CameraHUD />
      <FilmGrain />
      <Navbar />

      <SmoothScroll>
        <main className="relative min-h-screen bg-film-black">
          <Hero />
          <Marquee />
          <About />
          <Process />
          <Services />
          <Portfolio />
          <Testimonials />
          <CTAFinal />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
