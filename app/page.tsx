'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Terminal loading sequence data
const bootSequence = [
  { text: "$ initializing signal...", delay: 200 },
  { text: "✓ connecting to yale network", delay: 600 },
  { text: "✓ establishing secure connection", delay: 700 },
  { text: "$ signal ready", delay: 800 }
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
    github: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      question: 'github username?',
      placeholder: '@alexchen',
      type: 'text',
      field: 'github' as keyof FormData
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const createMailtoLink = () => {
    const subject = encodeURIComponent(`Signal Application from ${formData.name}`);
    const body = encodeURIComponent(`New Signal Application:

Name: ${formData.name}
Email: ${formData.email}
LinkedIn: ${formData.linkedin}
GitHub: ${formData.github}`);
    
    return `mailto:nicolas.gertler@yale.edu?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Try to send via EmailJS first
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'nicolas.gertler@yale.edu',
        subject: `Signal Application from ${formData.name}`,
        message: `New Signal Application:

Name: ${formData.name}
Email: ${formData.email}
LinkedIn: ${formData.linkedin}
GitHub: ${formData.github}`,
      };

      // EmailJS configuration (you'll need to set these up at https://www.emailjs.com/)
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id';
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key';

      if (SERVICE_ID !== 'your_service_id' && TEMPLATE_ID !== 'your_template_id' && PUBLIC_KEY !== 'your_public_key') {
        // EmailJS is configured, try to send
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        setIsSubmitted(true);
      } else {
        // EmailJS not configured, fall back to mailto
        window.location.href = createMailtoLink();
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('EmailJS failed, falling back to mailto:', error);
      // Fallback to mailto if EmailJS fails
      window.location.href = createMailtoLink();
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = formData[currentStepData?.field];

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
                  <h3 className="text-xl font-semibold text-foreground font-mono mb-2">application sent!</h3>
                  <p className="text-foreground/70 font-mono text-sm">
                    we&rsquo;ll review your application and get back to you soon.
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
                      onChange={(e) => setFormData(prev => ({ ...prev, [currentStepData.field]: e.target.value }))}
                      placeholder={currentStepData.placeholder}
                      className="w-full bg-background border border-card-border rounded-lg p-4 text-foreground font-mono text-sm resize-none h-32 focus:outline-none focus:border-accent transition-colors"
                      autoFocus
                    />
                  ) : (
                    <input
                      type={currentStepData.type}
                      value={formData[currentStepData.field]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [currentStepData.field]: e.target.value }))}
                      placeholder={currentStepData.placeholder}
                      className="w-full bg-background border border-card-border rounded-lg p-4 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && canProceed) {
                          handleNext();
                        }
                      }}
                    />
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

// Epic Matrix-style background effect
function MatrixBackground() {
  const chars = ['0', '1', '█', '▓', '▒', '░', '◆', '◇', '▣', '▤'];
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Primary fast-falling matrix */}
      {Array.from({ length: 35 }).map((_, i) => (
        <motion.div
          key={`primary-${i}`}
          className="absolute font-mono text-xs"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20%`,
            filter: `hue-rotate(${Math.random() * 60}deg)`,
          }}
          animate={{
            y: ["0vh", "120vh"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: "linear" as const,
            delay: Math.random() * 8,
          }}
        >
          {Array.from({ length: Math.floor(Math.random() * 15) + 8 }).map((_, j) => {
            const isGlowing = Math.random() > 0.7;
            const char = chars[Math.floor(Math.random() * chars.length)];
            return (
              <motion.div 
                key={j} 
                className={`mb-1 ${isGlowing 
                  ? 'text-accent drop-shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse' 
                  : j === 0 
                    ? 'text-accent/90 drop-shadow-[0_0_4px_rgba(0,255,136,0.6)]'
                    : j < 3
                      ? 'text-accent/60'
                      : 'text-accent/20'
                }`}
                animate={isGlowing ? {
                  textShadow: [
                    "0 0 8px rgba(0,255,136,0.8)",
                    "0 0 15px rgba(0,255,136,1)",
                    "0 0 8px rgba(0,255,136,0.8)"
                  ]
                } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {char}
              </motion.div>
            );
          })}
        </motion.div>
      ))}

      {/* Secondary slower particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`secondary-${i}`}
          className="absolute font-mono text-[10px] text-cyan-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 12,
            repeat: Infinity,
            ease: "linear" as const,
            delay: Math.random() * 10,
          }}
        >
          {Array.from({ length: Math.floor(Math.random() * 8) + 3 }).map((_, j) => (
            <div key={j} className="mb-2">
              {Math.random() > 0.3 ? chars[Math.floor(Math.random() * 2)] : chars[Math.floor(Math.random() * chars.length)]}
            </div>
          ))}
        </motion.div>
      ))}

      {/* Floating glitch particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`glitch-${i}`}
          className="absolute font-mono text-lg font-bold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 6,
          }}
        >
          <span className="text-accent/60 drop-shadow-[0_0_12px_rgba(0,255,136,0.9)]">
            {chars[Math.floor(Math.random() * chars.length)]}
          </span>
        </motion.div>
      ))}

      {/* Wave effect across screen */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          style={{
            top: `${i * 12.5}%`,
          }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "linear" as const,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Pulsing grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{
          opacity: [0.02, 0.08, 0.02],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Corner accent beams */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner, i) => (
        <motion.div
          key={corner}
          className={`absolute w-32 h-32 ${
            corner.includes('top') ? 'top-0' : 'bottom-0'
          } ${
            corner.includes('left') ? 'left-0' : 'right-0'
          }`}
          style={{
            background: `radial-gradient(circle at ${
              corner.includes('left') ? '0% ' : '100% '
            }${
              corner.includes('top') ? '0%' : '100%'
            }, rgba(0,255,136,0.15) 0%, transparent 70%)`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
            transition={{ duration: 0.8, ease: "easeOut" as const }}
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

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
