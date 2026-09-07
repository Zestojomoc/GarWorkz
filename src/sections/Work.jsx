import Photo from '../components/Photo';
import { lazy, Suspense, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { categories, projects } from '../data/content';
import { SectionTitle, QuoteLink } from '../components/Shared';
const ProjectModal = lazy(() => import('../components/ProjectModal'));

export default function Work() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const opener = useRef(null);
  const closeProject = () => {
    setSelected(null);
    requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
  };
  const filtered = projects.filter(
    (project) => category === 'All' || project.category === category,
  );
  return (
    <section id="work" className="section container">
      <SectionTitle
        eyebrow="THE WORK SPEAKS"
        title={
          <>
            BUILT TO STAND OUT<span className="purple">.</span>
          </>
        }
        description="Different rides. Different styles. The same attention to detail."
      >
        <span className="section-index">01 / OUR WORK</span>
      </SectionTitle>
      <div className="filter-list" aria-label="Filter projects">
        {categories.map((item) => (
          <button
            className={category === item ? 'filter active' : 'filter'}
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="project-grid" aria-live="polite">
        {filtered.map((project, i) => (
          <button
            className="project-card"
            key={project.id}
            onClick={(event) => {
              opener.current = event.currentTarget;
              setSelected(project);
            }}
            aria-label={`View ${project.title}`}
          >
            <div className="project-image">
              <Photo
                sizes="(max-width: 767px) 100vw, 33vw"
                src={project.image}
                style={{ objectPosition: project.position }}
                alt={`${project.model}, sample finish inspiration`}
                loading="lazy"
                width="800"
                height="600"
              />
              <span className="image-tag">{project.category}</span>
              <span className="project-open">
                <ArrowUpRight size={22} />
              </span>
            </div>
            <div className="project-meta">
              <div>
                <p>{project.model}</p>
                <h3>{project.title}</h3>
                <span>{project.finish}</span>
              </div>
              <span className="project-number">0{i + 1}</span>
            </div>
          </button>
        ))}
        {!filtered.length && (
          <div className="empty-state">
            <h3>A new finish starts with an idea.</h3>
            <p>Photos for this category are coming soon. Tell us what you’re planning.</p>
            <QuoteLink />
          </div>
        )}
      </div>
      <p className="sample-note">
        PREVIEW COLLECTION — Sample photography. Actual GARWORKZ projects coming soon.
      </p>
      {selected && (
        <Suspense fallback={<p role="status">Opening project…</p>}>
          <ProjectModal project={selected} onClose={closeProject} />
        </Suspense>
      )}
    </section>
  );
}
