import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Disc3,
  Film,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { FilmScoreEngine, SCORE_MOVEMENTS } from '../utils/filmScore';

// Optional: drop your own properly licensed MP3/WAV/OGG track into src/assets/audio/
const bundledAudioModules = import.meta.glob(
  '../assets/audio/*.{mp3,m4a,wav,ogg}',
  { eager: true, import: 'default' }
);
const customAudioUrl = Object.values(bundledAudioModules)[0] || null;

export function MusicPlayer({ externalPlaySignal = 0 }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [movementIndex, setMovementIndex] = useState(0);
  const [suggestedIndex, setSuggestedIndex] = useState(0);
  const [autoFollowScenes, setAutoFollowScenes] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [audioUnavailable, setAudioUnavailable] = useState(false);

  const hasCustomAudio = Boolean(customAudioUrl);
  const engineRef = useRef(null);
  const audioRef = useRef(null);
  const lastSignalRef = useRef(0);
  const isPlayingRef = useRef(false);
  const movementIndexRef = useRef(0);
  const autoFollowRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    movementIndexRef.current = movementIndex;
  }, [movementIndex]);

  useEffect(() => {
    autoFollowRef.current = autoFollowScenes;
  }, [autoFollowScenes]);

  useEffect(() => {
    if (!hasCustomAudio && !FilmScoreEngine.isSupported()) {
      setAudioUnavailable(true);
      return undefined;
    }

    const engine = new FilmScoreEngine();
    engineRef.current = engine;
    return () => {
      engine.destroy();
    };
  }, [hasCustomAudio]);

  // Pause film score cleanly when a video clip in Memories in Motion starts playing
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

  // Track active chapter/section while scrolling to surface scene-matched suggestions
  useEffect(() => {
    if (hasCustomAudio || typeof IntersectionObserver === 'undefined') return undefined;

    const sectionToMovement = new Map();
    SCORE_MOVEMENTS.forEach((mov, idx) => {
      mov.sectionIds.forEach((id) => sectionToMovement.set(id, idx));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const matchedIdx = sectionToMovement.get(visible.target.id);
        if (typeof matchedIdx === 'number') {
          setSuggestedIndex(matchedIdx);
          if (
            autoFollowRef.current &&
            isPlayingRef.current &&
            matchedIdx !== movementIndexRef.current &&
            engineRef.current
          ) {
            setMovementIndex(matchedIdx);
            engineRef.current.switchMovement(matchedIdx, true);
          }
        }
      },
      { threshold: [0.25, 0.55], rootMargin: '-15% 0px -30% 0px' }
    );

    sectionToMovement.forEach((_, id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasCustomAudio]);

  // User-initiated start from Hero "Open your little surprise" CTA
  useEffect(() => {
    if (externalPlaySignal > lastSignalRef.current) {
      lastSignalRef.current = externalPlaySignal;
      startPlayback(movementIndexRef.current);
    }
  }, [externalPlaySignal]);

  const startPlayback = (targetIdx = movementIndex) => {
    if (hasCustomAudio && audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => {
          setAudioUnavailable(false);
          setIsPlaying(true);
        })
        .catch(() => setAudioUnavailable(true));
      return;
    }

    if (engineRef.current) {
      engineRef.current.setVolume(volume);
      engineRef.current.setMuted(isMuted);
      const ok = engineRef.current.start(targetIdx);
      if (ok) {
        setIsPlaying(true);
      } else {
        setAudioUnavailable(true);
      }
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
      startPlayback(movementIndex);
    }
  };

  const selectMovement = (idx, autoplayIfPaused = true) => {
    const normalized =
      ((idx % SCORE_MOVEMENTS.length) + SCORE_MOVEMENTS.length) %
      SCORE_MOVEMENTS.length;
    setMovementIndex(normalized);

    if (engineRef.current) {
      if (isPlaying || autoplayIfPaused) {
        if (!isPlaying) {
          engineRef.current.setVolume(volume);
          engineRef.current.setMuted(isMuted);
          engineRef.current.start(normalized);
          setIsPlaying(true);
        } else {
          engineRef.current.switchMovement(normalized, true);
        }
      } else {
        engineRef.current.switchMovement(normalized, false);
      }
    }
  };

  const handleVolumeChange = (event) => {
    const nextVol = parseFloat(event.target.value);
    setVolume(nextVol);
    if (nextVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = nextVol;
      audioRef.current.muted = nextVol === 0;
    }
    if (engineRef.current) {
      engineRef.current.setVolume(nextVol);
      if (nextVol > 0 && isMuted) {
        engineRef.current.setMuted(false);
      }
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    if (engineRef.current) {
      engineRef.current.setMuted(nextMuted);
    }
  };

  const currentMovement = SCORE_MOVEMENTS[movementIndex];
  const suggestedMovement = SCORE_MOVEMENTS[suggestedIndex];
  const showSceneCue =
    !hasCustomAudio &&
    !autoFollowScenes &&
    suggestedIndex !== movementIndex;

  return (
    <div className={`music-dock ${drawerOpen ? 'is-expanded' : ''}`}>
      {hasCustomAudio && (
        <audio
          ref={audioRef}
          src={customAudioUrl}
          loop
          preload="none"
          onError={() => setAudioUnavailable(true)}
        />
      )}

      {showSceneCue && (
        <button
          type="button"
          className="scene-cue-pill"
          onClick={() => selectMovement(suggestedIndex, true)}
        >
          <Sparkles size={13} aria-hidden="true" />
          <span>
            Scene cue: <strong>{suggestedMovement.title}</strong> ({suggestedMovement.arc})
          </span>
        </button>
      )}

      {drawerOpen && (
        <div
          className="score-drawer"
          role="dialog"
          aria-label="Film soundtrack movements"
        >
          <div className="score-drawer-head">
            <div>
              <span className="score-drawer-kicker">
                <Film size={13} aria-hidden="true" />
                <span>Original Coming-of-Age Film Score</span>
              </span>
              <p className="score-drawer-arc">
                Wonder → Adventure → Nostalgia → Chaos → Warmth → Quiet → Dreams → Celebration
              </p>
            </div>
          </div>

          {audioUnavailable ? (
            <p className="score-unavailable">
              Audio playback is unavailable in this browser environment, so visual chapters continue silently.
            </p>
          ) : (
            <>
              <div className="score-volume-row">
                <label htmlFor="score-volume" className="score-volume-label">
                  Volume
                </label>
                <input
                  id="score-volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="score-volume-slider"
                />
                {!hasCustomAudio && (
                  <label className="score-autofollow-toggle">
                    <input
                      type="checkbox"
                      checked={autoFollowScenes}
                      onChange={(e) => setAutoFollowScenes(e.target.checked)}
                    />
                    <span>Follow scenes</span>
                  </label>
                )}
              </div>

              {!hasCustomAudio && (
                <ul className="score-track-list">
                  {SCORE_MOVEMENTS.map((mov, idx) => {
                    const active = idx === movementIndex;
                    const suggested = idx === suggestedIndex && !active;
                    return (
                      <li key={mov.id}>
                        <button
                          type="button"
                          className={`score-track-btn ${active ? 'is-active' : ''}`}
                          onClick={() => selectMovement(idx, true)}
                        >
                          <span className="score-track-num">{mov.number}</span>
                          <span className="score-track-info">
                            <span className="score-track-name">
                              {mov.title}
                              {suggested && (
                                <span className="score-here-tag">Current scene</span>
                              )}
                            </span>
                            <span className="score-track-cue">
                              {mov.arc} • {mov.inspiredBy}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </div>
      )}

      <div
        className="music-pill"
        role="region"
        aria-label="Film soundtrack mini-player"
      >
        <button
          type="button"
          className={`music-disc-btn ${isPlaying ? 'is-spinning' : ''}`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
          title={isPlaying ? 'Pause soundtrack' : 'Play film score'}
        >
          <Disc3 size={20} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="music-meta-btn"
          onClick={() => setDrawerOpen((prev) => !prev)}
          aria-expanded={drawerOpen}
          aria-label="Open film score tracklist and volume"
        >
          <span className="music-title">
            {hasCustomAudio
              ? 'Rutika’s Film Track'
              : `${currentMovement.number} • ${currentMovement.title}`}
          </span>
          <span className="music-sub">
            {audioUnavailable
              ? 'Audio unavailable'
              : isPlaying
              ? isMuted
                ? 'Muted'
                : `${currentMovement.arc} • ${currentMovement.inspiredBy}`
              : `${currentMovement.arc} • Tap play`}
          </span>
        </button>

        <div className="music-controls">
          {!hasCustomAudio && (
            <button
              type="button"
              className="music-icon-btn"
              onClick={() => selectMovement(movementIndex - 1, true)}
              aria-label="Previous movement"
              title="Previous movement"
            >
              <SkipBack size={14} />
            </button>
          )}

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
              onClick={() => selectMovement(movementIndex + 1, true)}
              aria-label="Next movement"
              title="Next movement"
            >
              <SkipForward size={14} />
            </button>
          )}

          <button
            type="button"
            className="music-icon-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute soundtrack' : 'Mute soundtrack'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            type="button"
            className="music-icon-btn"
            onClick={() => setDrawerOpen((prev) => !prev)}
            aria-label={drawerOpen ? 'Hide score drawer' : 'Show score drawer'}
            title="Tracklist & volume"
          >
            {drawerOpen ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}
