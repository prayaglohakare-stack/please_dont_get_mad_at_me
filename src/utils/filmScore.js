// Original 8-movement Web Audio film score following the emotional arc:
// wonder -> adventure -> nostalgia -> chaos -> warmth -> quiet memories -> dreams -> celebration.
// Each movement is an original ambient/instrumental composition inspired by the broad mood
// of the referenced film scenes, without imitating any copyrighted melody.

const FREQ = {
  C3: 130.81, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61, G3: 196.0, Ab3: 207.65, A3: 220.0, Bb3: 233.08, B3: 246.94,
  C4: 261.63, Db4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.0, Ab4: 415.3, A4: 440.0, Bb4: 466.16, B4: 493.88,
  C5: 523.25, Db5: 554.37, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, Ab5: 830.61, A5: 880.0, B5: 987.77,
};

export const SCORE_MOVEMENTS = [
  {
    id: 'wonder',
    number: '01',
    arc: 'Wonder',
    title: 'Opening Credits',
    inspiredBy: 'Aashiyan (Barfi!) mood',
    description: 'Breezy plucked bells and gentle acoustic warmth for the opening scene.',
    sectionIds: ['top', 'letter'],
    stepMs: 360,
    timbre: 'celesta',
    filterHz: 2100,
    steps: [
      { m: 'F4', h: 'F3', d: 1.4 }, { m: 'A4' }, { m: 'C5', d: 1.6 }, { m: 'D5' },
      { m: 'C5', h: 'C3', d: 1.4 }, { m: 'A4' }, { m: 'G4', d: 1.8 }, null,
      { m: 'Bb4', h: 'Bb3', d: 1.4 }, { m: 'D5' }, { m: 'F5', d: 1.6 }, { m: 'D5' },
      { m: 'C5', h: 'C3', d: 1.8 }, { m: 'A4' }, { m: 'F4', h: 'F3', d: 2.4 }, null,
    ],
  },
  {
    id: 'adventure',
    number: '02',
    arc: 'Adventure',
    title: 'Trail to AMK',
    inspiredBy: 'Ilahi (Yeh Jawaani Hai Deewani) mood',
    description: 'Open-road acoustic pulse and bright mountain-air momentum.',
    sectionIds: ['adventures'],
    stepMs: 280,
    timbre: 'acoustic',
    filterHz: 2300,
    steps: [
      { m: 'G4', h: 'C3', d: 1.2 }, { m: 'C5' }, { m: 'E5' }, { m: 'G5', d: 1.4 },
      { m: 'E5', h: 'G3' }, { m: 'D5' }, { m: 'C5', d: 1.6 }, null,
      { m: 'A4', h: 'A3', d: 1.2 }, { m: 'C5' }, { m: 'E5' }, { m: 'F5', d: 1.4 },
      { m: 'E5', h: 'F3' }, { m: 'D5' }, { m: 'C5', h: 'C3', d: 2.2 }, null,
    ],
  },
  {
    id: 'nostalgia',
    number: '03',
    arc: 'Nostalgia',
    title: 'Sunlight at Guzarwadi',
    inspiredBy: 'Iktara (Wake Up Sid) mood',
    description: 'Golden-hour drone with unhurried plucked strings that linger.',
    sectionIds: ['guzarwadi'],
    stepMs: 520,
    timbre: 'harp',
    filterHz: 1550,
    steps: [
      { m: 'A4', h: 'D3', d: 2.6 }, { m: 'Fs4', d: 1.8 }, { m: 'E4', d: 2.2 }, null,
      { m: 'D4', h: 'G3', d: 2.2 }, { m: 'Fs4' }, { m: 'A4', d: 2.5 }, null,
      { m: 'B4', h: 'B3', d: 2.4 }, { m: 'A4' }, { m: 'Fs4', h: 'A3', d: 2.2 }, null,
      { m: 'E4', h: 'D3', d: 2.4 }, { m: 'D4', d: 3.0 }, null, null,
    ],
  },
  {
    id: 'chaos',
    number: '04',
    arc: 'Chaos',
    title: 'Rutika.exe & Mischief',
    inspiredBy: 'Ala Barfi (Barfi!) mood',
    description: 'Playful staccato skips and bouncy comedy cues for her chaotic side.',
    sectionIds: ['wafer', 'soundboard', 'scrapbook'],
    stepMs: 240,
    timbre: 'marimba',
    filterHz: 2500,
    steps: [
      { m: 'G4', h: 'G3', d: 0.7 }, null, { m: 'B4', d: 0.7 }, { m: 'D5', d: 0.8 },
      { m: 'E5', h: 'C3', d: 0.7 }, null, { m: 'D5', d: 0.7 }, { m: 'B4', d: 0.8 },
      { m: 'A4', h: 'D3', d: 0.7 }, { m: 'C5', d: 0.7 }, { m: 'B4', d: 0.7 }, { m: 'G4', d: 0.8 },
      { m: 'Fs4', h: 'D3', d: 0.8 }, { m: 'A4', d: 0.7 }, { m: 'G4', h: 'G3', d: 1.4 }, null,
    ],
  },
  {
    id: 'warmth',
    number: '05',
    arc: 'Warmth',
    title: 'Everyday Sunshine',
    inspiredBy: 'Love You Zindagi (Dear Zindagi) mood',
    description: 'Easy-going sunny chords and light flute-like warmth for everyday company.',
    sectionIds: ['motion', 'everyday'],
    stepMs: 320,
    timbre: 'flute',
    filterHz: 1950,
    steps: [
      { m: 'B4', h: 'G3', d: 1.5 }, { m: 'D5' }, { m: 'G5', d: 1.6 }, { m: 'E5' },
      { m: 'D5', h: 'C3', d: 1.5 }, { m: 'C5' }, { m: 'B4', d: 1.8 }, null,
      { m: 'A4', h: 'A3', d: 1.5 }, { m: 'C5' }, { m: 'E5', d: 1.5 }, { m: 'D5' },
      { m: 'B4', h: 'D3', d: 1.8 }, { m: 'A4' }, { m: 'G4', h: 'G3', d: 2.3 }, null,
    ],
  },
  {
    id: 'quiet',
    number: '06',
    arc: 'Quiet Memories',
    title: 'Midnight Cinema',
    inspiredBy: 'Phir Le Aya Dil (Reprise) (Barfi!) mood',
    description: 'Velvety midnight felt-piano for late-night movies and calm study calls.',
    sectionIds: ['support', 'cinema'],
    stepMs: 560,
    timbre: 'piano',
    filterHz: 1350,
    steps: [
      { m: 'G4', h: 'Eb3', d: 2.6 }, { m: 'Bb4', d: 2.0 }, { m: 'D5', d: 2.4 }, null,
      { m: 'C5', h: 'C3', d: 2.4 }, { m: 'Bb4' }, { m: 'Ab4', h: 'Ab3', d: 2.6 }, null,
      { m: 'G4', h: 'Bb3', d: 2.2 }, { m: 'F4' }, { m: 'Eb4', d: 2.4 }, null,
      { m: 'F4', h: 'Bb3', d: 2.2 }, { m: 'Eb4', h: 'Eb3', d: 3.1 }, null, null,
    ],
  },
  {
    id: 'dreams',
    number: '07',
    arc: 'Dreams',
    title: 'Higher Than Everest',
    inspiredBy: 'Safarnama (Tamasha) mood',
    description: 'Horizon-gazing arpeggios and quiet lift for ambitions without a ceiling.',
    sectionIds: ['appreciate'],
    stepMs: 410,
    timbre: 'padPluck',
    filterHz: 1850,
    steps: [
      { m: 'E4', h: 'A3', d: 2.2 }, { m: 'A4' }, { m: 'Db5', d: 2.0 }, { m: 'E5', d: 2.2 },
      { m: 'Db5', h: 'E3', d: 2.0 }, { m: 'B4' }, { m: 'A4', d: 2.2 }, null,
      { m: 'Fs4', h: 'D3', d: 2.0 }, { m: 'A4' }, { m: 'D5', d: 2.0 }, { m: 'E5', d: 2.2 },
      { m: 'Db5', h: 'E3', d: 2.2 }, { m: 'B4' }, { m: 'A4', h: 'A3', d: 2.8 }, null,
    ],
  },
  {
    id: 'celebration',
    number: '08',
    arc: 'Celebration',
    title: 'Keep Dreaming Big',
    inspiredBy: 'Khaabon Ke Parinday (ZNMD) mood',
    description: 'Airy, shimmering chords and open-sky bells for the birthday wish.',
    sectionIds: ['wish'],
    stepMs: 310,
    timbre: 'celesta',
    filterHz: 2400,
    steps: [
      { m: 'E4', h: 'E3', d: 1.5 }, { m: 'Ab4' }, { m: 'B4', d: 1.6 }, { m: 'E5', d: 1.8 },
      { m: 'Db5', h: 'Db4', d: 1.6 }, { m: 'B4' }, { m: 'Ab4', d: 1.8 }, null,
      { m: 'A4', h: 'A3', d: 1.5 }, { m: 'Db5' }, { m: 'E5', d: 1.6 }, { m: 'Fs5', d: 1.8 },
      { m: 'E5', h: 'B3', d: 1.8 }, { m: 'Eb5' }, { m: 'E5', h: 'E3', d: 2.6 }, null,
    ],
  },
];

export class FilmScoreEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.filter = null;
    this.timerId = null;
    this.transitionTimerId = null;
    this.stepIndex = 0;
    this.movementIndex = 0;
    this.isPlaying = false;
    this.volume = 0.55;
    this.isMuted = false;
  }

  static isSupported() {
    return (
      typeof window !== 'undefined' &&
      Boolean(window.AudioContext || window.webkitAudioContext)
    );
  }

  ensureContext() {
    if (!FilmScoreEngine.isSupported()) return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.0001;

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.value = 1900;

      const delay = this.ctx.createDelay();
      delay.delayTime.value = 0.28;
      const delayGain = this.ctx.createGain();
      delayGain.gain.value = 0.22;

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

  targetGain() {
    return this.isMuted ? 0.0001 : Math.max(0.0001, this.volume * 0.36);
  }

  rampMaster(toValue, seconds = 0.45) {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(Math.max(0.0001, this.master.gain.value), now);
    this.master.gain.linearRampToValueAtTime(toValue, now + seconds);
  }

  playVoice(freq, durationSec, timbre, isHarmony = false) {
    if (!this.ctx || !this.filter) return;
    const now = this.ctx.currentTime;

    const oscA = this.ctx.createOscillator();
    const oscB = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    if (timbre === 'marimba') {
      oscA.type = 'sine';
      oscB.type = 'triangle';
      oscB.frequency.setValueAtTime(freq * 2, now);
    } else if (timbre === 'piano' || timbre === 'harp') {
      oscA.type = 'triangle';
      oscB.type = 'sine';
      oscB.frequency.setValueAtTime(freq, now);
    } else if (timbre === 'flute') {
      oscA.type = 'sine';
      oscB.type = 'sine';
      oscB.frequency.setValueAtTime(freq * 1.002, now);
    } else {
      oscA.type = 'triangle';
      oscB.type = 'sine';
      oscB.frequency.setValueAtTime(freq * 2, now);
    }

    oscA.frequency.setValueAtTime(freq, now);

    const attack = timbre === 'flute' || timbre === 'padPluck' ? 0.06 : 0.02;
    const peak = isHarmony ? 0.14 : timbre === 'marimba' ? 0.24 : 0.22;

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(peak, now + attack);
    env.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    oscA.connect(env);
    oscB.connect(env);
    env.connect(this.filter);

    oscA.start(now);
    oscB.start(now);
    oscA.stop(now + durationSec + 0.05);
    oscB.stop(now + durationSec + 0.05);
  }

  tick() {
    if (!this.isPlaying) return;
    const movement = SCORE_MOVEMENTS[this.movementIndex] || SCORE_MOVEMENTS[0];
    const step = movement.steps[this.stepIndex];

    if (this.filter && this.ctx) {
      this.filter.frequency.setTargetAtTime(
        movement.filterHz,
        this.ctx.currentTime,
        0.15
      );
    }

    if (step) {
      const dur = (step.d || 1) * (movement.stepMs / 1000) * 1.5;
      if (step.m && FREQ[step.m]) {
        this.playVoice(FREQ[step.m], dur, movement.timbre, false);
      }
      if (step.h && FREQ[step.h]) {
        this.playVoice(FREQ[step.h], dur * 1.45, 'piano', true);
      }
    }

    this.stepIndex = (this.stepIndex + 1) % movement.steps.length;
    this.timerId = window.setTimeout(() => this.tick(), movement.stepMs);
  }

  start(movementIndex = this.movementIndex) {
    if (!this.ensureContext()) return false;
    this.clearTimers();
    this.movementIndex = movementIndex % SCORE_MOVEMENTS.length;
    this.isPlaying = true;
    this.rampMaster(this.targetGain(), 0.55);
    this.tick();
    return true;
  }

  pause() {
    this.isPlaying = false;
    this.clearTimers();
    this.rampMaster(0.0001, 0.3);
  }

  switchMovement(nextIndex, shouldPlay = this.isPlaying) {
    const normalized =
      ((nextIndex % SCORE_MOVEMENTS.length) + SCORE_MOVEMENTS.length) %
      SCORE_MOVEMENTS.length;

    if (!shouldPlay) {
      this.movementIndex = normalized;
      this.stepIndex = 0;
      return;
    }

    // Smooth crossfade transition between movements
    this.clearTimers();
    this.rampMaster(0.0001, 0.35);
    this.transitionTimerId = window.setTimeout(() => {
      this.movementIndex = normalized;
      this.stepIndex = 0;
      this.isPlaying = true;
      this.rampMaster(this.targetGain(), 0.55);
      this.tick();
    }, 360);
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.isPlaying) {
      this.rampMaster(this.targetGain(), 0.12);
    }
  }

  setMuted(muted) {
    this.isMuted = Boolean(muted);
    if (this.isPlaying) {
      this.rampMaster(this.targetGain(), 0.18);
    }
  }

  clearTimers() {
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.transitionTimerId !== null) {
      window.clearTimeout(this.transitionTimerId);
      this.transitionTimerId = null;
    }
  }

  destroy() {
    this.isPlaying = false;
    this.clearTimers();
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}
