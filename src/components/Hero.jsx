import Photo from './Photo';
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Brand } from './Shared';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <Photo
        sizes="(max-width: 1023px) 100vw, 78vw"
        className="hero-image"
        src="/images/sport.jpg"
        alt="Red sport motorcycle in a garage, sample image"
        fetchPriority="high"
        width="1600"
        height="1067"
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <p className="eyebrow">
          <span /> MOTORCYCLE PAINT & CUSTOM FINISHES
        </p>
        <h1>
          YOUR BIKE.
          <br />
          YOUR COLOR.
          <br />
          <span>OUR CRAFT.</span>
        </h1>
        <p className="hero-description">
          More than a fresh coat.
          <br />A finish that’s unmistakably yours.
        </p>
        <div className="hero-actions">
          <a className="button button-purple" href="#work">
            View our work <ArrowUpRight size={19} />
          </a>
          <a className="button button-outline" href="#quote">
            Get a quote <ArrowUpRight size={19} />
          </a>
        </div>
      </div>
      <div className="hero-stamp">
        <Brand />
        <span>CUSTOM PAINT. REAL CHARACTER.</span>
      </div>
      <div className="container hero-bottom">
        <a href="#work">
          <ArrowDown size={15} /> SCROLL TO EXPLORE
        </a>
        <span>
          SAMPLE BIKE PHOTOGRAPHY <MoveUpRight size={14} />
        </span>
      </div>
    </section>
  );
}
