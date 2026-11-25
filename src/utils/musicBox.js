// Gentle Web Audio API music-box & warm felt-piano engine.
// Used when no custom MP3 file is provided in public/media/audio/song.mp3.

const NOTE_FREQ = {
  C3: 130.81,
  D3: 146.83,
  F3: 174.61,
  G3: 196.0,
  A3: 220.0,
  Bb3: 233.08,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  Bb4: 466.16,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
};

export const SYNTH_TRACKS = [
  {
    id: 'birthday',
    title: 'Happy Birthday (Music Box)',
    subtitle: 'Built-in warm chime',
    stepMs: 360,
    steps: [
      { melody: 'C4', harmony: 'F3' },
      { melody: 'C4' },
      { melody: 'D4', duration: 1.5 },
      { melody: 'C4', duration: 1.5 },
      { melody: 'F4', harmony: 'F3', duration: 1.5 },
      { melody: 'E4', duration: 2.6 },
      null,
      { melody: 'C4', harmony: 'C3' },
      { melody: 'C4' },
      { melody: 'D4', duration: 1.5 },
      { melody: 'C4', duration: 1.5 },
      { melody: 'G4', harmony: 'G3', duration: 1.5 },
      { melody: 'F4', duration: 2.6 },
      null,
      { melody: 'C4', harmony: 'F3' },
      { melody: 'C4' },
      { melody: 'C5', duration: 1.5 },
      { melody: 'A4', harmony: 'D3', duration: 1.5 },
      { melody: 'F4', duration: 1.5 },
      { melody: 'E4', duration: 1.5 },
      { melody: 'D4', harmony: 'Bb3', duration: 2.5 },
      null,
      { melody: 'Bb4', harmony: 'Bb3' },
      { melody: 'Bb4' },
      { melody: 'A4', harmony: 'F3', duration: 1.5 },
      { melody: 'F4', duration: 1.5 },
      { melody: 'G4', harmony: 'C3', duration: 1.5 },
      { melody: 'F4', harmony: 'F3', duration: 3.2 },
      null,
      null,
    ],
  },
  {
    id: 'daydream',
    title: 'Afternoon Scrapbook',
    subtitle: 'Soft lo-fi chords',
    stepMs: 460,
    steps: [
      { melody: 'A4', harmony: 'F3', duration: 2.2 },
      { melody: 'C5' },
      { melody: 'E5', duration: 1.8 },
      { melody: 'C5' },
      { melody: 'F4', harmony: 'D3', duration: 2.2 },
      { melody: 'A4' },
      { melody: 'C5', duration: 1.8 },
      { melody: 'A4' },
      { melody: 'D4', harmony: 'Bb3', duration: 2.2 },
      { melody: 'F4' },
      { melody: 'A4', duration: 1.8 },
      { melody: 'D5' },
      { melody: 'G4', harmony: 'C3', duration: 2.2 },
      { melody: 'E4' },
      { melody: 'G4', duration: 1.8 },
      { melody: 'C5' },
    ],
  },
];

export class MusicBoxEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.filter = null;
    this.timerId = null;
    this.stepIndex = 0;
    this.trackIndex = 0;
    this.isPlaying = false;
    this.volume = 0.55;
  }

  ensureContext() {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.volume * 0.35;

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.value = 1750;

      // Subtle warm delay echo
      const delay = this.ctx.createDelay();
      delay.delayTime.value = 0.26;
      const delayGain = this.ctx.createGain();
      delayGain.gain.value = 0.2;

      this.filter.connect(this.master);
      this.filter.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(this.master);
      this.master.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  playTone(freq, durationSec = 1.0, level = 0.26) {
    if (!this.ctx || !this.filter) return;
    const now = this.ctx.currentTime;

    const oscMain = this.ctx.createOscillator();
    const oscWarm = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    oscMain.type = 'triangle';
    oscMain.frequency.setValueAtTime(freq, now);

    oscWarm.type = 'sine';
    oscWarm.frequency.setValueAtTime(freq, now);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(level, now + 0.025);
    env.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    oscMain.connect(env);
    oscWarm.connect(env);
    env.connect(this.filter);

    oscMain.start(now);
    oscWarm.start(now);
    oscMain.stop(now + durationSec + 0.05);
    oscWarm.stop(now + durationSec + 0.05);
  }

  tick() {
    if (!this.isPlaying) return;
    const track = SYNTH_TRACKS[this.trackIndex] || SYNTH_TRACKS[0];
    const step = track.steps[this.stepIndex];

    if (step) {
      const dur = (step.duration || 1) * (track.stepMs / 1000) * 1.45;
      if (step.melody && NOTE_FREQ[step.melody]) {
        this.playTone(NOTE_FREQ[step.melody], dur, 0.24);
      }
      if (step.harmony && NOTE_FREQ[step.harmony]) {
        this.playTone(NOTE_FREQ[step.harmony], dur * 1.35, 0.14);
      }
    }

    this.stepIndex = (this.stepIndex + 1) % track.steps.length;
    this.timerId = window.setTimeout(() => this.tick(), track.stepMs);
  }

  start(trackIndex = this.trackIndex) {
    this.ensureContext();
    this.stopTimer();
    this.trackIndex = trackIndex;
    this.isPlaying = true;
    this.tick();
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
  }

  setTrack(trackIndex) {
    const wasPlaying = this.isPlaying;
    this.pause();
    this.trackIndex = trackIndex % SYNTH_TRACKS.length;
    this.stepIndex = 0;
    if (wasPlaying) {
      this.start(this.trackIndex);
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(
        this.volume * 0.35,
        this.ctx.currentTime,
        0.04
      );
    }
  }

  stopTimer() {
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  destroy() {
    this.pause();
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}
