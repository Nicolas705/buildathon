'use client';

import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const SplineBackground = memo(function SplineBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    console.log('✅ Background Spline loaded');
    setIsLoaded(true);
  }, []);

  const handleError = useCallback((error: unknown) => {
    console.error('❌ Background Spline error:', error);
    setHasError(true);
  }, []);

  // Don't render anything if there's an error
  if (hasError) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 0.8 : 0 }}
      transition={{ 
        duration: 1.5, 
        delay: 0.2,
        ease: "easeOut"
      }}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 will-change-opacity"
    >
      <div 
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'scale(1.05)', // Reduced scale for better performance
          willChange: isLoaded ? 'auto' : 'transform',
        }}
      >
        <Spline
          scene="https://prod.spline.design/lfUqHnc-APD4Z3CK/scene.splinecode"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
      
      {/* Optimized gradient overlay */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
            <div className="absolute inset-0 bg-background/15" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default SplineBackground; 