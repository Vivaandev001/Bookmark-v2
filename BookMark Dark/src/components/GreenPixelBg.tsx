import React, { useEffect, useRef } from 'react';

export default function GreenPixelBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // Organic strand definitions representing the green pixel roots
    interface Strand {
      x: number;
      y: number;
      speed: number;
      points: { dx: number; dy: number; alpha: number; pulseSpeed: number; pulseOffset: number; size: number }[];
    }

    let strands: Strand[] = [];

    const initStrands = (w: number, h: number) => {
      strands = [];
      // Create organic vertical strands that concentrate on the bottom-right & center-right
      const count = 45;
      for (let i = 0; i < count; i++) {
        // Concentrate 70% of strands on the right 50% of the screen
        const isRightHeavy = Math.random() < 0.75;
        const xBase = isRightHeavy 
          ? w * 0.5 + Math.random() * (w * 0.5) 
          : Math.random() * (w * 0.5);

        // Strands start from the bottom half of the screen
        const yBase = h * 0.3 + Math.random() * (h * 0.7);
        
        const pointsCount = 15 + Math.floor(Math.random() * 30);
        const points = [];
        let currX = 0;
        let currY = 0;

        for (let j = 0; j < pointsCount; j++) {
          // Travel mostly upwards, branching out slightly
          currY -= (4 + Math.random() * 12);
          // Add organic curves (swerving left/right)
          currX += (Math.random() - 0.5) * 8;
          
          points.push({
            dx: currX,
            dy: currY,
            alpha: 0.15 + Math.random() * 0.6,
            pulseSpeed: 0.01 + Math.random() * 0.02,
            pulseOffset: Math.random() * Math.PI * 2,
            size: Math.random() < 0.25 ? 2.5 : 1.5, // Pixel size
          });
        }

        strands.push({
          x: xBase,
          y: yBase,
          speed: 0.05 + Math.random() * 0.1,
          points,
        });
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        width = w;
        height = h;
        
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);

        initStrands(w, h);
      }
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    let time = 0;
    const render = () => {
      time += 0.5;
      ctx.clearRect(0, 0, width, height);

      // Check the active theme dynamically
      const themeAttr = document.documentElement.getAttribute('data-theme') || 'light';
      const isDarkTheme = themeAttr === 'dark';

      // Theme-specific colors
      const glowColor = isDarkTheme ? 'rgba(6, 182, 212, 0.04)' : 'rgba(16, 185, 129, 0.06)';
      const glowColorSubtle = isDarkTheme ? 'rgba(6, 182, 212, 0.01)' : 'rgba(16, 185, 129, 0.015)';
      const pixelColorBase = isDarkTheme ? '34, 211, 238' : '52, 211, 153'; // Cyan-400 vs Emerald-400
      const pulseColor = isDarkTheme ? 'rgba(165, 243, 252, 0.22)' : 'rgba(110, 231, 183, 0.25)';

      // 1. Draw a deep soft radial glow in the center-right (atmosphere matching the active theme)
      const gradient = ctx.createRadialGradient(
        width * 0.75, height * 0.7, 10,
        width * 0.75, height * 0.7, Math.max(width * 0.5, 400)
      );
      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(0.5, glowColorSubtle);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw the vertical, organic digital pixel strands
      strands.forEach((strand) => {
        strand.points.forEach((pt) => {
          const px = strand.x + pt.dx;
          const py = strand.y + pt.dy;

          // Only draw if within bounds
          if (px < 0 || px > width || py < 0 || py > height) return;

          // Pulse pixel opacity elegantly over time
          const pulse = Math.sin(time * pt.pulseSpeed + pt.pulseOffset);
          const currentAlpha = Math.max(0.01, (pt.alpha + pulse * 0.15) * 0.12);

          // Theme-dependent colored pixels
          ctx.fillStyle = `rgba(${pixelColorBase}, ${currentAlpha})`;

          // Draw pixel square
          ctx.fillRect(px, py, pt.size, pt.size);

          // Occasionally draw a tiny horizontal connection tick for high-tech digital grid feeling
          if (Math.random() < 0.0001) {
            ctx.fillStyle = `rgba(${pixelColorBase}, ${currentAlpha * 0.4})`;
            ctx.fillRect(px - 10, py, 20, 1);
          }
        });
      });

      // 3. Draw rare, bright falling pixels ("matrix droplets" or glowing terminal nodes)
      ctx.fillStyle = pulseColor;
      strands.forEach((strand) => {
        // Pick a point near the end of the strand to glow brighter
        const pulseIndex = Math.floor((time * strand.speed) % strand.points.length);
        const pt = strand.points[pulseIndex];
        if (pt) {
          const px = strand.x + pt.dx;
          const py = strand.y + pt.dy;
          ctx.fillRect(px - 0.5, py - 0.5, pt.size + 1, pt.size + 1);
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 mix-blend-screen opacity-90"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
}
