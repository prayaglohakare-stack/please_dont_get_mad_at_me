# A Little World of Rutika — Personal Birthday Scrapbook

A handcrafted, interactive birthday website made specifically for **Rutika**, built with React and Vite.

## What's Inside

- **Opening Scrapbook Cover** — *"Well, look who's getting her own little corner of the internet."* with floating Polaroids, doodles, and *"Open your little surprise"*.
- **Unsealable Keepsake Letter** — Interactive wax-seal envelope that unfolds into a personal birthday note.
- **Big Dreams & AMK** — *"Plans that are already decided."* featuring AMK, volleyball, swimming, and *"Mount Everest might fall short for her dreams."*
- **Guzarwadi Hills Memory** — *"Some views stay with you."* — a sunlit keepsake spread preserving *"Her existence itself is heavenly."*
- **The Chocolate Wafer Theory** — Interactive 3-layer wrapper & wafer unwrapping card.
- **Unofficial Rutika Soundboard (`Rutika.exe`)** — Interactive text-based soundboard for her signature habits (random giggles, `"AYYYY!"`, `"BAAP CHUDA"`, and blowing air).
- **The Scrapbook Gallery** — All 27 distinct photographs in tilted Polaroid frames with mood filters and a portal-mounted Lightbox.
- **Memories in Motion** — All 3 personal video clips with native playback controls (no audio autoplay).
- **The Unofficial Support Department** — Celebrating her calm practical advice and the exam-season study-call keepsake.
- **Rutika's Midnight Cinema** — Moonlit watchalong journal with tickets for *Barfi!* and *Sister Midnight*.
- **Ordinary Moments & Appreciation** — Highlights of everyday companionship plus *"An entirely unreasonable number of reasons to appreciate you."* and a pocket-reminder cycler.
- **Final Birthday Surprise** — Interactive chocolate-cream SVG cake with a flickering candle, confetti burst, and *"Keep dreaming ridiculously big, Rutika."*

## Project Structure

```text
Rutika/
├── public/
│   └── media/
│       ├── photos/          # 27 organized photographs (relative paths)
│       └── videos/          # 3 organized MP4 clips (relative paths)
├── src/
│   ├── components/          # Modular React sections and custom SVG illustrations
│   ├── data/                # Real memories, captions, soundboard triggers, and media list
│   ├── hooks/               # Scroll-reveal IntersectionObserver hook
│   └── styles/              # Warm cream, blush, lavender, chocolate brown & sunshine CSS
├── index.html
├── package.json
└── vite.config.js           # Configured with base: './' for portable relative paths
```

*(The original WhatsApp media files in the root folder remain untouched and preserved.)*

## Local Setup & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open the local URL printed in the terminal (typically `http://localhost:5173`).

## Production Build

Build the optimized static bundle into `dist/`:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploying (GitHub Pages, Vercel, Netlify)

Because `vite.config.js` uses `base: './'` and all media assets use relative `./media/...` paths, `dist/` works cleanly on any static host:

- **Vercel / Netlify:** Connect the repository (or drag-and-drop `dist/` on Netlify Drop) with build command `npm run build` and output directory `dist`.
- **GitHub Pages:** Run `npm run build` and publish `dist/` via GitHub Actions or `npx gh-pages -d dist`.
