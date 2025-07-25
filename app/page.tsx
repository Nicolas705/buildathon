'use client';

import { motion } from 'framer-motion';

// Mock data for the 10 builders - more casual and realistic
const builders = [
  {
    id: 1,
    name: 'alex',
    description: 'shipped 3 startups. currently building AI tutors',
    avatar: '👨‍💻',
    status: 'building',
    github: '@alexc'
  },
  {
    id: 2,
    name: 'sarah',
    description: 'climate tech obsessed. ex-tesla engineer',
    avatar: '🌱',
    status: 'shipping',
    github: '@sarahk'
  },
  {
    id: 3,
    name: 'marcus',
    description: 'defi degen turned founder. 24/7 on-chain',
    avatar: '⚡',
    status: 'coding',
    github: '@mjohnson'
  },
  {
    id: 4,
    name: 'emma',
    description: 'design systems wizard. makes devs cry (happy tears)',
    avatar: '🎨',
    status: 'designing',
    github: '@emmarod'
  },
  {
    id: 5,
    name: 'david',
    description: 'k8s expert. infrastructure is my love language',
    avatar: '☸️',
    status: 'deploying',
    github: '@dpark'
  },
  {
    id: 6,
    name: 'maya',
    description: 'data scientist by day, crypto researcher by night',
    avatar: '📊',
    status: 'analyzing',
    github: '@mayap'
  },
  {
    id: 7,
    name: 'james',
    description: 'mobile first. react native evangelist',
    avatar: '📱',
    status: 'refactoring',
    github: '@jwilson'
  },
  {
    id: 8,
    name: 'lisa',
    description: 'security researcher. breaking things professionally',
    avatar: '🔒',
    status: 'hacking',
    github: '@lisaz'
  },
  {
    id: 9,
    name: 'ryan',
    description: 'devops magician. automates everything',
    avatar: '🔧',
    status: 'automating',
    github: '@ryanoc'
  },
  {
    id: 10,
    name: 'aria',
    description: 'quantum computing researcher. future is weird',
    avatar: '🔬',
    status: 'researching',
    github: '@ariashah'
  }
];

// Enhanced animation variants for more dramatic sequential loading
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3 // Longer delay between each builder
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

const builderVariants = {
  hidden: { 
    scale: 0.5, 
    opacity: 0, 
    y: 50,
    rotateX: -90 
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 12,
      duration: 0.8
    }
  }
};

const statusColors = {
  building: 'text-accent',
  shipping: 'text-blue-400',
  coding: 'text-purple-400',
  designing: 'text-pink-400',
  deploying: 'text-yellow-400',
  analyzing: 'text-orange-400',
  refactoring: 'text-green-400',
  hacking: 'text-red-400',
  automating: 'text-cyan-400',
  researching: 'text-indigo-400'
};

function BuilderCard({ builder, index }: { builder: typeof builders[0]; index: number }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={builderVariants}
      transition={{ delay: index * 0.4 }} // Much longer delay for dramatic effect
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
      }}
      className="group relative p-6 bg-card-bg border border-card-border rounded-xl hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 cursor-pointer hover:border-accent/50"
    >
      <div className="flex flex-col space-y-4">
        {/* Status indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className={`text-xs font-mono ${statusColors[builder.status as keyof typeof statusColors]}`}>
              {builder.status}
            </span>
          </div>
          <span className="text-xs text-foreground/50 font-mono">{builder.github}</span>
        </div>
        
        {/* Avatar and name */}
        <div className="text-center space-y-3">
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
            {builder.avatar}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300 font-mono">
              {builder.name}
            </h3>
            <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
              {builder.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Terminal-like border glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-20 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-12"
          >
            {/* Terminal-like header */}
            <motion.div
              variants={itemVariants}
              className="font-mono text-accent text-sm mb-8"
            >
              <span className="text-foreground/50">$</span> cd /yale/signal && ls -la
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              <span className="font-mono text-accent">signal</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground/80">
                10 builders. weekly vc dinners.
              </span>
            </motion.h1>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 text-sm font-mono"
            >
              <div className="flex items-center space-x-2 px-3 py-2 bg-card-bg border border-card-border rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400">online</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-card-bg border border-card-border rounded-lg">
                <span className="text-foreground/70">commits:</span>
                <span className="text-accent">∞</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-card-bg border border-card-border rounded-lg">
                <span className="text-foreground/70">location:</span>
                <span className="text-foreground">new haven</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Builder Showcase */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="font-mono text-accent text-sm mb-4">
              <span className="text-foreground/50">$</span> cat builders.json
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-mono">
              meet.the.team()
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl">
              these are the people actually building stuff. not just talking about it.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {builders.map((builder, index) => (
              <BuilderCard key={builder.id} builder={builder} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Dinners Section */}
      <section className="px-6 py-20 sm:px-8 lg:px-12 border-t border-card-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="font-mono text-accent text-sm">
              <span className="text-foreground/50">$</span> explain weekly_dinners
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-mono">
                dinner.exe --with-vcs
              </h2>
              
              <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
                every thursday. 10 builders. top-tier vcs and operators. no bs networking. 
                just real conversations about building the future.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                <div className="text-center space-y-2 p-4 bg-card-bg border border-card-border rounded-lg">
                  <div className="text-3xl font-bold text-accent font-mono">10</div>
                  <div className="text-sm text-foreground/70 font-mono">builders.length</div>
                </div>
                <div className="text-center space-y-2 p-4 bg-card-bg border border-card-border rounded-lg">
                  <div className="text-3xl font-bold text-accent font-mono">52</div>
                  <div className="text-sm text-foreground/70 font-mono">dinners/year</div>
                </div>
                <div className="text-center space-y-2 p-4 bg-card-bg border border-card-border rounded-lg">
                  <div className="text-3xl font-bold text-accent font-mono">∞</div>
                  <div className="text-sm text-foreground/70 font-mono">possibilities</div>
                </div>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <a
                href="mailto:signal@yale.edu"
                className="inline-flex items-center space-x-3 px-6 py-3 bg-accent hover:bg-accent-hover text-background font-medium rounded-lg transition-colors duration-200 font-mono border border-accent hover:shadow-lg hover:shadow-accent/25"
              >
                <span>./contact.sh</span>
                <span className="text-lg">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 sm:px-8 lg:px-12 border-t border-card-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="font-mono text-accent text-sm">
              <span className="text-foreground/50">$</span> cat /etc/signal/info
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-mono font-bold text-background">
                S
              </div>
              <div className="text-left">
                <div className="text-xl font-semibold text-foreground font-mono">signal</div>
                <div className="text-sm text-foreground/60 font-mono">v1.0.0</div>
              </div>
            </div>
            
            <p className="text-foreground/60 text-sm max-w-md mx-auto font-mono">
              connecting yale&apos;s most ambitious builders with the investors who get it.
            </p>
            
            <div className="pt-4 space-y-2">
              <a
                href="mailto:signal@yale.edu"
                className="text-accent hover:text-accent-hover transition-colors duration-200 text-sm font-mono block"
              >
                signal@yale.edu
              </a>
              <div className="text-xs text-foreground/40 font-mono">
                built with ❤️ by builders, for builders
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
