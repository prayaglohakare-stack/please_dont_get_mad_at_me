import React, { useState } from 'react';
import { Terminal, Volume2 } from 'lucide-react';
import { SOUNDBOARD_TRIGGERS } from '../data/scrapbookData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { WashiTape } from './Doodles';

export function RutikaSoundboard() {
  const [activeTrigger, setActiveTrigger] = useState(SOUNDBOARD_TRIGGERS[0]);
  const [count, setCount] = useState(1);
  const [ref, isVisible] = useRevealOnScroll();

  const handleTrigger = (item) => {
    setActiveTrigger(item);
    setCount((prev) => prev + 1);
  };

  return (
    <section
      id="soundboard"
      ref={ref}
      className={`section-block reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container container-medium">
        <div className="section-heading section-heading-center">
          <span className="eyebrow">Unofficial Soundboard</span>
          <h2 className="section-title">
            Things Rutika does for absolutely no reason.
          </h2>
          <p className="section-lead">
            Tap any sticker below to run a completely scientific diagnostic of
            unpredictable Rutika behaviour.
          </p>
        </div>

        <div className="soundboard-shell">
          <div className="soundboard-buttons">
            {SOUNDBOARD_TRIGGERS.map((item) => {
              const isSelected = activeTrigger.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`sound-sticker sticker-${item.color} ${
                    isSelected ? 'is-selected' : ''
                  }`}
                  onClick={() => handleTrigger(item)}
                  aria-pressed={isSelected}
                >
                  <span className="sound-sticker-badge">{item.badge}</span>
                  <span className="sound-sticker-label">
                    <Volume2 size={15} aria-hidden="true" />
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <aside className="rutika-exe-card" aria-live="polite">
            <WashiTape color="lavender" className="tape-top-center" />
            <div className="exe-topbar">
              <span className="exe-title">
                <Terminal size={14} aria-hidden="true" />
                <span>Rutika.exe</span>
              </span>
              <span className="exe-count">Log #{count}</span>
            </div>

            <p className="exe-alert">
              Rutika.exe has performed an unexpected action.
            </p>

            <div className="exe-output-box">
              <p className="handwritten exe-output-text">
                {activeTrigger.output}
              </p>
              <p className="exe-output-note">{activeTrigger.note}</p>
            </div>

            <dl className="exe-stats">
              <div>
                <dt>Cause:</dt>
                <dd>Unknown.</dd>
              </div>
              <div>
                <dt>Purpose:</dt>
                <dd>Unknown.</dd>
              </div>
              <div>
                <dt>Will she do it again?</dt>
                <dd>Absolutely.</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
