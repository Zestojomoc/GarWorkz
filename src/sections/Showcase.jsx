import Photo from '../components/Photo';
import {
  Bike,
  Layers,
  CircleDot,
  Palette,
  Sparkles,
  Wrench,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useRef } from 'react';
import { process, services } from '../data/content';
import { SectionTitle, QuoteLink } from '../components/Shared';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
const icons = {
  bike: Bike,
  layers: Layers,
  wheel: CircleDot,
  palette: Palette,
  sparkles: Sparkles,
  wrench: Wrench,
};

export function Transformation() {
  return (
    <section className="transformation section">
      <div className="container split">
        <div>
          <p className="eyebrow">
            <span /> A FRESH START
          </p>
          <h2>
            SAME BIKE.
            <br />
            WHOLE NEW
            <br />
            <span className="purple">ATTITUDE.</span>
          </h2>
          <p className="section-description">
            Sometimes, all it takes is a new finish.
            <br />
            Slide to see the difference.
          </p>
          <QuoteLink className="text-link">Let’s talk about your bike</QuoteLink>
          <p className="sample-note">
            Interactive demo: simulated color treatment.
            <br />
            Real before-and-after photos coming soon.
          </p>
        </div>
        <BeforeAfterSlider />
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="section container">
      <SectionTitle
        eyebrow="MAKE IT YOURS"
        title={
          <>
            YOUR VISION. OUR EXPERTISE<span className="purple">.</span>
          </>
        }
        description="From a small detail to a complete transformation."
      >
        <span className="section-index">02 / SERVICES</span>
      </SectionTitle>
      <div className="services-grid">
        {services.map((service, i) => {
          const Icon = icons[service.icon];
          return (
            <article className="service-card" key={service.title}>
              <div className="service-top">
                <Icon size={29} strokeWidth={1.4} />
                <span>0{i + 1}</span>
              </div>
              <h3>{service.short}</h3>
              <p>{service.description}</p>
              <QuoteLink service={service.title} />
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Finish() {
  return (
    <section className="finish-section">
      <div className="container finish-layout">
        <div className="finish-photo">
          <Photo
            src="/images/detail.jpg"
            loading="lazy"
            width="1000"
            height="800"
            alt="Sample motorcycle details showing metallic surfaces and bodywork"
          />
          <span className="image-tag">THE DETAILS MAKE THE DIFFERENCE</span>
        </div>
        <div className="finish-copy">
          <p className="eyebrow">
            <span /> NO SHORTCUTS
          </p>
          <h2>
            THE GARWORKZ
            <br />
            <span className="outline-text">FINISH.</span>
          </h2>
          <p className="finish-tagline">Precision in every layer.</p>
          <p className="section-description">
            It starts with the surface. It ends with a finish you can see—and feel.
          </p>
          <ul className="finish-points">
            {[
              'Careful surface preparation',
              'Rich color. Consistent coverage.',
              'Attention to the final detail',
            ].map((text) => (
              <li key={text}>
                <Check size={16} />
                {text}
              </li>
            ))}
          </ul>
          <p className="sample-note">Sample detail photography</p>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="section container">
      <SectionTitle
        eyebrow="FROM IDEA TO IGNITION"
        title={
          <>
            GOOD PAINT TAKES A PROCESS<span className="purple">.</span>
          </>
        }
      >
        <span className="section-index">03 / THE PROCESS</span>
      </SectionTitle>
      <ol className="process-grid">
        {process.map(([title, description], i) => (
          <li className="reveal" key={title}>
            <span className="step-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function StreetGallery() {
  const track = useRef(null);
  const scroll = (direction) =>
    track.current.scrollBy({
      left: direction * track.current.clientWidth * 0.75,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  return (
    <section className="street-section section">
      <div className="container">
        <SectionTitle
          eyebrow="MADE TO BE RIDDEN"
          title={
            <>
              BUILT IN THE SHOP.
              <br />
              <span className="outline-text">SEEN ON THE STREET.</span>
            </>
          }
        >
          <div className="carousel-buttons">
            <button
              className="icon-button"
              onClick={() => scroll(-1)}
              aria-label="Previous street photo"
            >
              <ChevronLeft />
            </button>
            <button
              className="icon-button"
              onClick={() => scroll(1)}
              aria-label="Next street photo"
            >
              <ChevronRight />
            </button>
          </div>
        </SectionTitle>
        <div
          className="street-track"
          ref={track}
          tabIndex="0"
          aria-label="Street inspiration photo gallery"
        >
          <figure>
            <Photo
              src="/images/hero.jpg"
              loading="lazy"
              width="1800"
              height="1200"
              alt="Motorcyclist riding a cruiser on an open road at sunset, sample photo"
            />
            <figcaption>
              FOR THE LOVE OF THE RIDE <ArrowUpRight size={18} />
            </figcaption>
          </figure>
          <figure>
            <Photo
              src="/images/custom.jpg"
              loading="lazy"
              width="1000"
              height="667"
              alt="Custom motorcycle inspiration, sample photo"
            />
            <figcaption>
              MAKE EVERY MILE YOURS <ArrowUpRight size={18} />
            </figcaption>
          </figure>
          <figure>
            <Photo
              src="/images/sport.jpg"
              loading="lazy"
              width="1600"
              height="1067"
              alt="Red sport motorcycle inspiration, sample photo"
            />
            <figcaption>
              A LITTLE MORE CHARACTER <ArrowUpRight size={18} />
            </figcaption>
          </figure>
        </div>
        <p className="sample-note">STREET INSPIRATION — Customer bike photos coming soon.</p>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section container about-layout">
      <div>
        <p className="eyebrow">
          <span /> THIS IS GARWORKZ
        </p>
        <h2>
          BUILT ON PASSION.
          <br />
          FINISHED WITH PRIDE<span className="purple">.</span>
        </h2>
      </div>
      <div>
        <p className="about-intro">For the ones who see more than a motorcycle.</p>
        <p className="section-description">
          Custom paint. Proper preparation. An eye for the details. We’re here to give your ride a
          finish that feels like your own.
        </p>
        <QuoteLink className="text-link">Build something with us</QuoteLink>
      </div>
    </section>
  );
}
