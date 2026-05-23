import { useEffect, useRef } from 'react';

interface MeshCanvasProps {
  opacity?: number;
}

const ROWS = 30;
const COLS = 40;
const SPACING = 40;
const FOCAL_LENGTH = 500;

class GridParticle {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  project(width: number, height: number): { sx: number; sy: number; scale: number } | null {
    const scale = FOCAL_LENGTH / (FOCAL_LENGTH + this.z);
    if (scale <= 0) return null;
    return {
      sx: width / 2 + this.x * scale,
      sy: height / 2 + this.y * scale,
      scale,
    };
  }
}

const MeshCanvas = ({ opacity = 0.38 }: MeshCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: GridParticle[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles = [];
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          const x = (j - COLS / 2) * SPACING;
          const z = (i - ROWS / 2) * SPACING;
          const y = canvas.height * 0.28; // sit in lower portion
          particles.push(new GridParticle(x, y, z));
        }
      }
    };

    const draw = (time: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // compute projected positions with wave applied
      const projected: ({ sx: number; sy: number; scale: number } | null)[] = particles.map((p, idx) => {
        const col = idx % COLS;
        const row = Math.floor(idx / COLS);
        const wave =
          Math.sin(time * 0.0004 + col * 0.25) * 18 +
          Math.cos(time * 0.0003 + row * 0.3) * 12;
        const waved = new GridParticle(p.x, p.y + wave, p.z);
        return waved.project(width, height);
      });

      // draw horizontal lines
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS - 1; j++) {
          const a = projected[i * COLS + j];
          const b = projected[i * COLS + j + 1];
          if (!a || !b) continue;
          const alpha = opacity * Math.min(a.scale, b.scale) * 2.5;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(96, 165, 250, ${Math.min(alpha, opacity)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }

      // draw vertical lines
      for (let j = 0; j < COLS; j++) {
        for (let i = 0; i < ROWS - 1; i++) {
          const a = projected[i * COLS + j];
          const b = projected[(i + 1) * COLS + j];
          if (!a || !b) continue;
          const alpha = opacity * Math.min(a.scale, b.scale) * 2.5;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(96, 165, 250, ${Math.min(alpha, opacity)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }

      // draw dots at intersections
      for (const p of projected) {
        if (!p) continue;
        const alpha = opacity * p.scale * 2.5;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.scale * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${Math.min(alpha, opacity * 1.2)})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    requestAnimationFrame(() => {
      init();
      animationId = requestAnimationFrame(draw);
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', bottom: 0, left: 0, right: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
};

export default MeshCanvas;
