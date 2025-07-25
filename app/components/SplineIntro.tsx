'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

interface SplineIntroProps {
  onComplete: () => void;
  duration?: number;
}

// Memoize the component to prevent unnecessary re-renders
const SplineIntro = memo(function SplineIntro({ onComplete, duration = 10000 }: SplineIntroProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadStartTime] = useState(Date.now());
  const [showContent, setShowContent] = useState(false);

  // Performance monitoring
  useEffect(() => {
    // Log performance metrics
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      console.log('⚡ Page load performance:', {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
      });
    }

    // Show content immediately to prevent flash
    const contentTimer = setTimeout(() => setShowContent(true), 50);

    // Main timer for auto-progression
    const mainTimer = setTimeout(() => {
      onComplete();
    }, duration);

    // Progress animation - optimized interval
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressInterval);
      }
    }, 50); // Reduced frequency for better performance

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(mainTimer);
      clearInterval(progressInterval);
    };
  }, [duration, onComplete]);

  const handleSplineLoad = useCallback(() => {
    const loadTime = Date.now() - loadStartTime;
    console.log(`✅ Spline scene loaded in ${loadTime}ms`);
    setIsLoading(false);
    
    // Report performance metric
    if (typeof window !== 'undefined' && window.performance && window.performance.measure) {
      window.performance.measure('spline-load-time', 'navigationStart');
    }
  }, [loadStartTime]);

  const handleSplineError = useCallback((error: Error | unknown) => {
    console.error('❌ Spline loading error:', error);
    setHasError(true);
    setIsLoading(false);
  }, []);

  const handleSkip = useCallback(() => {
    console.log('⏭️ Skipping intro');
    onComplete();
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="spline-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeInOut" }} // Faster transition
        className="fixed inset-0 bg-background z-50 overflow-hidden"
      >
        {/* Main Spline Container */}
        <div className="relative w-full h-full">
          {/* Spline Scene - Always render to start loading immediately */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hasError ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Spline
              scene="https://prod.spline.design/lfUqHnc-APD4Z3CK/scene.splinecode"
              onLoad={handleSplineLoad}
              onError={handleSplineError}
              style={{
                width: '100%',
                height: '100%',
                opacity: isLoading ? 0.3 : 1,
                transition: 'opacity 0.5s ease-out',
              }}
            />
          </motion.div>

          {/* Ultra-light loading overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 mx-auto mb-3"
                  >
                    <svg className="w-full h-full" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        className="opacity-75 text-accent"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </motion.div>
                  <p className="text-accent font-mono text-xs opacity-70">loading scene...</p>
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
                  <div className="bg-card-bg border border-card-border rounded-lg p-6 font-mono">
                    <p className="text-foreground/60 text-sm mb-4">
                      Unable to load 3D scene. Continuing...
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

          {/* Bottom UI Layer - Optimized */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Progress Bar */}
            <div className="max-w-sm mx-auto mb-3">
              <div className="h-0.5 bg-card-border/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-[width] duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Skip Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
              className="text-center"
            >
              <button
                onClick={handleSkip}
                className="text-foreground/30 hover:text-foreground/60 font-mono text-xs px-3 py-1.5 
                         transition-colors duration-200"
              >
                skip →
              </button>
            </motion.div>
          </div>

          {/* Signal Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-6 left-6"
          >
            <div className="font-mono text-accent text-xs">
              <span className="text-foreground/50">$</span> signal
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

export default SplineIntro; 