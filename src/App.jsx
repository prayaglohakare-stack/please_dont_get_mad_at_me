import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LetterSection } from './components/LetterSection';
import { AdventuresSection } from './components/AdventuresSection';
import { GuzarwadiSection } from './components/GuzarwadiSection';
import { ChocolateWaferSection } from './components/ChocolateWaferSection';
import { RutikaSoundboard } from './components/RutikaSoundboard';
import { ScrapbookGallery } from './components/ScrapbookGallery';
import { VideoArchive } from './components/VideoArchive';
import { SupportDepartment } from './components/SupportDepartment';
import { MidnightCinema } from './components/MidnightCinema';
import { EverydayAndAppreciation } from './components/EverydayAndAppreciation';
import { BirthdayCakeSurprise } from './components/BirthdayCakeSurprise';
import { DaisyDoodle } from './components/Doodles';

export default function App() {
  const [letterOpen, setLetterOpen] = useState(false);

  const handleOpenSurprise = () => {
    setLetterOpen(true);
    const letterEl = document.getElementById('letter');
    if (letterEl) {
      letterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="scrapbook-page">
      <Navbar />
      <main>
        <HeroSection onOpenSurprise={handleOpenSurprise} />
        <LetterSection isOpen={letterOpen} onToggle={setLetterOpen} />
        <AdventuresSection />
        <GuzarwadiSection />
        <ChocolateWaferSection />
        <RutikaSoundboard />
        <ScrapbookGallery />
        <VideoArchive />
        <SupportDepartment />
        <MidnightCinema />
        <EverydayAndAppreciation />
        <BirthdayCakeSurprise />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <DaisyDoodle size={24} />
          <p>
            Made for <strong>Rutika</strong> • “Yaar, kya cool ladki hai yaar.”
          </p>
        </div>
      </footer>
    </div>
  );
}
