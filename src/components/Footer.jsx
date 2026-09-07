import { ArrowUpRight } from 'lucide-react';
import { Brand } from './Shared';
import { business } from '../data/content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href="#home" aria-label="GARWORKZ home">
            <Brand />
          </a>
          <p>YOUR BIKE. YOUR COLOR. OUR CRAFT.</p>
          <a className="back-top" href="#home">
            BACK TO TOP <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} GARWORKZ. All rights reserved.</span>
          <nav aria-label="Footer navigation">
            <a href="#work">Our Work</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            {business.facebook && (
              <a href={business.facebook} rel="noopener noreferrer" target="_blank">
                Facebook
              </a>
            )}
            {business.messenger && (
              <a href={business.messenger} rel="noopener noreferrer" target="_blank">
                Messenger
              </a>
            )}
            {business.instagram && (
              <a href={business.instagram} rel="noopener noreferrer" target="_blank">
                Instagram
              </a>
            )}
          </nav>
          <span>PAINTED WITH PURPOSE.</span>
        </div>
      </div>
    </footer>
  );
}
