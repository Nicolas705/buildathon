'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Terminal loading sequence data
const bootSequence = [
  { text: "$ initializing signal...", delay: 0 },
  { text: "✓ connecting to yale network", delay: 800 },
  { text: "✓ loading builder profiles", delay: 1200 },
  { text: "✓ syncing vc database", delay: 1600 },
  { text: "✓ establishing secure connection", delay: 2000 },
  { text: "$ signal ready", delay: 2600 }
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
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
};

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
        setTimeout(onComplete, 500);
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

// Matrix-style background effect
function MatrixBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-accent/10 font-mono text-xs"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
          }}
          animate={{
            y: ["0vh", "110vh"],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          {Array.from({ length: Math.floor(Math.random() * 10) + 5 }).map((_, j) => (
            <div key={j} className="mb-1">
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);

  useEffect(() => {
    // Start matrix effect after initial load
    const timer = setTimeout(() => setShowMatrix(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden">
      {/* Matrix background effect */}
      {showMatrix && <MatrixBackground />}
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <TerminalLoader onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full relative z-10"
          >
            {/* Hero Section */}
            <section className="relative px-6 py-20 sm:px-8 lg:px-12 w-full">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="space-y-12 text-center"
                >
                  {/* Terminal-like header with glitch effect */}
                  <motion.div
                    variants={itemVariants}
                    className="font-mono text-accent text-sm relative"
                  >
                    <motion.span
                      animate={{
                        textShadow: [
                          "0 0 0px #00ff88",
                          "0 0 10px #00ff88",
                          "0 0 0px #00ff88"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-foreground/50">$</span> cd /yale/signal && ls -la
                    </motion.span>
                  </motion.div>
                  
                  <motion.h1
                    variants={itemVariants}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
                  >
                    <motion.span 
                      className="font-mono text-accent"
                      animate={{
                        textShadow: [
                          "0 0 0px #00ff88",
                          "0 0 20px #00ff88",
                          "0 0 0px #00ff88"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      signal
                    </motion.span>
                    <br />
                    <motion.span 
                      className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground/80"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                    >
                      10 builders. weekly vc dinners.
                    </motion.span>
                  </motion.h1>
                  
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-4 text-sm font-mono"
                  >
                    {[
                      { label: "online", value: "online", color: "green-400", pulse: true },
                      { label: "commits", value: "∞", color: "accent" },
                      { label: "location", value: "new haven", color: "foreground" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2 + index * 0.2, duration: 0.5 }}
                        className="flex items-center space-x-2 px-4 py-3 bg-card-bg border border-card-border rounded-lg hover:border-accent/50 transition-colors duration-300"
                      >
                        {item.pulse && (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        )}
                        <span className="text-foreground/70">{item.label === "online" ? "" : `${item.label}:`}</span>
                        <span className={`text-${item.color}`}>{item.value}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="pt-8"
                  >
                    <motion.a
                      href="mailto:signal@yale.edu"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3, duration: 0.8 }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(0, 255, 136, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-3 px-8 py-4 bg-accent hover:bg-accent-hover text-background font-medium rounded-lg transition-all duration-200 font-mono border border-accent group"
                    >
                      <span>./contact.sh</span>
                      <motion.span 
                        className="text-lg"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Minimal Footer */}
            <footer className="absolute bottom-0 left-0 right-0 px-6 py-8 sm:px-8 lg:px-12">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-xs text-foreground/40 font-mono">
                    built with ❤️ by builders, for builders
                  </div>
                </motion.div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
