'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  url: string;
}

export default function QRCodeDisplay({ url }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: 160,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
          errorCorrectionLevel: 'M',
        },
        (error) => {
          if (error) {
            console.error('QR Code generation error:', error);
          } else {
            // Add Signal branding below QR code
            const canvas = canvasRef.current;
            if (canvas) {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.fillStyle = '#00ff88';
                ctx.font = 'bold 12px JetBrains Mono';
                ctx.textAlign = 'center';
                ctx.fillText('signal.community', canvas.width / 2, canvas.height - 10);
              }
            }
          }
        }
      );
    }
  }, [url]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-background border border-card-border rounded-lg p-6 text-center"
    >
      <div className="mb-4">
        <p className="text-foreground/60 font-mono text-sm mb-2">
          scan to share signal
        </p>
        <canvas
          ref={canvasRef}
          width={160}
          height={180}
          className="mx-auto bg-white rounded"
        />
      </div>
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-foreground/40 font-mono hover:text-accent transition-colors underline"
      >
        {url}
      </a>
    </motion.div>
  );
} 