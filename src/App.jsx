import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './sections/Work';
import {
  Transformation,
  Services,
  Finish,
  Process,
  StreetGallery,
  About,
} from './sections/Showcase';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll('.reveal').forEach((element) => {
      element.classList.add('will-reveal');
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <div className="craft-strip" aria-label="Our focus">
          <span>CUSTOM PAINT</span>
          <i />
          <span>PRECISION</span>
          <i />
          <span>PREMIUM FINISH</span>
          <i />
          <span>PURE CHARACTER</span>
          <i className="last-dot" />
        </div>
        <Work />
        <Transformation />
        <Services />
        <Finish />
        <Process />
        <StreetGallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
