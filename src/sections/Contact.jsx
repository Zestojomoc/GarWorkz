import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react';
import { business } from '../data/content';
import QuoteForm from '../components/QuoteForm';

export default function Contact() {
  return (
    <section id="quote" className="quote-section section">
      <div className="container quote-layout">
        <div className="quote-copy">
          <p className="eyebrow">
            <span /> YOUR NEXT CHAPTER
          </p>
          <h2>
            GOT A VISION?
            <br />
            <span className="purple">LET’S PAINT IT.</span>
          </h2>
          <p className="section-description">
            A color you can’t stop thinking about.
            <br />A bike that deserves a fresh start.
            <br />
            It starts with a conversation.
          </p>
          <div id="contact" className="contact-details">
            <h3>COME TALK SHOP.</h3>
            <div>
              <MapPin size={19} />
              <p>
                <span>THE SHOP</span>
                {business.location || 'Shop location coming soon'}
              </p>
            </div>
            <div>
              <Clock size={19} />
              <p>
                <span>SHOP HOURS</span>
                {business.hours || 'Business hours coming soon'}
              </p>
            </div>
            <div>
              <Phone size={19} />
              <p>
                <span>GET IN TOUCH</span>
                {business.phone ? (
                  <a href={`tel:${business.phone}`}>{business.phone}</a>
                ) : (
                  'Contact number coming soon'
                )}
                {business.email && <a href={`mailto:${business.email}`}>{business.email}</a>}
              </p>
            </div>
            <div className="social-links">
              {['facebook', 'messenger', 'instagram'].map((social) =>
                business[social] ? (
                  <a key={social} href={business[social]} target="_blank" rel="noopener noreferrer">
                    {social}
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <span key={social} title="Link coming soon">
                    {social} <span className="social-pending">soon</span>
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
