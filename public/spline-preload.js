// Spline Preload Script - Runs as early as possible
(function() {
  'use strict';
  
  // Preconnect to Spline domain
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = 'https://prod.spline.design';
  document.head.appendChild(preconnect);
  
  // Prefetch the intro Spline scene
  const introScene = 'https://prod.spline.design/6Ra-6TOXEw3lYhqa/scene.splinecode';
  const bgScene = 'https://prod.spline.design/lfUqHnc-APD4Z3CK/scene.splinecode';
  
  const prefetchIntro = document.createElement('link');
  prefetchIntro.rel = 'prefetch';
  prefetchIntro.href = introScene;
  prefetchIntro.as = 'fetch';
  prefetchIntro.crossOrigin = 'anonymous';
  document.head.appendChild(prefetchIntro);
  
  // Prefetch background scene with slight delay
  setTimeout(function() {
    const prefetchBg = document.createElement('link');
    prefetchBg.rel = 'prefetch';
    prefetchBg.href = bgScene;
    prefetchBg.as = 'fetch';
    prefetchBg.crossOrigin = 'anonymous';
    document.head.appendChild(prefetchBg);
  }, 1000);
  
  // Optional: Warm up the connection for fast networks
  if ('connection' in navigator && navigator.connection.effectiveType === '4g') {
    // Prioritize intro scene
    fetch(introScene, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'force-cache'
    }).catch(() => {}); // Ignore errors
  }
})(); 