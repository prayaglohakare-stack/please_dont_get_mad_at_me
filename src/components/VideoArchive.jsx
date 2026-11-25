import React, { useRef } from 'react';
import { Film } from 'lucide-react';
import { VIDEOS } from '../data/scrapbookData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { WashiTape } from './Doodles';

export function VideoArchive() {
  const [ref, isVisible] = useRevealOnScroll();
  const startedClips = useRef(new Set());

  const handleFirstPlay = (clipId, event) => {
    if (!startedClips.current.has(clipId)) {
      startedClips.current.add(clipId);
      event.currentTarget.currentTime = 0;
    }
  };

  return (
    <section
      id="motion"
      ref={ref}
      className={`section-block section-tinted reveal ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <div className="container">
        <div className="section-heading section-heading-center">
          <span className="eyebrow">Memories in Motion</span>
          <h2 className="section-title">The mini video archive</h2>
          <p className="section-lead">
            Three short clips that capture your comedic timing way better than
            any still photograph could. Hit play whenever you need a laugh.
          </p>
        </div>

        <div className="video-archive-grid">
          {VIDEOS.map((clip, idx) => (
            <article key={clip.id} className={`reel-card reel-${clip.accent}`}>
              <WashiTape
                color={clip.accent}
                className={idx % 2 === 0 ? 'tape-top-left' : 'tape-top-right'}
              />

              <div className="reel-header">
                <span className="reel-badge">
                  <Film size={13} aria-hidden="true" />
                  <span>{clip.clipLabel}</span>
                </span>
              </div>

              <div className="reel-frame">
                <video
                  src={`${clip.src}#t=${clip.previewTime ?? 0.2}`}
                  controls
                  preload="metadata"
                  playsInline
                  onPlay={(event) => handleFirstPlay(clip.id, event)}
                  aria-label={`${clip.title} — ${clip.caption}`}
                  className="reel-video"
                />
              </div>

              <div className="reel-body">
                <h3 className="reel-title">{clip.title}</h3>
                <p className="reel-caption">{clip.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
