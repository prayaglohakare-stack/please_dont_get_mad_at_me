import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_FILTERS, PHOTOS } from '../data/scrapbookData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { SparkleStar, WashiTape } from './Doodles';

export function ScrapbookGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [ref, isVisible] = useRevealOnScroll();

  const filteredPhotos =
    activeFilter === 'all'
      ? PHOTOS
      : PHOTOS.filter((item) => item.category === activeFilter);

  const selectedPhoto =
    selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? 0 : (prev + 1) % filteredPhotos.length
        );
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? 0
            : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, filteredPhotos.length]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setSelectedIndex(null);
  };

  return (
    <section
      id="scrapbook"
      ref={ref}
      className={`section-block reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container">
        <div className="section-heading section-heading-center">
          <span className="eyebrow">The Scrapbook</span>
          <h2 className="section-title">
            Caught in the wild &amp; dressed to the nines
          </h2>
          <p className="section-lead">
            Tap any Polaroid to look closer. No curated studio perfection here —
            just real, funny, and genuinely lovely snapshots.
          </p>
        </div>

        <div
          className="filter-pills"
          role="tablist"
          aria-label="Filter scrapbook photos by mood"
        >
          {GALLERY_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              className={`filter-pill ${
                activeFilter === filter.id ? 'is-active' : ''
              }`}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="scrapbook-spread">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className={`polaroid-card polaroid-${photo.size}`}
              style={{ '--tilt': `${photo.tilt}deg` }}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Open photo: ${photo.caption}`}
            >
              {photo.tapePosition === 'top-corners' ? (
                <>
                  <WashiTape color={photo.tapeColor} className="tape-corner-l" />
                  <WashiTape color={photo.tapeColor} className="tape-corner-r" />
                </>
              ) : (
                <WashiTape
                  color={photo.tapeColor}
                  className={`tape-${photo.tapePosition}`}
                />
              )}

              <div className="polaroid-media">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{ objectPosition: photo.objectPosition }}
                />
                <span className="polaroid-zoom-badge" aria-hidden="true">
                  <Expand size={14} />
                </span>
              </div>

              <div className="polaroid-caption-wrap">
                <p className="handwritten polaroid-caption">{photo.caption}</p>
                {photo.id === 'saree-wink' && (
                  <SparkleStar size={16} color="#D49B4B" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPhoto &&
        createPortal(
          <div
            className="lightbox-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.caption}
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="lightbox-panel"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="lightbox-close"
                aria-label="Close photo view"
                onClick={() => setSelectedIndex(null)}
              >
                <X size={20} />
              </button>

              <div className="lightbox-image-wrap">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="lightbox-image"
                />
              </div>

              <div className="lightbox-meta">
                <span className="lightbox-counter">
                  Photo {selectedIndex + 1} of {filteredPhotos.length}
                </span>
                <h3 className="handwritten lightbox-caption">
                  {selectedPhoto.caption}
                </h3>
                <p className="lightbox-note">{selectedPhoto.note}</p>

                <div className="lightbox-nav">
                  <button
                    type="button"
                    className="lightbox-nav-btn"
                    aria-label="Previous photo"
                    onClick={() =>
                      setSelectedIndex(
                        (selectedIndex - 1 + filteredPhotos.length) %
                          filteredPhotos.length
                      )
                    }
                  >
                    <ChevronLeft size={18} />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    className="lightbox-nav-btn"
                    aria-label="Next photo"
                    onClick={() =>
                      setSelectedIndex(
                        (selectedIndex + 1) % filteredPhotos.length
                      )
                    }
                  >
                    <span>Next</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
