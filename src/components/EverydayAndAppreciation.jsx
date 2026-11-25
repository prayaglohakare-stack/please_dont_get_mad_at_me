import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import {
  APPRECIATION_REASONS,
  EVERYDAY_MOMENTS,
  EXTRA_COMPLIMENTS,
} from '../data/scrapbookData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { DaisyDoodle, WashiTape } from './Doodles';

export function EverydayAndAppreciation() {
  const [complimentIdx, setComplimentIdx] = useState(0);
  const [refEveryday, isEverydayVisible] = useRevealOnScroll();
  const [refAppreciate, isAppreciateVisible] = useRevealOnScroll();

  const cycleCompliment = () => {
    setComplimentIdx((prev) => (prev + 1) % EXTRA_COMPLIMENTS.length);
  };

  return (
    <>
      <section
        id="everyday"
        ref={refEveryday}
        className={`section-block reveal ${
          isEverydayVisible ? 'is-visible' : ''
        }`}
      >
        <div className="container container-medium">
          <div className="section-heading section-heading-center">
            <span className="eyebrow">Ordinary Moments</span>
            <h2 className="section-title">
              The quiet magic of regular companionship
            </h2>
            <p className="section-lead">
              The best parts aren’t always grand events — mostly just being
              present together without checking the clock.
            </p>
          </div>

          <div className="everyday-strips">
            {EVERYDAY_MOMENTS.map((item) => (
              <div key={item.label} className="everyday-chip">
                <strong className="everyday-chip-title">{item.label}</strong>
                <span className="everyday-chip-note">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="appreciate"
        ref={refAppreciate}
        className={`section-block section-blush-soft reveal ${
          isAppreciateVisible ? 'is-visible' : ''
        }`}
      >
        <div className="container">
          <div className="section-heading section-heading-center">
            <span className="eyebrow">A Little Appreciation</span>
            <h2 className="section-title">
              An entirely unreasonable number of reasons to appreciate you.
            </h2>
          </div>

          <div className="notes-grid notes-grid-3">
            {APPRECIATION_REASONS.map((note, idx) => (
              <article
                key={note.title}
                className={`sticky-note note-${note.color} ${
                  note.featured ? 'note-featured' : ''
                }`}
                style={{ '--tilt': `${note.tilt}deg` }}
              >
                <WashiTape
                  color={idx % 2 === 0 ? 'sunshine' : 'lavender'}
                  className="tape-top-center"
                />
                <h3 className="note-title">{note.title}</h3>
                <p className="note-body">{note.body}</p>
              </article>
            ))}
          </div>

          <div className="compliment-jar">
            <DaisyDoodle size={34} className="jar-daisy" />
            <div className="jar-content">
              <span className="jar-label">Little pocket reminder</span>
              <p className="handwritten jar-quote" aria-live="polite">
                “{EXTRA_COMPLIMENTS[complimentIdx]}”
              </p>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={cycleCompliment}
            >
              <RefreshCw size={16} aria-hidden="true" />
              <span>Another little note</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
