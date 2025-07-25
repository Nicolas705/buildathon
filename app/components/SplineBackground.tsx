'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const SplineBackground = memo(function SplineBackground() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 3, 
        delay: 0.5,
        ease: "easeOut"
      }}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      <Spline
        scene="https://prod.spline.design/lfUqHnc-APD4Z3CK/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'scale(1.1)', // Slight scale to avoid edge visibility
        }}
        onLoad={() => console.log('✅ Background Spline loaded')}
        onError={(error) => console.error('❌ Background Spline error:', error)}
      />
      {/* Gradient overlay for better content contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
      <div className="absolute inset-0 bg-background/20" />
    </motion.div>
  );
});

export default SplineBackground; 