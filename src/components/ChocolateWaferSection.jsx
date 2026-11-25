import React, { useState } from 'react';
import { WAFER_STAGES } from '../data/scrapbookData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { ChocolateWaferSVG, WashiTape } from './Doodles';

export function ChocolateWaferSection() {
  const [stage, setStage] = useState(0);
  const [ref, isVisible] = useRevealOnScroll();

  const current = WAFER_STAGES[stage];

  const handleAdvance = () => {
    setStage((prev) => (prev + 1) % WAFER_STAGES.length);
  };

  return (
    <section
      id="wafer"
      ref={ref}
      className={`section-block section-choco-soft reveal ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <div className="container container-medium">
        <div className="section-heading section-heading-center">
          <span className="eyebrow">Personality Science</span>
          <h2 className="section-title">The Chocolate Wafer Theory</h2>
          <p className="section-lead">
            A little difficult to unwrap at first. But once you’re in her
            circle, good luck getting her to stop talking.
          </p>
        </div>

        <div className="wafer-card">
          <WashiTape color="choco" className="tape-top-right" />

          <button
            type="button"
            className="wafer-visual-btn"
            onClick={handleAdvance}
            aria-label={`${current.title}. Click to advance wafer unwrap stage.`}
          >
            <ChocolateWaferSVG stage={stage} className="wafer-svg" />
          </button>

          <div className="wafer-copy">
            <div className="wafer-dots" aria-hidden="true">
              {WAFER_STAGES.map((item) => (
                <span
                  key={item.step}
                  className={`wafer-dot ${stage === item.step ? 'is-active' : ''}`}
                />
              ))}
            </div>

            <span className="wafer-stage-tag">{current.tag}</span>
            <h3 className="wafer-stage-title">{current.title}</h3>
            <p className="wafer-stage-desc">{current.description}</p>

            <button
              type="button"
              className="btn-choco"
              onClick={handleAdvance}
            >
              {current.buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
