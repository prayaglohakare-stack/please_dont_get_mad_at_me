import React from 'react';
import { Film, MoonStar, Ticket } from 'lucide-react';
import { MIDNIGHT_CINEMA } from '../data/scrapbookData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { SparkleStar } from './Doodles';

export function MidnightCinema() {
  const [ref, isVisible] = useRevealOnScroll();

  return (
    <section
      id="cinema"
      ref={ref}
      className={`section-block cinema-section reveal ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <div className="container container-medium">
        <div className="cinema-panel">
          <SparkleStar size={18} color="#F5C74C" className="cinema-star-1" />
          <SparkleStar size={14} color="#F3BDC3" className="cinema-star-2" />

          <div className="cinema-header">
            <div className="cinema-moon-badge">
              <MoonStar size={15} aria-hidden="true" />
              <span>{MIDNIGHT_CINEMA.eyebrow}</span>
            </div>
            <h2 className="cinema-title">{MIDNIGHT_CINEMA.title}</h2>
            <p className="cinema-caption">{MIDNIGHT_CINEMA.caption}</p>
            <p className="cinema-atmosphere">{MIDNIGHT_CINEMA.atmosphere}</p>
          </div>

          <div className="tickets-grid">
            {MIDNIGHT_CINEMA.tickets.map((ticket) => (
              <article key={ticket.title} className="movie-ticket">
                <div className="ticket-stub">
                  <Ticket size={16} aria-hidden="true" />
                  <span>{ticket.admit}</span>
                </div>
                <div className="ticket-body">
                  <span className="ticket-tag">
                    <Film size={13} aria-hidden="true" />
                    <span>{ticket.tag}</span>
                  </span>
                  <h3 className="ticket-title">{ticket.title}</h3>
                  <p className="handwritten ticket-note">{ticket.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
