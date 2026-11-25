import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#letter', label: 'The Note' },
  { href: '#adventures', label: 'AMK & Dreams' },
  { href: '#guzarwadi', label: 'Guzarwadi' },
  { href: '#wafer', label: 'Wafer & .exe' },
  { href: '#scrapbook', label: 'Scrapbook' },
  { href: '#motion', label: 'Videos' },
  { href: '#cinema', label: 'Cinema' },
  { href: '#wish', label: 'Make a Wish' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav-wrap">
      <nav className="site-nav" aria-label="Scrapbook sections">
        <a href="#top" className="nav-brand">
          <span className="nav-dot" aria-hidden="true" />
          <span>Rutika’s World</span>
        </a>

        <div className="nav-links-desktop">
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="nav-drawer">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-drawer-link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
