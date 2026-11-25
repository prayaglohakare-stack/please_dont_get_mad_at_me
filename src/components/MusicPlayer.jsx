import React, { useEffect, useRef, useState } from 'react';
import { Disc3, Music2, Pause, Play, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { MusicBoxEngine, SYNTH_TRACKS } from '../utils/musicBox';

// Drop any .mp3 / .m4a / .wav / .ogg file into src/assets/audio/ to use it automatically.
const bundledAudioModules = import.meta.glob(
  '../assets/audio/*.{mp3,m4a,wav,ogg}',
  { eager: true, import: 'default' }
);
const customAudioUrl = Object.values(bundledAudioModules)[0] || null;

export function MusicPlayer({ externalPlaySignal = 0 }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const hasCustomAudio = Boolean(customAudioUrl);
  const engineRef = useRef(null);
  const audioRef = useRef(null);
  const lastSignalRef = useRef(0);

  useEffect(() => {
    const engine = new MusicBoxEngine();
    engineRef.current = engine;
    return () => {
      engine.destroy();
    };
  }, []);

  // Pause background music automatically whenever a video clip plays
  useEffect(() => {
    const handleMediaPlay = (event) => {
      if (event.target && event.target.tagName === 'VIDEO') {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
        if (engineRef.current) {
          engineRef.current.pause();
        }
        setIsPlaying(false);
      }
    };

    document.addEventListener('play', handleMediaPlay, true);
    return () => document.removeEventListener('play', handleMediaPlay, true);
  }, []);

  // Start softly when triggered by "Open your little surprise"
  useEffect(() => {
    if (externalPlaySignal > lastSignalRef.current) {
      lastSignalRef.current = externalPlaySignal;
      startPlayback();
    }
  }, [externalPlaySignal]);

  const startPlayback = () => {
    if (hasCustomAudio && audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = 0.55;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
      return;
    }

    if (engineRef.current) {
      engineRef.current.setVolume(isMuted ? 0 : 0.55);
      engineRef.current.start(trackIndex);
      setIsPlaying(true);
    }
  };

  const pausePlayback = () => {
    if (hasCustomAudio && audioRef.current) {
      audioRef.current.pause();
    }
    if (engineRef.current) {
      engineRef.current.pause();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    if (engineRef.current) {
      engineRef.current.setVolume(nextMuted ? 0 : 0.55);
    }
  };

  const nextTrack = () => {
    const nextIdx = (trackIndex + 1) % SYNTH_TRACKS.length;
    setTrackIndex(nextIdx);
    if (engineRef.current) {
      engineRef.current.setTrack(nextIdx);
    }
  };

  const currentTrack = SYNTH_TRACKS[trackIndex];

  return (
    <div className={`music-dock ${expanded ? 'is-expanded' : ''}`}>
      {hasCustomAudio && (
        <audio ref={audioRef} src={customAudioUrl} loop preload="none" />
      )}

      <div className="music-pill" role="region" aria-label="Birthday soundtrack player">
        <button
          type="button"
          className={`music-disc-btn ${isPlaying ? 'is-spinning' : ''}`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          title={isPlaying ? 'Pause music' : 'Play birthday tune'}
        >
          <Disc3 size={20} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="music-meta-btn"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label="Toggle soundtrack details"
        >
          <span className="music-title">
            {hasCustomAudio ? 'Rutika’s Birthday Song' : currentTrack.title}
          </span>
          <span className="music-sub">
            {isPlaying
              ? isMuted
                ? 'Muted'
                : 'Playing softly'
              : hasCustomAudio
              ? 'Tap disc to play'
              : `${currentTrack.subtitle} • Tap to play`}
          </span>
        </button>

        <div className="music-controls">
          <button
            type="button"
            className="music-icon-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>

          {!hasCustomAudio && (
            <button
              type="button"
              className="music-icon-btn"
              onClick={nextTrack}
              aria-label="Switch melody"
              title="Switch melody"
            >
              <SkipForward size={15} />
            </button>
          )}

          <button
            type="button"
            className="music-icon-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="music-popover">
          <p className="music-popover-title">
            <Music2 size={14} aria-hidden="true" />
            <span>Scrapbook Soundtrack</span>
          </p>
          <p className="music-popover-note">
            {hasCustomAudio
              ? 'Playing your custom birthday track. Music pauses automatically whenever you play a video clip.'
              : 'Playing a gentle built-in tune so nothing ever breaks. Want a specific song instead? Drop any MP3 into src/assets/audio/ and rebuild!'}
          </p>
        </div>
      )}
    </div>
  );
}
