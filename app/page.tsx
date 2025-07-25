'use client';

import { motion } from 'framer-motion';

// Mock data for the 10 builders
const builders = [
  {
    id: 1,
    name: 'Alex Chen',
    description: 'AI/ML Engineer, Building next-gen education tools',
    avatar: '👨‍💻',
    project: 'EduTech AI'
  },
  {
    id: 2,
    name: 'Sarah Kim',
    description: 'Full-stack Developer, Climate tech solutions',
    avatar: '👩‍💼',
    project: 'GreenFlow'
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    description: 'Blockchain Engineer, DeFi protocols',
    avatar: '👨‍🔬',
    project: 'YieldChain'
  },
  {
    id: 4,
    name: 'Emma Rodriguez',
    description: 'Product Designer, Healthcare innovation',
    avatar: '👩‍🎨',
    project: 'MedConnect'
  },
  {
    id: 5,
    name: 'David Park',
    description: 'Systems Engineer, Infrastructure automation',
    avatar: '👨‍⚙️',
    project: 'CloudOps Pro'
  },
  {
    id: 6,
    name: 'Maya Patel',
    description: 'Data Scientist, Financial modeling',
    avatar: '👩‍💻',
    project: 'FinPredict'
  },
  {
    id: 7,
    name: 'James Wilson',
    description: 'Mobile Developer, Social impact apps',
    avatar: '👨‍💼',
    project: 'ImpactHub'
  },
  {
    id: 8,
    name: 'Lisa Zhang',
    description: 'Security Engineer, Cybersecurity tools',
    avatar: '👩‍🔬',
    project: 'SecureShield'
  },
  {
    id: 9,
    name: 'Ryan O&apos;Connor',
    description: 'DevOps Engineer, Container orchestration',
    avatar: '👨‍🔧',
    project: 'K8sFlow'
  },
  {
    id: 10,
    name: 'Aria Shah',
    description: 'Research Engineer, Quantum computing',
    avatar: '👩‍⚗️',
    project: 'QuantumLab'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const builderVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

function BuilderCard({ builder, index }: { builder: typeof builders[0]; index: number }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={builderVariants}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
      }}
      className="group relative p-6 bg-card-bg border border-card-border rounded-2xl hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 cursor-pointer"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
          {builder.avatar}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
            {builder.name}
          </h3>
          <p className="text-sm text-foreground/70 mt-1 leading-relaxed">
            {builder.description}
          </p>
          <div className="mt-3 px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full inline-block">
            {builder.project}
          </div>
        </div>
      </div>
      
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-8"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
            >
              Signal —{' '}
              <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                Yale&apos;s 10 Exceptional Builders
              </span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed"
            >
              Weekly dinners with top VCs and operators.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="pt-8"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>Building the future, one dinner at a time</span>
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
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Meet the Builders
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Ten exceptional entrepreneurs and technical builders at Yale, each pushing the boundaries of innovation.
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
      <section className="px-6 py-20 sm:px-8 lg:px-12 bg-card-bg/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6">
              <span className="text-2xl">🍽️</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Weekly Dinners
            </h2>
            
                         <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
               Every week, Signal brings Yale&apos;s brightest founders together with leading investors and operators. 
               These intimate gatherings foster deep connections, spark collaborations, and accelerate the next 
               generation of world-changing companies.
             </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-accent">10</div>
                <div className="text-sm text-foreground/70">Exceptional Builders</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-accent">52</div>
                <div className="text-sm text-foreground/70">Dinners Per Year</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-accent">∞</div>
                <div className="text-sm text-foreground/70">Possibilities</div>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pt-8"
            >
              <a
                href="mailto:signal@yale.edu"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-medium rounded-full transition-colors duration-200"
              >
                <span>Interested? Reach out</span>
                <span>→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 sm:px-8 lg:px-12 border-t border-card-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-semibold text-foreground">Signal</span>
            </div>
            
                         <p className="text-foreground/60 text-sm max-w-md mx-auto">
               Connecting Yale&apos;s most ambitious builders with the investors and operators 
               who can help them change the world.
             </p>
            
            <div className="pt-4">
              <a
                href="mailto:signal@yale.edu"
                className="text-accent hover:text-accent-hover transition-colors duration-200 text-sm font-medium"
              >
                signal@yale.edu
              </a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
