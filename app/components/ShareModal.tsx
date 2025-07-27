'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { 
  Copy, 
  Mail, 
  MessageSquare, 
  Twitter, 
  Linkedin,
  X,
  Check,
  Share2,
  QrCode,
  Terminal
} from 'lucide-react';
import { shareMessages, shareViaMethod, canUseNativeShare } from './shareUtils';
import QRCodeDisplay from './QRCodeDisplay';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShareMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  command: string;
  available: boolean;
}

const shareMethods: ShareMethod[] = [
  {
    id: 'sms',
    name: 'Text Message',
    icon: <MessageSquare className="w-5 h-5" />,
    command: 'signal.share --method sms',
    available: true
  },
  {
    id: 'email',
    name: 'Email',
    icon: <Mail className="w-5 h-5" />,
    command: 'signal.share --method email',
    available: true
  },
  {
    id: 'copy',
    name: 'Copy Link',
    icon: <Copy className="w-5 h-5" />,
    command: 'signal.share --method clipboard',
    available: true
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: <Twitter className="w-5 h-5" />,
    command: 'signal.share --method twitter',
    available: true
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: <MessageSquare className="w-5 h-5" />,
    command: 'signal.share --method whatsapp',
    available: true
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <Linkedin className="w-5 h-5" />,
    command: 'signal.share --method linkedin',
    available: true
  }
];

const terminalLines = [
  { text: "$ signal.share()", delay: 200 },
  { text: "✓ ready", delay: 400 },
  { text: "$ select method:", delay: 600 }
];

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [terminalProgress, setTerminalProgress] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showNativeShare, setShowNativeShare] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset state when opening
      setTerminalProgress(0);
      setSelectedMethod(null);
      setShowSuccess(false);
      setShowQR(false);
      setIsSharing(false);
      
      // Check for native share capability
      setShowNativeShare(canUseNativeShare());
      
      // Animate terminal lines
      terminalLines.forEach((_, index) => {
        setTimeout(() => {
          setTerminalProgress(index + 1);
        }, terminalLines[index].delay);
      });
    }
  }, [isOpen]);

  const handleShare = useCallback(async (methodId: string) => {
    setSelectedMethod(methodId);
    setIsSharing(true);
    
    // Simulate processing
    setTimeout(async () => {
      const success = await shareViaMethod(methodId);
      
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          if (methodId !== 'copy') {
            onClose();
          }
        }, 2000);
      }
      setIsSharing(false);
    }, 500);
  }, [onClose]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Signal - 10 builders. weekly vc dinners.',
          text: shareMessages.sms,
          url: 'https://signal.mylon.ai'
        });
        setShowSuccess(true);
        setTimeout(onClose, 1500);
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key >= '1' && e.key <= '6') {
      const index = parseInt(e.key) - 1;
      if (shareMethods[index]) {
        handleShare(shareMethods[index].id);
      }
    }
  }, [isOpen, onClose, handleShare]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card-bg border border-card-border rounded-2xl max-w-md sm:max-w-lg w-full max-h-[90vh] my-4 sm:my-8 overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-card-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-background" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-foreground font-mono">share signal</h2>
                  <p className="text-xs text-foreground/60 font-mono hidden sm:block">
                    spread the word about high-signal builder dinners
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-foreground/50 hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1">
            {/* Terminal Output */}
            <div className="bg-background border border-card-border rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 font-mono text-xs sm:text-sm">
              <div className="flex items-center space-x-2 mb-3">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="text-foreground/50">signal@yale:~</span>
              </div>
              
              {terminalLines.slice(0, terminalProgress).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-1"
                >
                  <span className="text-accent">{line.text}</span>
                  {index === terminalProgress - 1 && (
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
              
              {selectedMethod && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-2"
                >
                  <span className="text-foreground/50">$ </span>
                  <span className="text-accent">
                    {shareMethods.find(m => m.id === selectedMethod)?.command}
                  </span>
                </motion.div>
              )}
              
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-accent">transmission complete</span>
                  </div>
                  {selectedMethod === 'copy' && (
                    <div className="flex items-center space-x-2">
                      <span className="text-foreground/50">→</span>
                      <a 
                        href="https://signal.mylon.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-hover underline text-sm"
                      >
                        https://signal.mylon.ai
                      </a>
                      <span className="text-foreground/50 text-xs">(copied)</span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Share Methods Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: terminalProgress >= 3 ? 1 : 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 sm:mb-6"
            >
              {shareMethods.map((method, index) => (
                <motion.button
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleShare(method.id)}
                  disabled={isSharing || !method.available}
                  className={`
                    p-3 sm:p-4 bg-background border rounded-lg font-mono text-xs sm:text-sm
                    transition-all duration-200 group relative
                    ${selectedMethod === method.id 
                      ? 'border-accent bg-accent/10' 
                      : 'border-card-border hover:border-accent/50'
                    }
                    ${isSharing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}
                  `}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`
                      ${selectedMethod === method.id ? 'text-accent' : 'text-foreground/70 group-hover:text-accent'}
                      transition-colors
                    `}>
                      {method.icon}
                    </div>
                    <span className={`
                      ${selectedMethod === method.id ? 'text-accent' : 'text-foreground/70'}
                    `}>
                      {method.name}
                    </span>
                  </div>
                  <span className="absolute top-2 left-2 text-xs text-foreground/30">
                    [{index + 1}]
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Additional Options */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 sm:pt-4 border-t border-card-border space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="flex items-center space-x-2 px-2 sm:px-3 py-1.5 text-foreground/50 hover:text-foreground font-mono text-xs sm:text-sm transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  <span>QR code</span>
                </button>
                
                {showNativeShare && (
                  <button
                    onClick={handleNativeShare}
                    className="flex items-center space-x-2 px-2 sm:px-3 py-1.5 text-foreground/50 hover:text-foreground font-mono text-xs sm:text-sm transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>more options</span>
                  </button>
                )}
              </div>
              
              <div className="text-xs text-foreground/30 font-mono hidden sm:block">
                press [1-6] or ESC
              </div>
            </div>

            {/* QR Code Display */}
            <AnimatePresence>
              {showQR && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden"
                >
                  <QRCodeDisplay url="https://signal.mylon.ai" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 