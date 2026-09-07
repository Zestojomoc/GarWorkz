import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Brand } from './Shared';
import { trapDialogFocus } from './dialogFocus';

const links = [
  ['Home', 'home'],
  ['Our Work', 'work'],
  ['Services', 'services'],
  ['Process', 'process'],
  ['About', 'about'],
  ['Contact', 'contact'],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    if (!open) return;
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const query = window.matchMedia('(min-width: 1024px)');
    const onResize = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener('change', onResize);
    return () => {
      dialog.current?.close();
      document.body.style.overflow = previous;
      query.removeEventListener('change', onResize);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="navbar">
        <div className="container nav-inner">
          <a href="#home" aria-label="GARWORKZ home">
            <Brand />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, id]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
          <a className="button button-purple nav-quote" href="#quote">
            Get a quote <ArrowUpRight size={17} />
          </a>
          <button
            className="icon-button menu-toggle"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Navigation menu"
        onKeyDown={trapDialogFocus}
        onCancel={() => setOpen(false)}
      >
        <div className="mobile-menu-top">
          <Brand />
          <button
            className="icon-button"
            autoFocus
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map(([label, id], i) => (
            <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight />
            </a>
          ))}
          <a href="#quote" className="button button-purple" onClick={() => setOpen(false)}>
            Get a quote <ArrowUpRight />
          </a>
        </nav>
        <p className="micro">YOUR BIKE. YOUR COLOR. OUR CRAFT.</p>
      </dialog>
    </>
  );
}
