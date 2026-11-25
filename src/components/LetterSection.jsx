import React from 'react';
import { MailOpen, Sparkles } from 'lucide-react';
import { BIRTHDAY_LETTER } from '../data/scrapbookData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { DaisyDoodle, PaperclipDoodle, WashiTape } from './Doodles';

export function LetterSection({ isOpen, onToggle }) {
  const [ref, isVisible] = useRevealOnScroll();

  return (
    <section
      id="letter"
      ref={ref}
      className={`section-block reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container container-narrow">
        <div className="section-heading">
          <span className="eyebrow">Keepsake Note</span>
          <h2 className="section-title">A small letter, tucked in paper</h2>
        </div>

        {!isOpen ? (
          <button
            type="button"
            className="envelope-card"
            onClick={() => onToggle(true)}
            aria-expanded="false"
          >
            <WashiTape color="gold" className="tape-top-center" />
            <div className="envelope-flap" aria-hidden="true" />
            <div className="wax-seal" aria-hidden="true">
              <span>R</span>
            </div>
            <div className="envelope-copy">
              <p className="handwritten envelope-label">
                For Rutika — open whenever you’re ready
              </p>
              <span className="envelope-cta">
                <MailOpen size={17} aria-hidden="true" />
                <span>Tap to unseal the letter</span>
              </span>
            </div>
          </button>
        ) : (
          <article className="letter-sheet" aria-live="polite">
            <PaperclipDoodle className="letter-paperclip" />
            <WashiTape color="blush" className="tape-top-left" />
            <WashiTape color="lavender" className="tape-bottom-right" />

            <div className="letter-header">
              <span className="handwritten letter-date">
                Birthday Edition • Handle with smiles
              </span>
              <button
                type="button"
                className="letter-fold-btn"
                onClick={() => onToggle(false)}
              >
                Fold back up
              </button>
            </div>

            <div className="letter-body">
              <p className="letter-greeting">{BIRTHDAY_LETTER.greeting}</p>
              {BIRTHDAY_LETTER.paragraphs.map((para, idx) => (
                <p key={idx} className="letter-paragraph">
                  {para}
                </p>
              ))}
            </div>

            <div className="letter-footer">
              <div>
                <p className="letter-signoff">{BIRTHDAY_LETTER.signOff}</p>
                <p className="handwritten letter-signature">
                  {BIRTHDAY_LETTER.signature}
                </p>
              </div>
              <div className="letter-sticker" aria-hidden="true">
                <DaisyDoodle size={36} />
                <Sparkles size={15} className="sticker-sparkle" />
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
