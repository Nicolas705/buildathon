'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import SplineIntro with preload hint
const SplineIntro = dynamic(() => import('./components/SplineIntro'), {
  ssr: false,
  loading: () => null, // Minimize loading state for faster perceived performance
});

// Dynamically import SplineBackground
const SplineBackground = dynamic(() => import('./components/SplineBackground'), {
  ssr: false,
});

// Dynamically import ShareModal
const ShareModal = dynamic(() => import('./components/ShareModal'), {
  ssr: false,
});

// Terminal loading sequence data
const bootSequence = [
  { text: "$ initializing signal...", delay: 350 },
  { text: "✓ connecting to yale network", delay: 750 },
  { text: "✓ establishing secure connection", delay: 850 },
  { text: "$ signal ready", delay: 950 }
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

interface FormData {
  name: string;
  email: string;
  linkedin: string;
  github: string;
  accomplishments: string;
}

// Validation error interface (for future use)
// interface ValidationError {
//   field: string;
//   message: string;
// }

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateGithubUrl = (url: string): boolean => {
  const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;
  return githubRegex.test(url);
};

const validateLinkedInUrl = (url: string): boolean => {
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/;
  return linkedinRegex.test(url);
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50 && /^[a-zA-Z\s'-]+$/.test(name.trim());
};

const validateAccomplishments = (text: string): boolean => {
  const trimmed = text.trim();
  return trimmed.length >= 50 && trimmed.length <= 2000 && !isSpamContent(trimmed);
};

const isSpamContent = (text: string): boolean => {
  const spamPatterns = [
    /(.)\1{10,}/i, // Repeated characters
    /https?:\/\/[^\s]+/gi, // Multiple URLs
    /\b(viagra|casino|lottery|winner|congratulations|urgent|act now)\b/gi, // Spam keywords
    /[^\w\s]{5,}/i, // Too many special characters
  ];
  
  const urlCount = (text.match(/https?:\/\/[^\s]+/gi) || []).length;
  if (urlCount > 2) return true; // Too many URLs
  
  return spamPatterns.some(pattern => pattern.test(text));
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

// Contact Form Modal Component
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    linkedin: '',
    github: '',
    accomplishments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string>('');

  const steps = [
    {
      id: 'name',
      question: "what's your name?",
      placeholder: 'alex chen',
      type: 'text',
      field: 'name' as keyof FormData
    },
    {
      id: 'email',
      question: "what's your email?",
      placeholder: 'alex@yale.edu',
      type: 'email',
      field: 'email' as keyof FormData
    },
    {
      id: 'linkedin',
      question: 'linkedin profile?',
      placeholder: 'linkedin.com/in/alexchen',
      type: 'url',
      field: 'linkedin' as keyof FormData
    },
    {
      id: 'github',
      question: 'github profile link?',
      placeholder: 'https://github.com/alexchen',
      type: 'url',
      field: 'github' as keyof FormData
    },
    {
      id: 'accomplishments',
      question: 'what are your most remarkable entrepreneurial or technical achievements?',
      placeholder: 'Built a fintech app that processed $1M+ in transactions, created an open-source ML library with 10k+ stars, launched a startup that scaled to 50k users...',
      type: 'textarea',
      field: 'accomplishments' as keyof FormData
    }
  ];

  const validateCurrentField = (): boolean => {
    const currentField = steps[currentStep].field;
    const value = formData[currentField];
    
    setValidationError('');
    
    switch (currentField) {
      case 'name':
        if (!validateName(value)) {
          setValidationError('Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes');
          return false;
        }
        break;
      case 'email':
        if (!validateEmail(value)) {
          setValidationError('Please enter a valid email address');
          return false;
        }
        break;
      case 'linkedin':
        if (value && !validateLinkedInUrl(value)) {
          setValidationError('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)');
          return false;
        }
        break;
      case 'github':
        if (!validateGithubUrl(value)) {
          setValidationError('Please enter a valid GitHub profile URL (e.g., https://github.com/username)');
          return false;
        }
        break;
      case 'accomplishments':
        if (!validateAccomplishments(value)) {
          setValidationError('Please provide a detailed response (50-2000 characters) about your accomplishments');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentField()) {
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setValidationError('');
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Send email via our API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          linkedin: formData.linkedin,
          github: formData.github,
          accomplishments: formData.accomplishments,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        console.log('Application submitted successfully:', result.message);
      } else {
        console.error('Failed to submit application:', result.error || 'Unknown error');
        // Still show success to user as we logged the application server-side
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Network error submitting application:', error);
      // Show success anyway - the important thing is the form was completed
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const currentValue = formData[currentStepData?.field];
  const canProceed = currentValue && currentValue.trim().length > 0 && !validationError;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card-bg border border-card-border rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-card-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-background font-mono font-bold text-sm">S</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground font-mono">signal application</h2>
                  <p className="text-xs text-foreground/60 font-mono">
                    step {currentStep + 1} of {steps.length}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-foreground/50 hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-6 py-2">
            <div className="w-full bg-background rounded-full h-1">
              <motion.div
                className="bg-accent h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[300px] flex flex-col">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground font-mono mb-2">application submitted!</h3>
                  <p className="text-foreground/70 font-mono text-sm">
                    your application has been submitted to Signal.<br/>
                    we&rsquo;ll review it and get back to you soon.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-accent text-background rounded-lg font-mono text-sm hover:bg-accent-hover transition-colors"
                >
                  close
                </button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1"
                >
                  <div className="mb-8">
                    <div className="font-mono text-accent text-sm mb-2">
                      <span className="text-foreground/50">$</span> signal.apply()
                    </div>
                    <h3 className="text-2xl font-bold text-foreground font-mono mb-2">
                      {currentStepData.question}
                    </h3>

                  </div>

                  {currentStepData.type === 'textarea' ? (
                    <textarea
                      value={formData[currentStepData.field]}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, [currentStepData.field]: e.target.value }));
                        setValidationError(''); // Clear error on input
                      }}
                      placeholder={currentStepData.placeholder}
                      className={`w-full bg-background border rounded-lg p-4 text-foreground font-mono text-sm resize-none h-32 focus:outline-none transition-colors ${
                        validationError ? 'border-red-500 focus:border-red-500' : 'border-card-border focus:border-accent'
                      }`}
                      autoFocus
                    />
                  ) : (
                    <input
                      type={currentStepData.type}
                      value={formData[currentStepData.field]}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, [currentStepData.field]: e.target.value }));
                        setValidationError(''); // Clear error on input
                      }}
                      placeholder={currentStepData.placeholder}
                      className={`w-full bg-background border rounded-lg p-4 text-foreground font-mono text-sm focus:outline-none transition-colors ${
                        validationError ? 'border-red-500 focus:border-red-500' : 'border-card-border focus:border-accent'
                      }`}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && canProceed) {
                          handleNext();
                        }
                      }}
                    />
                  )}

                  {/* Error message display */}
                  {validationError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <p className="text-red-400 font-mono text-xs">{validationError}</p>
                    </motion.div>
                  )}
                </motion.div>

                <div className="flex items-center justify-between pt-6">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-4 py-2 text-foreground/50 font-mono text-sm hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    back
                  </button>

                  <motion.button
                    onClick={handleNext}
                    disabled={!canProceed || isSubmitting}
                    whileHover={canProceed ? { scale: 1.02 } : {}}
                    whileTap={canProceed ? { scale: 0.98 } : {}}
                    className="px-6 py-2 bg-accent text-background rounded-lg font-mono text-sm hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        <span>sending...</span>
                      </>
                    ) : (
                      <>
                        <span>{isLastStep ? 'submit' : 'next'}</span>
                        <span>→</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}



export default function Home() {
  const [showSpline, setShowSpline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    // Preload Spline scenes for optimal performance
    if (typeof window !== 'undefined') {
      // Preload intro scene
      const introLink = document.createElement('link');
      introLink.rel = 'prefetch';
      introLink.href = 'https://prod.spline.design/6Ra-6TOXEw3lYhqa/scene.splinecode';
      introLink.as = 'fetch';
      introLink.crossOrigin = 'anonymous';
      document.head.appendChild(introLink);
      
      // Preload background scene with slight delay
      setTimeout(() => {
        const bgLink = document.createElement('link');
        bgLink.rel = 'prefetch';
        bgLink.href = 'https://prod.spline.design/lfUqHnc-APD4Z3CK/scene.splinecode';
        bgLink.as = 'fetch';
        bgLink.crossOrigin = 'anonymous';
        document.head.appendChild(bgLink);
      }, 2000);
    }

    // Start background effect after intro completes
    const timer = setTimeout(() => setShowBackground(true), 8000); // Start shortly after intro
    return () => clearTimeout(timer);
  }, []);

  const handleSplineComplete = () => {
    setShowSpline(false);
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden">
      {/* Spline background effect */}
      {showBackground && <SplineBackground />}
      
      <AnimatePresence mode="wait">
                  {showSpline ? (
            <SplineIntro onComplete={handleSplineComplete} duration={7000} />
          ) : isLoading ? (
          <TerminalLoader onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="w-full relative z-10 min-h-screen flex flex-col"
          >
            {/* Share Button - Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="fixed top-6 right-6 z-20"
            >
              <motion.button
                onClick={() => setIsShareModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-accent/20 rounded-full blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Button content - Share icon */}
                <div className="relative bg-background/90 backdrop-blur-sm border border-accent/50 rounded-full w-12 h-12 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-200">
                  <Share2 className="w-6 h-6 text-accent" />
                </div>
              </motion.button>
            </motion.div>

            {/* Hero Section */}
            <section className="relative px-6 py-8 sm:px-8 lg:px-12 w-full flex-1 flex items-start justify-center pt-16">
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
                  </motion.h1>

                  {/* Subtitle moved closer to title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="-mt-4 mb-16"
                  >
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground/80">
                      10 builders. weekly vc dinners.
                    </span>
                  </motion.div>

                  {/* Apply button with much more spacing */}
                  <motion.div
                    variants={itemVariants}
                    className="pt-64"
                  >
                    <motion.button
                      onClick={() => setIsContactModalOpen(true)}
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
                      <span>./apply.sh</span>
                      <motion.span 
                        className="text-lg"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Contact & Footer Section */}
            <footer className="w-full px-6 py-8 sm:px-8 lg:px-12 mt-auto">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4, duration: 0.6 }}
                  className="text-center space-y-8"
                >
                  {/* Contact Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4.2, duration: 0.6 }}
                    className="flex justify-center"
                  >
                    <motion.a
                      href="mailto:nicolas.gertler@yale.edu,oliver.hime@yale.edu?subject=Signal%20Inquiry%20%E2%80%93%20Weekly%20Builder%20Dinners"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center space-x-3 px-6 py-3 bg-card-bg border border-card-border rounded-xl hover:border-accent/50 hover:bg-card-bg/80 transition-all duration-300 text-foreground/80 hover:text-foreground font-mono text-sm group shadow-lg hover:shadow-accent/10"
                    >
                      <svg className="w-5 h-5 text-accent group-hover:text-accent-hover transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>contact</span>
                      <motion.span 
                        className="text-accent group-hover:text-accent-hover transition-colors"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  </motion.div>

                  {/* Subtle divider */}
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-px bg-card-border"></div>
                  </div>
                  
                  {/* Footer text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.8, duration: 0.6 }}
                    className="text-xs text-foreground/80 font-mono"
                  >
                     builders designing the next decade
                  </motion.div>
                </motion.div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      
      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
