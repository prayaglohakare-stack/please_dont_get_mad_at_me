import React from 'react';

export function WashiTape({ color = 'blush', className = '' }) {
  const palette = {
    blush: 'rgba(243, 189, 195, 0.76)',
    lavender: 'rgba(205, 193, 232, 0.76)',
    sunshine: 'rgba(245, 211, 114, 0.78)',
    choco: 'rgba(138, 98, 80, 0.62)',
  };

  return (
    <span
      aria-hidden="true"
      className={`washi-tape ${className}`}
      style={{ '--tape-bg': palette[color] || palette.blush }}
    />
  );
}

export function SparkleStar({ className = '', size = 22, color = '#E5B242' }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2C12.7 7.3 16.7 11.3 22 12C16.7 12.7 12.7 16.7 12 22C11.3 16.7 7.3 12.7 2 12C7.3 11.3 11.3 7.3 12 2Z"
        fill={color}
        fillOpacity="0.88"
      />
    </svg>
  );
}

export function DaisyDoodle({ className = '', size = 34 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <g stroke="#5C3D2E" strokeWidth="1.4" strokeLinecap="round">
        <ellipse cx="20" cy="9" rx="3.4" ry="6" fill="#FFFDFA" />
        <ellipse cx="20" cy="31" rx="3.4" ry="6" fill="#FFFDFA" />
        <ellipse cx="9" cy="20" rx="6" ry="3.4" fill="#FFFDFA" />
        <ellipse cx="31" cy="20" rx="6" ry="3.4" fill="#FFFDFA" />
        <ellipse
          cx="12.2"
          cy="12.2"
          rx="3.2"
          ry="5.5"
          transform="rotate(-45 12.2 12.2)"
          fill="#FCEAE8"
        />
        <ellipse
          cx="27.8"
          cy="27.8"
          rx="3.2"
          ry="5.5"
          transform="rotate(-45 27.8 27.8)"
          fill="#FCEAE8"
        />
        <ellipse
          cx="27.8"
          cy="12.2"
          rx="3.2"
          ry="5.5"
          transform="rotate(45 27.8 12.2)"
          fill="#EFEAF8"
        />
        <ellipse
          cx="12.2"
          cy="27.8"
          rx="3.2"
          ry="5.5"
          transform="rotate(45 12.2 27.8)"
          fill="#EFEAF8"
        />
        <circle cx="20" cy="20" r="4.5" fill="#F5C74C" />
      </g>
    </svg>
  );
}

export function SquiggleUnderline({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 18"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M3 11.5C32 4.5 55 15.5 84 9C113 2.5 137 15 166 8.5C187 3.8 202 10.5 217 8"
        stroke="#C96A76"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PaperclipDoodle({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      width="32"
      height="58"
      viewBox="0 0 32 58"
      fill="none"
      className={className}
    >
      <path
        d="M21 15V41C21 46.5 16.5 51 11 51C5.5 51 1 46.5 1 41V13C1 6.4 6.4 1 13 1C19.6 1 25 6.4 25 13V39C25 42.9 21.9 46 18 46C14.1 46 11 42.9 11 39V17"
        stroke="#7D5D4E"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PostageStamp({ top = '25 NOV', bottom = 'RUTIKA', className = '' }) {
  return (
    <div className={`postage-stamp ${className}`} aria-hidden="true">
      <span className="postage-top">{top}</span>
      <span className="postage-heart">★</span>
      <span className="postage-bottom">{bottom}</span>
    </div>
  );
}

export function MountainTrailSVG({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 175"
      fill="none"
      className={className}
    >
      {/* Sun */}
      <circle cx="256" cy="40" r="21" fill="#F5C74C" fillOpacity="0.85" />
      <circle cx="256" cy="40" r="29" stroke="#F5C74C" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 4" />
      {/* Back peaks */}
      <path
        d="M12 152 L82 62 L134 114 L188 42 L252 122 L286 86 L312 152 Z"
        fill="#EFEAF8"
        stroke="#5C3D2E"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Front rugged AMK-style peak */}
      <path
        d="M54 152 L116 74 L156 122 L202 58 L268 152 Z"
        fill="#FCEAE8"
        stroke="#5C3D2E"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Dotted trail path */}
      <path
        d="M28 156 C78 148, 96 124, 130 128 C164 132, 174 96, 202 68"
        stroke="#C96A76"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="5 6"
      />
      {/* Little flag at summit */}
      <line x1="202" y1="58" x2="202" y2="34" stroke="#4A3228" strokeWidth="2" strokeLinecap="round" />
      <path d="M202 35 L224 41 L202 48 Z" fill="#C96A76" />
      <text x="174" y="29" fill="#4A3228" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
        AMK
      </text>
    </svg>
  );
}

export function SunlitHillsSVG({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 150"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <circle cx="520" cy="48" r="34" fill="#F5C74C" fillOpacity="0.55" />
      <path
        d="M0 112 C110 66, 210 120, 330 82 C440 46, 540 94, 640 68 L640 150 L0 150 Z"
        fill="#F5D7B8"
        fillOpacity="0.55"
      />
      <path
        d="M0 126 C140 96, 250 132, 390 100 C495 76, 575 112, 640 98 L640 150 L0 150 Z"
        fill="#E9BEA6"
        fillOpacity="0.45"
      />
    </svg>
  );
}

export function ChocolateWaferSVG({ stage = 0, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 175"
      fill="none"
      className={className}
    >
      {/* Inner smooth chocolate wafer bar */}
      <rect
        x="48"
        y="38"
        width="164"
        height="98"
        rx="12"
        fill="#5C3D2E"
        stroke="#3A251B"
        strokeWidth="2.5"
      />
      {/* Wafer grid squares */}
      <g stroke="#7A5340" strokeWidth="2">
        <line x1="102" y1="42" x2="102" y2="132" />
        <line x1="158" y1="42" x2="158" y2="132" />
        <line x1="52" y1="87" x2="208" y2="87" />
      </g>
      {/* Smooth chocolate swirl / drip when unwrapped */}
      {stage >= 2 && (
        <path
          d="M54 58 C88 46, 124 72, 162 56 C182 48, 198 60, 206 54 L206 124 C206 128, 202 130, 198 130 L60 130 C56 130, 54 128, 54 124 Z"
          fill="#704937"
          fillOpacity="0.88"
        />
      )}
      {/* Crisp shell overlay (stages 0 and 1) */}
      {stage <= 1 && (
        <rect
          x="44"
          y="34"
          width="172"
          height="106"
          rx="14"
          fill="#D9B79A"
          fillOpacity={stage === 1 ? '0.68' : '0.94'}
          stroke="#5C3D2E"
          strokeWidth="2.2"
          strokeDasharray={stage === 1 ? '7 4' : '0'}
        />
      )}
      {/* Outer paper wrapper (stage 0) */}
      {stage === 0 && (
        <g>
          <path
            d="M32 30 L228 30 L218 52 L228 74 L218 96 L228 118 L218 144 L32 144 L42 118 L32 96 L42 74 L32 52 Z"
            fill="#FCEAE8"
            stroke="#5C3D2E"
            strokeWidth="2.2"
          />
          <rect
            x="64"
            y="50"
            width="132"
            height="72"
            rx="10"
            fill="#EFEAF8"
            stroke="#5C3D2E"
            strokeWidth="1.6"
            strokeDasharray="4 4"
          />
          <text
            x="130"
            y="84"
            textAnchor="middle"
            fill="#4A3228"
            fontSize="13"
            fontWeight="700"
            fontFamily="Fraunces, serif"
          >
            INTROVERT
          </text>
          <text
            x="130"
            y="102"
            textAnchor="middle"
            fill="#7D5D4E"
            fontSize="11"
            fontWeight="600"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            SHELL • HANDLE GENTLY
          </text>
        </g>
      )}
      {stage === 1 && (
        <text
          x="130"
          y="92"
          textAnchor="middle"
          fill="#3A251B"
          fontSize="13"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          *crunch* almost there...
        </text>
      )}
      {stage === 2 && (
        <text
          x="130"
          y="93"
          textAnchor="middle"
          fill="#FBF6EE"
          fontSize="15"
          fontWeight="700"
          fontFamily="Caveat, cursive"
        >
          100% smooth talker unlocked ★
        </text>
      )}
    </svg>
  );
}
