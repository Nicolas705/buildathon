'use client';

import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Renders the user's custom background art and readability overlays
const YaleBackground = memo(function YaleBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden
    >
      <Image
        src="/newdarkbackground.png"
        alt="Yale AI Hackathon background"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
    </motion.div>
  );
});

export default YaleBackground;


