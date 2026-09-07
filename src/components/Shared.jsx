import { ArrowUpRight, SprayCan } from 'lucide-react';
import { business } from '../data/content';

export function Brand({ large = false }) {
  return business.horizontalLogo ? (
    <img
      className={`brand-image ${large ? 'large' : ''}`}
      src={business.horizontalLogo}
      alt="GARWORKZ"
      width="200"
      height="80"
    />
  ) : (
    <span className={`brand ${large ? 'large' : ''}`} aria-label="GARWORKZ">
      <SprayCan aria-hidden="true" />
      <span>
        GAR<span>WORKZ</span>
      </span>
      <i />
    </span>
  );
}

export function SectionTitle({ eyebrow, title, description, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function QuoteLink({ service, className = 'text-link', children = 'Request a quote' }) {
  return (
    <a
      className={className}
      href="#quote"
      onClick={() =>
        window.dispatchEvent(new CustomEvent('quote-service', { detail: service || '' }))
      }
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
