'use client';

import { motion } from 'framer-motion';

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

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center">
      {/* Hero Section */}
      <section className="relative px-6 py-20 sm:px-8 lg:px-12 w-full">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-12 text-center"
          >
            {/* Terminal-like header */}
            <motion.div
              variants={itemVariants}
              className="font-mono text-accent text-sm"
            >
              <span className="text-foreground/50">$</span> cd /yale/signal && ls -la
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
            >
              <span className="font-mono text-accent">signal</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground/80">
                10 builders. weekly vc dinners.
              </span>
            </motion.h1>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 text-sm font-mono"
            >
              <div className="flex items-center space-x-2 px-4 py-3 bg-card-bg border border-card-border rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400">online</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-3 bg-card-bg border border-card-border rounded-lg">
                <span className="text-foreground/70">commits:</span>
                <span className="text-accent">∞</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-3 bg-card-bg border border-card-border rounded-lg">
                <span className="text-foreground/70">location:</span>
                <span className="text-foreground">new haven</span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-8"
            >
              <motion.a
                href="mailto:signal@yale.edu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-accent hover:bg-accent-hover text-background font-medium rounded-lg transition-colors duration-200 font-mono border border-accent hover:shadow-lg hover:shadow-accent/25"
              >
                <span>./contact.sh</span>
                <span className="text-lg">→</span>
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
            transition={{ delay: 2, duration: 0.6 }}
            className="text-center"
          >
            <div className="text-xs text-foreground/40 font-mono">
              built with ❤️ by builders, for builders
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
