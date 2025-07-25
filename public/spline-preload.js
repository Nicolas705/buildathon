// Spline Preload Script - Runs as early as possible
(function() {
  'use strict';
  
  // Preconnect to Spline domain
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = 'https://prod.spline.design';
  document.head.appendChild(preconnect);
  
  // Prefetch the Spline scene
  const prefetch = document.createElement('link');
  prefetch.rel = 'prefetch';
  prefetch.href = 'https://prod.spline.design/lfUqHnc-APD4Z3CK/scene.splinecode';
  prefetch.as = 'fetch';
  prefetch.crossOrigin = 'anonymous';
  document.head.appendChild(prefetch);
  
  // Optional: Warm up the connection
  if ('connection' in navigator && navigator.connection.effectiveType === '4g') {
    // Only for fast connections
    fetch('https://prod.spline.design/lfUqHnc-APD4Z3CK/scene.splinecode', {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'force-cache'
    }).catch(() => {}); // Ignore errors
  }
})(); 