import React from 'react';
import { Sun } from 'lucide-react';
import { GUZARWADI_DATA } from '../data/scrapbookData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { SparkleStar, SunlitHillsSVG, WashiTape } from './Doodles';

export function GuzarwadiSection() {
  const [ref, isVisible] = useRevealOnScroll();

  return (
    <section
      id="guzarwadi"
      ref={ref}
      className={`section-block reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container container-medium">
        <article className="guzarwadi-spread">
          <WashiTape color="sunshine" className="tape-top-center" />
          <SparkleStar
            size={22}
            color="#E5B242"
            className="guzarwadi-star"
          />

          <div className="guzarwadi-content">
            <div className="guzarwadi-pill">
              <Sun size={14} aria-hidden="true" />
              <span>{GUZARWADI_DATA.locationTag}</span>
            </div>

            <span className="eyebrow">{GUZARWADI_DATA.eyebrow}</span>
            <h2 className="section-title">{GUZARWADI_DATA.title}</h2>

            <div className="guzarwadi-paragraphs">
              {GUZARWADI_DATA.paragraphs.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <blockquote className="guzarwadi-sentiment">
              “{GUZARWADI_DATA.sentiment}”
            </blockquote>
          </div>

          <SunlitHillsSVG className="guzarwadi-hills-svg" />
        </article>
      </div>
    </section>
  );
}
