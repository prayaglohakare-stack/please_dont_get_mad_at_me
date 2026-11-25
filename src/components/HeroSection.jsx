import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { HERO_CONTENT } from '../data/scrapbookData';
import {
  DaisyDoodle,
  PostageStamp,
  SparkleStar,
  SquiggleUnderline,
  WashiTape,
} from './Doodles';

export function HeroSection({ onOpenSurprise }) {
  return (
    <section id="top" className="hero-section">
      <div className="hero-wash hero-wash-blush" aria-hidden="true" />
      <div className="hero-wash hero-wash-sun" aria-hidden="true" />
      <div className="hero-wash hero-wash-lavender" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-pill">
            <Sparkles size={14} aria-hidden="true" />
            <span>{HERO_CONTENT.badge}</span>
          </div>

          <h1 className="hero-title">
            {HERO_CONTENT.headingPrefix}
          </h1>

          <p className="hero-sub-brand">
            {HERO_CONTENT.subheading}{' '}
            <span className="hero-name-wrap">
              <span className="hero-name">{HERO_CONTENT.name}</span>
              <SquiggleUnderline className="hero-underline" />
            </span>
          </p>

          <p className="hero-subtitle">
            Inside: volleyball &amp; impossible dreams, Guzarwadi sunlight, the
            chocolate wafer theory, an unofficial soundboard, late-night movies,
            and snapshots worth keeping.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={onOpenSurprise}
            >
              <span>{HERO_CONTENT.ctaPrimary}</span>
              <ArrowDown size={18} aria-hidden="true" />
            </button>
            <a href="#scrapbook" className="btn-ghost">
              {HERO_CONTENT.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="hero-collage" aria-hidden="true">
          <SparkleStar className="float-star star-1" size={24} color="#E5B242" />
          <SparkleStar className="float-star star-2" size={16} color="#C96A76" />
          <DaisyDoodle className="float-daisy" size={44} />
          <PostageStamp top="BIRTHDAY" bottom="RUTIKA" className="hero-stamp" />

          <div className="hero-polaroid hero-polaroid-back">
            <WashiTape color="lavender" className="tape-top-center" />
            <div className="hero-photo-frame">
              <img
                src="./media/photos/scooter-laugh.jpeg"
                alt=""
                className="hero-photo-img"
              />
            </div>
            <p className="handwritten hero-caption">dodging the camera</p>
          </div>

          <div className="hero-polaroid hero-polaroid-front">
            <WashiTape color="sunshine" className="tape-top-center" />
            <div className="hero-photo-frame">
              <img
                src="./media/photos/saree-wink-polaroid.jpeg"
                alt=""
                className="hero-photo-img hero-photo-wink"
              />
            </div>
            <p className="handwritten hero-caption">main character wink ★</p>
          </div>
        </div>
      </div>
    </section>
  );
}
