'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Share } from 'lucide-react';
import dynamic from 'next/dynamic';



// Dynamically import custom Yale background (SVG-based)
const YaleBackground = dynamic(() => import('./components/YaleBackground'), {
  ssr: false,
});

// Dynamically import ShareModal
const ShareModal = dynamic(() => import('./components/ShareModal'), {
  ssr: false,
});

// Minimal loading sequence
const bootSequence = [
  { text: "loading...", delay: 250 },
  { text: "ready", delay: 350 }
];

// Enhanced animation variants for the hero section
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 15
    }
  }
};

interface Track {
  name: string;
  summary: string;
  examples: string[];
}

interface SponsorTier {
  name: string;
  price: string;
  perks: string[];
  highlight?: boolean;
}

// Terminal loading component
function TerminalLoader({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLine < bootSequence.length - 1) {
        setCurrentLine(currentLine + 1);
        setProgress((currentLine + 1) / bootSequence.length * 100);
      } else {
        setTimeout(onComplete, 250);
      }
    }, bootSequence[currentLine]?.delay || 800);

    return () => clearTimeout(timer);
  }, [currentLine, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
    >
      <div className="max-w-2xl w-full px-6">
        {/* Terminal header */}
        <div className="bg-card-bg border border-card-border rounded-t-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-xs text-foreground/50 font-mono">signal@yale:~</span>
          </div>
        </div>

        {/* Terminal content */}
        <div className="bg-card-bg border-l border-r border-card-border p-6 font-mono text-sm min-h-[200px]">
          {bootSequence.slice(0, currentLine + 1).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-2"
            >
              <span className="text-accent">{line.text}</span>
              {index === currentLine && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-accent ml-1"
                >
                  _
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-card-bg border border-card-border rounded-b-lg p-4">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-foreground/70 font-mono">loading</span>
            <div className="flex-1 bg-background rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-accent h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-xs text-accent font-mono">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showBackground, setShowBackground] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  // Section ids for smooth keyboard navigation
  const sectionIds = ['hero', 'about', 'tracks', 'principles', 'criteria', 'contact'];
  
  const tracks: Track[] = [
    {
      name: 'EdTech',
      summary: 'AI-native learning tools built for shipping in classrooms and beyond.',
      examples: ['AI-powered learning platforms', 'tutoring agents', 'adaptive content delivery']
    },
    {
      name: 'FinTech',
      summary: 'Models and systems that move money, measure risk, and price the future.',
      examples: ['risk modeling', 'predictive markets', 'AI-native banking tools']
    },
    {
      name: 'Bio/Med',
      summary: 'From bits to biology — applied ML for healthcare and discovery.',
      examples: ['diagnostics', 'drug discovery', 'computational biology']
    },
    {
      name: 'Defense/GovTech',
      summary: 'Civic-grade infrastructure: secure, verifiable, and deployable.',
      examples: ['civic engagement', 'secure communications', 'decision support']
    }
  ];

  const sponsorshipTiers: SponsorTier[] = [
    {
      name: 'Platinum Partner',
      price: '$50,000+',
      perks: ['Title sponsor', 'Keynote', 'Prize naming', 'Early resume/demo access', 'Custom activations'],
      highlight: true
    },
    {
      name: 'Gold Partner',
      price: '$25,000+',
      perks: ['Prominent branding', 'Prize naming', 'Resume/demo access', 'Mentor/workshop slot']
    },
    {
      name: 'Silver Partner',
      price: '$10,000+',
      perks: ['Logo placement', 'API credits/prizes', 'Optional judging/mentorship']
    },
    {
      name: 'In-Kind Partner',
      price: 'in-kind',
      perks: ['API credits', 'SDKs', 'Cloud services', 'Developer resources', 'Logo placement']
    }
  ];

  useEffect(() => {
    // Preload background scene for optimal performance
    if (typeof window !== 'undefined') {
      const bgLink = document.createElement('link');
      bgLink.rel = 'prefetch';
      bgLink.href = 'https://prod.spline.design/lfUqHnc-APD4Z3CK/scene.splinecode';
      bgLink.as = 'fetch';
      bgLink.crossOrigin = 'anonymous';
      document.head.appendChild(bgLink);
    }

    // Start background effect after loading completes  
    const timer = setTimeout(() => setShowBackground(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation between sections (ArrowUp/ArrowDown, j/k)
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (!['arrowdown', 'arrowup', 'j', 'k'].includes(key)) return;
      e.preventDefault();
      // Find current section index by viewport midpoint
      const mid = window.innerHeight / 2;
      let currentIndex = 0;
      sectionIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) currentIndex = idx;
      });
      const direction = key === 'arrowdown' || key === 'j' ? 1 : -1;
      const nextIndex = Math.min(Math.max(currentIndex + direction, 0), sectionIds.length - 1);
      const target = document.getElementById(sectionIds[nextIndex]);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div 
      className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Custom Yale background */}
      {showBackground && <YaleBackground />}
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <TerminalLoader onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="w-full relative z-10 min-h-screen flex flex-col"
          >
            {/* Share Button - Top Right - Redesigned */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="fixed top-6 right-6 z-20"
            >
              <motion.button
                onClick={() => setIsShareModalOpen(true)}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >

                {/* Button content - Modern design */}
                <div className="relative bg-gradient-to-br from-card-bg/95 to-background/95 backdrop-blur-lg border border-accent/40 rounded-2xl w-14 h-14 flex items-center justify-center hover:border-accent hover:from-accent/5 hover:to-accent/10 transition-all duration-300 shadow-lg hover:shadow-accent/20">
                  <div className="relative">
                    <Share className="w-6 h-6 text-accent group-hover:text-accent-hover" />
                  </div>
                  
                  {/* Tooltip label */}
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-card-bg/90 backdrop-blur-sm border border-card-border rounded-lg px-2 py-1 text-xs text-foreground/80 font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    initial={{ y: 5 }}
                    whileHover={{ y: 0 }}
                  >
                    share signal
                  </motion.div>
                </div>
              </motion.button>
            </motion.div>

            {/* Hero Section */}
            <section id="hero" className="relative px-6 py-8 sm:px-8 lg:px-12 w-full flex-1 flex items-start justify-center pt-16">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="space-y-12 text-center"
                >
                  {/* Minimal header */}
                  <motion.div
                    variants={itemVariants}
                    className="font-sans text-accent text-sm"
                  >
                    Yale AI Hackathon 2025
                  </motion.div>
                  
                  <motion.h1
                    variants={itemVariants}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight drop-shadow-lg"
                  >
                    Build AI that ships.
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="-mt-4"
                  >
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground drop-shadow-md">
                      36-hour AI-native hackathon focused on deployable, production-grade builds.
                    </div>
                    <div className="mt-4 text-base sm:text-lg text-foreground font-sans drop-shadow-sm">Early November 2025 • Yale University, New Haven • Hosted by Yale Entrepreneurial Society (YES)</div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div variants={itemVariants} className="pt-8">
                    <div className="flex items-center justify-center">
                      <motion.a
                        href="mailto:nicolas.gertler@yale.edu?subject=Yale%20AI%20Hackathon%20Updates&body=Hi%2C%20please%20notify%20me%20when%20participant%20applications%20open.%20Thank%20you!"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-card-bg backdrop-blur border border-card-border text-foreground font-medium rounded-md font-sans hover:border-accent/50"
                      >
                        <span>Get updates</span>
                        <span>→</span>
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* About */}
            <section id="about" className="relative px-6 sm:px-8 lg:px-12 w-full mt-8">
              <div className="max-w-5xl mx-auto">
                <div className="bg-card-bg border border-card-border rounded-2xl p-6 sm:p-8">
                  <div className="font-sans text-accent text-sm mb-3 tracking-wide uppercase">
                    <span className="text-foreground/50">$</span> hackathon.about()
                  </div>
                  <p className="text-foreground/80 leading-relaxed">
                    This November, the Yale Entrepreneurial Society (YES) will host a 36-hour hackathon uniting high-signal student builders — developers, designers, and researchers — to ship AI-native products designed for real-world deployment. We bias toward production-ready: scalable, technically sound, and immediately applicable over flashy demos.
                  </p>
                  <div className="mt-4 text-sm text-foreground/60 font-sans">
                    Early November 2025 • Yale University, New Haven • Hosted by <a href="https://yesatyale.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover underline underline-offset-4">YES</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Tracks */}
            <section id="tracks" className="relative px-6 sm:px-8 lg:px-12 w-full mt-8">
              <div className="max-w-5xl mx-auto">
                <div className="font-sans text-accent text-sm mb-3 tracking-wide uppercase">
                  <span className="text-foreground/50">$</span> hackathon.tracks()
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {tracks.map((track) => (
                    <div key={track.name} className="bg-card-bg border border-card-border rounded-2xl p-6">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold font-sans text-foreground tracking-tight">{track.name}</h3>
                      </div>
                      <p className="mt-2 text-sm text-foreground/70">{track.summary}</p>
                      <ul className="mt-4 space-y-1 text-sm text-foreground/80 list-disc list-inside">
                        {track.examples.map((ex) => (
                          <li key={ex}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Build principles */}
            <section id="principles" className="relative px-6 sm:px-8 lg:px-12 w-full mt-8">
              <div className="max-w-5xl mx-auto">
                <div className="bg-card-bg border border-card-border rounded-2xl p-6 sm:p-8">
                  <h2 className="font-sans text-foreground text-sm sm:text-base font-medium mb-3">Principles</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground/85 text-sm">
                    <li className="bg-background/40 border border-card-border rounded-lg p-4">Ship something real. Working demo &gt; slide deck.</li>
                    <li className="bg-background/40 border border-card-border rounded-lg p-4">Favor simple, robust systems over clever complexity.</li>
                    <li className="bg-background/40 border border-card-border rounded-lg p-4">Design for users; validate with real data or workflows.</li>
                    <li className="bg-background/40 border border-card-border rounded-lg p-4">Own the stack: data, model choice, and product UX.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Criteria */}
            <section id="criteria" className="relative px-6 sm:px-8 lg:px-12 w-full mt-8">
              <div className="max-w-5xl mx-auto">
                <div className="bg-card-bg border border-card-border rounded-2xl p-6 sm:p-8">
                  <div className="font-sans text-accent text-sm mb-3 tracking-wide uppercase">
                    <span className="text-foreground/50">$</span> hackathon.criteria()
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-foreground/85">
                    <li>Deployment readiness: reliability, basic security, and infra choices.</li>
                    <li>Technical depth: modeling, data pipeline, and systems tradeoffs.</li>
                    <li>User value: a clear problem/benefit with usable UX.</li>
                    <li>Execution: quality of craft and speed over the 36 hours.</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Contact & Footer Section */}
            <footer id="contact" className="w-full px-6 py-8 sm:px-8 lg:px-12 mt-8">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="text-center space-y-8"
                >
                  {/* Contact */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.6 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <motion.a
                      href="mailto:nicolas.gertler@yale.edu,oliver.hime@yale.edu,leia.ryan@yale.edu?subject=Yale%20AI%20Hackathon%202025%20Sponsorship"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center space-x-3 px-6 py-3 bg-card-bg/80 backdrop-blur border border-card-border rounded-xl hover:border-accent/50 hover:bg-card-bg/90 transition-all duration-300 text-foreground/80 hover:text-foreground font-sans text-sm group shadow-lg hover:shadow-accent/10"
                    >
                      <svg className="w-5 h-5 text-accent group-hover:text-accent-hover transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>contact the organizers</span>
                      <motion.span 
                        className="text-accent group-hover:text-accent-hover transition-colors"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                    <div className="text-xs text-foreground/70 font-sans">
                      general contact: <a href="mailto:nicolas.gertler@yale.edu" className="text-accent hover:text-accent-hover">nicolas.gertler@yale.edu</a>
                    </div>
                  </motion.div>

                  {/* Subtle divider */}
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-px bg-card-border"></div>
                  </div>
                  
                  {/* Footer text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0, duration: 0.6 }}
                    className="text-xs text-foreground/80 font-sans"
                  >
                     building deployable ai, not demos
                  </motion.div>
                </motion.div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
