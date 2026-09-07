import Photo from './Photo';
import { useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  return (
    <div className="comparison" style={{ '--position': `${position}%` }}>
      <Photo
        src="/images/custom.jpg"
        alt="Sample motorcycle in full color"
        width="1000"
        height="667"
        loading="lazy"
      />
      <div className="comparison-before">
        <Photo
          src="/images/custom.jpg"
          alt="The same sample motorcycle with a simulated faded treatment"
          width="1000"
          height="667"
          loading="lazy"
        />
      </div>
      <span className="comparison-label before-label">BEFORE</span>
      <span className="comparison-label after-label">AFTER</span>
      <div className="comparison-divider">
        <span>
          <ChevronsLeftRight />
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Before and after comparison"
        aria-valuetext={`${position}% before, ${100 - position}% after`}
      />
      <span className="comparison-hint">DRAG TO REVEAL</span>
    </div>
  );
}
