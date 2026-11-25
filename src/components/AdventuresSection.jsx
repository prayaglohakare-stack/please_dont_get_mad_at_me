import React from 'react';
import { Compass, Mountain } from 'lucide-react';
import { ADVENTURES_DATA } from '../data/scrapbookData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { MountainTrailSVG, WashiTape } from './Doodles';

export function AdventuresSection() {
  const [ref, isVisible] = useRevealOnScroll();

  return (
    <section
      id="adventures"
      ref={ref}
      className={`section-block reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container">
        <div className="section-heading section-heading-center">
          <span className="eyebrow">{ADVENTURES_DATA.eyebrow}</span>
          <h2 className="section-title">{ADVENTURES_DATA.title}</h2>
        </div>

        <div className="adventures-layout">
          <article className="amk-journal-card">
            <WashiTape color="sunshine" className="tape-top-left" />
            <div className="amk-tag-row">
              <span className="amk-badge">
                <Compass size={14} aria-hidden="true" />
                <span>{ADVENTURES_DATA.featuredTag}</span>
              </span>
            </div>

            <div className="amk-illustration-wrap">
              <MountainTrailSVG className="amk-svg" />
            </div>

            <blockquote className="amk-quote">
              {ADVENTURES_DATA.featuredTitle}
            </blockquote>
            <p className="amk-caption">{ADVENTURES_DATA.featuredCaption}</p>
          </article>

          <div className="adventures-notes">
            {ADVENTURES_DATA.highlights.map((item, idx) => (
              <article
                key={item.label}
                className={`adventure-note-card adventure-card-${idx}`}
              >
                <div className="adventure-note-head">
                  <Mountain size={16} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
                <p className="adventure-note-body">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
