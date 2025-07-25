 'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

interface SplineIntroProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplineIntro({ onComplete, duration = 5000 }: SplineIntroProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Main timer for auto-progression
    const mainTimer = setTimeout(() => {
      onComplete();
    }, duration);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 / (duration / 100));
        return next >= 100 ? 100 : next;
      });
    }, 100);

    return () => {
      clearTimeout(mainTimer);
      clearInterval(progressInterval);
    };
  }, [duration, onComplete]);

  const handleSplineLoad = () => {
    console.log('✅ Spline scene loaded successfully');
    setIsLoading(false);
  };

  const handleSplineError = (error: any) => {
    console.error('❌ Spline loading error:', error);
    setHasError(true);
    setIsLoading(false);
  };

  const handleSkip = () => {
    console.log('⏭️ Skipping intro');
    onComplete();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="spline-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 bg-background z-50 overflow-hidden"
      >
        {/* Main Spline Container */}
        <div className="relative w-full h-full">
          {/* Spline Scene */}
          {!hasError && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: isLoading ? 0.5 : 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Spline
                scene="https://prod.spline.design/lfUqHnc-APD4Z3CK/scene.splinecode"
                onLoad={handleSplineLoad}
                onError={handleSplineError}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </motion.div>
          )}

          {/* Loading Overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 border-2 border-accent/20 rounded-full" />
                    <div className="absolute inset-0 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="text-accent font-mono text-sm">initializing scene...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {hasError && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background flex items-center justify-center"
              >
                <div className="text-center max-w-md mx-auto p-8">
                  <div className="bg-card-bg border border-card-border rounded-lg p-8 font-mono">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <h3 className="text-foreground text-lg mb-2">Scene Loading Error</h3>
                    <p className="text-foreground/60 text-sm mb-4">
                      The 3D scene couldn't be loaded. Proceeding to Signal...
                    </p>
                    <button
                      onClick={handleSkip}
                      className="px-4 py-2 bg-accent text-background rounded hover:bg-accent-hover transition-colors text-sm"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom UI Layer */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-4">
              <div className="h-1 bg-card-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "linear" }}
                />
              </div>
            </div>

            {/* Skip Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-center"
            >
              <button
                onClick={handleSkip}
                className="text-foreground/40 hover:text-foreground font-mono text-xs px-4 py-2 
                         border border-card-border hover:border-accent/50 rounded-lg 
                         transition-all duration-300 backdrop-blur-sm bg-background/50"
              >
                skip intro →
              </button>
            </motion.div>
          </div>

          {/* Signal Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute top-8 left-8"
          >
            <div className="font-mono text-accent text-sm">
              <span className="text-foreground/50">$</span> signal
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 