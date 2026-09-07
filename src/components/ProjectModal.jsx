import Photo from './Photo';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { QuoteLink } from './Shared';
import { trapDialogFocus } from './dialogFocus';

export default function ProjectModal({ project, onClose }) {
  const dialog = useRef(null);
  const touch = useRef(null);
  const [index, setIndex] = useState(0);
  const navigate = (direction) =>
    setIndex((current) => (current + direction + project.photos.length) % project.photos.length);
  useEffect(() => {
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      className="project-modal"
      ref={dialog}
      aria-labelledby="project-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
      onKeyDown={(event) => {
        trapDialogFocus(event);
        if (event.key === 'ArrowRight') navigate(1);
        if (event.key === 'ArrowLeft') navigate(-1);
      }}
    >
      <div className="modal-inner">
        <button
          className="icon-button modal-close"
          autoFocus
          onClick={onClose}
          aria-label="Close project"
        >
          <X />
        </button>
        <div
          className="modal-photo"
          onTouchStart={(event) => {
            touch.current = event.changedTouches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touch.current !== null) {
              const delta = event.changedTouches[0].clientX - touch.current;
              if (Math.abs(delta) > 45) navigate(delta < 0 ? 1 : -1);
              touch.current = null;
            }
          }}
        >
          <Photo
            src={project.photos[index]}
            alt={`${project.model}, sample photo ${index + 1}`}
            width="1200"
            height="800"
          />
          {project.photos.length > 1 && (
            <div className="photo-controls">
              <button
                className="icon-button"
                onClick={() => navigate(-1)}
                aria-label="Previous photo"
              >
                <ChevronLeft />
              </button>
              <span aria-live="polite">
                {index + 1} / {project.photos.length}
              </span>
              <button className="icon-button" onClick={() => navigate(1)} aria-label="Next photo">
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
        <div className="modal-copy">
          <p className="eyebrow">SAMPLE CONCEPT · {project.category}</p>
          <h2 id="project-title">{project.title}</h2>
          <p>{project.description}</p>
          <dl>
            <div>
              <dt>Motorcycle</dt>
              <dd>{project.model}</dd>
            </div>
            <div>
              <dt>Finish concept</dt>
              <dd>{project.finish}</dd>
            </div>
          </dl>
          <p className="sample-note">
            Preview imagery and concept details. Not a completed GARWORKZ project.
          </p>
          <span onClick={onClose}>
            <QuoteLink className="button button-purple">Plan a finish like this</QuoteLink>
          </span>
        </div>
      </div>
    </dialog>
  );
}
