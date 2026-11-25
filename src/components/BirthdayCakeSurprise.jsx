import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Flame, RotateCcw, Sparkles } from 'lucide-react';
import { FINAL_SURPRISE } from '../data/scrapbookData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { SparkleStar } from './Doodles';

function launchBirthdayConfetti() {
  const colors = ['#F3BDC3', '#CDC1E8', '#F5C74C', '#5C3D2E', '#FFFDFA'];

  confetti({
    particleCount: 75,
    spread: 74,
    origin: { y: 0.68 },
    colors,
  });

  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 55,
      origin: { x: 0.15, y: 0.72 },
      colors,
    });
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 55,
      origin: { x: 0.85, y: 0.72 },
      colors,
    });
  }, 220);
}

export function BirthdayCakeSurprise() {
  const [candleLit, setCandleLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [ref, isVisible] = useRevealOnScroll();

  const handleBlowOut = () => {
    if (!candleLit) return;
    setCandleLit(false);
    setWishMade(true);
    launchBirthdayConfetti();
  };

  const handleRelight = () => {
    setCandleLit(true);
    setWishMade(false);
  };

  return (
    <section
      id="wish"
      ref={ref}
      className={`section-block wish-section reveal ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <div className="container container-narrow">
        <div className="wish-card">
          <SparkleStar
            size={26}
            color="#E5B242"
            className="wish-star wish-star-l"
          />
          <SparkleStar
            size={20}
            color="#C96A76"
            className="wish-star wish-star-r"
          />

          <span className="eyebrow">{FINAL_SURPRISE.eyebrow}</span>
          <h2 className="section-title">{FINAL_SURPRISE.heading}</h2>
          <p className="section-lead wish-intro">
            {candleLit
              ? 'Make a wish big enough to worry Mount Everest, then blow out the candle.'
              : 'Wish locked in! No telling anyone until it happens.'}
          </p>

          <button
            type="button"
            className="cake-stage"
            onClick={candleLit ? handleBlowOut : handleRelight}
            aria-label={
              candleLit
                ? 'Blow out the birthday candle and make a wish'
                : 'Relight the birthday candle'
            }
          >
            <svg
              viewBox="0 0 280 230"
              className="cake-svg"
              role="img"
              aria-hidden="true"
            >
              {candleLit && (
                <circle
                  cx="140"
                  cy="44"
                  r="34"
                  fill="#F5C74C"
                  fillOpacity="0.4"
                  className="candle-glow"
                />
              )}

              {!candleLit && (
                <g
                  className="smoke-puffs"
                  fill="none"
                  stroke="#7D5D4E"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M140 54 C134 42, 146 34, 138 22" />
                  <path d="M145 50 C151 39, 142 30, 148 18" opacity="0.65" />
                </g>
              )}

              <rect
                x="133"
                y="58"
                width="14"
                height="44"
                rx="4"
                fill="#FCEAE8"
                stroke="#5C3D2E"
                strokeWidth="1.8"
              />
              <path
                d="M133 70 L147 64 M133 82 L147 76 M133 94 L147 88"
                stroke="#F5C74C"
                strokeWidth="2.4"
              />
              <line
                x1="140"
                y1="52"
                x2="140"
                y2="58"
                stroke="#4A3228"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {candleLit && (
                <g className="candle-flame">
                  <path
                    d="M140 24 C147 34, 148 46, 140 52 C132 46, 133 34, 140 24 Z"
                    fill="#F5A623"
                  />
                  <path
                    d="M140 33 C144 39, 144 46, 140 50 C136 46, 136 39, 140 33 Z"
                    fill="#FFF3B0"
                  />
                </g>
              )}

              {/* Chocolate-sponge top tier with cream icing */}
              <rect
                x="82"
                y="102"
                width="116"
                height="46"
                rx="14"
                fill="#7D5441"
                stroke="#4A3228"
                strokeWidth="2"
              />
              <path
                d="M82 114 C92 126, 102 124, 110 115 C118 128, 130 127, 138 115 C146 127, 158 128, 166 115 C175 125, 187 125, 198 114 L198 108 C198 103, 193 102, 188 102 L92 102 C86 102, 82 104, 82 109 Z"
                fill="#FFFDFA"
              />
              <circle cx="106" cy="131" r="2.6" fill="#FCEAE8" />
              <circle cx="126" cy="135" r="2.6" fill="#F5C74C" />
              <circle cx="148" cy="131" r="2.6" fill="#EFEAF8" />
              <circle cx="170" cy="135" r="2.6" fill="#FCEAE8" />

              {/* Bottom tier in soft lavender with blush icing */}
              <rect
                x="56"
                y="148"
                width="168"
                height="50"
                rx="16"
                fill="#EFEAF8"
                stroke="#4A3228"
                strokeWidth="2"
              />
              <path
                d="M56 161 C68 175, 82 173, 92 161 C102 175, 118 176, 128 161 C138 175, 154 176, 164 161 C174 175, 190 176, 200 161 C208 171, 217 171, 224 161 L224 154 C224 149, 219 148, 214 148 L66 148 C60 148, 56 150, 56 155 Z"
                fill="#FCEAE8"
              />
              <circle cx="88" cy="181" r="3" fill="#C96A76" />
              <circle cx="118" cy="184" r="3" fill="#F5C74C" />
              <circle cx="150" cy="181" r="3" fill="#5C3D2E" />
              <circle cx="182" cy="184" r="3" fill="#C96A76" />

              <ellipse
                cx="140"
                cy="202"
                rx="112"
                ry="12"
                fill="#FFFDFA"
                stroke="#4A3228"
                strokeWidth="2"
              />
              <rect
                x="114"
                y="212"
                width="52"
                height="10"
                rx="5"
                fill="#E8DDD2"
                stroke="#4A3228"
                strokeWidth="1.8"
              />
            </svg>
          </button>

          <div className="wish-actions">
            {candleLit ? (
              <button
                type="button"
                className="btn-primary"
                onClick={handleBlowOut}
              >
                <Flame size={18} aria-hidden="true" />
                <span>Blow out the candle &amp; make a wish</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn-secondary"
                onClick={handleRelight}
              >
                <RotateCcw size={16} aria-hidden="true" />
                <span>Relight the candle</span>
              </button>
            )}
          </div>

          {wishMade && (
            <div className="wish-revealed" role="status" aria-live="polite">
              <div className="wish-revealed-badge">
                <Sparkles size={15} aria-hidden="true" />
                <span>Happy Birthday, Rutika!</span>
              </div>
              <p className="wish-revealed-text">{FINAL_SURPRISE.message}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
