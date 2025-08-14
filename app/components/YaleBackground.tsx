'use client';

import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Custom SVG background inspired by TreeHacks, adapted to Yale's vibe
// Layers: sky gradient, mountains, pine forest, and a stylized collegiate-gothic tower
const YaleBackground = memo(function YaleBackground() {
  const prefersReducedMotion = useReducedMotion();

  const floatTransition = {
    duration: 12,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    repeatType: 'mirror' as const,
  };

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        role="img"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#072415" />
            <stop offset="100%" stopColor="#0f0f0f" />
          </linearGradient>
          <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d3a29" />
            <stop offset="100%" stopColor="#0b2f22" />
          </linearGradient>
          <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a2e20" />
            <stop offset="100%" stopColor="#092319" />
          </linearGradient>
          <linearGradient id="towerBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f2f24" />
            <stop offset="100%" stopColor="#0a1e17" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sky */}
        <rect x="0" y="0" width="1440" height="900" fill="url(#sky)" />

        {/* Distant mountains */}
        <motion.g
          initial={false}
          animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
          transition={floatTransition}
          opacity="0.6"
        >
          <path
            d="M0 520 L120 500 L260 540 L380 500 L520 540 L640 500 L780 540 L900 510 L1040 540 L1180 500 L1320 530 L1440 510 L1440 900 L0 900 Z"
            fill="url(#hill2)"
          />
        </motion.g>

        {/* Mid mountains */}
        <motion.g
          initial={false}
          animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
          transition={{ ...floatTransition, duration: 10 }}
          opacity="0.8"
        >
          <path
            d="M0 560 L100 550 L220 590 L360 560 L480 600 L620 560 L760 600 L900 570 L1040 600 L1180 560 L1300 590 L1440 570 L1440 900 L0 900 Z"
            fill="url(#hill1)"
          />
        </motion.g>

        {/* Stylized Yale tower (inspired by collegiate gothic silhouettes) */}
        <motion.g
          initial={false}
          animate={prefersReducedMotion ? {} : { y: [0, -4, 0] }}
          transition={{ ...floatTransition, duration: 14 }}
        >
          {/* Tower body */}
          <g transform="translate(260,300)">
            <path
              d="M120 0 L140 40 L140 320 L180 320 L180 360 L60 360 L60 320 L100 320 L100 40 Z"
              fill="url(#towerBody)"
            />
            {/* Arched windows */}
            <g fill="#0e1915">
              <rect x="112" y="70" width="16" height="40" rx="8" />
              <rect x="112" y="130" width="16" height="40" rx="8" />
              <rect x="112" y="190" width="16" height="40" rx="8" />
            </g>
            {/* Spire */}
            <path d="M120 -20 L132 0 L108 0 Z" fill="#103628" />
            {/* Accent window glow */}
            <g filter="url(#glow)">
              <rect x="112" y="70" width="16" height="40" rx="8" fill="#00ff88" opacity="0.12" />
              <rect x="112" y="130" width="16" height="40" rx="8" fill="#00ff88" opacity="0.12" />
              <rect x="112" y="190" width="16" height="40" rx="8" fill="#00ff88" opacity="0.12" />
            </g>
          </g>
        </motion.g>

        {/* Foreground pines */}
        <motion.g
          initial={false}
          animate={prefersReducedMotion ? {} : { x: [0, -12, 0] }}
          transition={{ ...floatTransition, duration: 18 }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const x = i * 120 + (i % 2 === 0 ? 30 : 0);
            const scale = 0.8 + (i % 3) * 0.15;
            return (
              <g key={i} transform={`translate(${x},640) scale(${scale})`}>
                <path d="M40 0 L80 120 L56 120 L96 220 L64 220 L120 360 L-40 360 L16 220 L-16 220 L24 120 L0 120 Z" fill="#0a1a14" />
              </g>
            );
          })}
        </motion.g>

        {/* Subtle vignette */}
        <rect x="0" y="0" width="1440" height="900" fill="#000" opacity="0.15" />
      </svg>
    </div>
  );
});

export default YaleBackground;


