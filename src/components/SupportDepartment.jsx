import React from 'react';
import { BookOpenCheck, ShieldCheck } from 'lucide-react';
import { SUPPORT_DEPARTMENT } from '../data/scrapbookData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { PaperclipDoodle, WashiTape } from './Doodles';

export function SupportDepartment() {
  const [ref, isVisible] = useRevealOnScroll();

  return (
    <section
      id="support"
      ref={ref}
      className={`section-block section-tinted reveal ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <div className="container container-medium">
        <div className="section-heading section-heading-center">
          <span className="eyebrow">{SUPPORT_DEPARTMENT.eyebrow}</span>
          <h2 className="section-title">{SUPPORT_DEPARTMENT.title}</h2>
          <p className="section-lead">{SUPPORT_DEPARTMENT.intro}</p>
        </div>

        <div className="support-badges" aria-label="Support department roles">
          {SUPPORT_DEPARTMENT.badges.map((badge) => (
            <span key={badge} className="support-badge">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>{badge}</span>
            </span>
          ))}
        </div>

        <article className="support-keepsake-card">
          <PaperclipDoodle className="support-paperclip" />
          <WashiTape color="blush" className="tape-top-left" />

          <div className="support-keepsake-head">
            <BookOpenCheck size={18} aria-hidden="true" />
            <span>{SUPPORT_DEPARTMENT.keepsakeLabel}</span>
          </div>

          <blockquote className="support-keepsake-quote">
            {SUPPORT_DEPARTMENT.keepsakeQuote}
          </blockquote>

          <p className="support-keepsake-details">
            {SUPPORT_DEPARTMENT.keepsakeDetails}
          </p>
        </article>
      </div>
    </section>
  );
}
