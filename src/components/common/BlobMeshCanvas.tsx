import { useEffect, useRef } from 'react';

interface BlobMeshCanvasProps {
  opacity?: number;
}

const BlobMeshCanvas = ({ opacity = 0.22 }: BlobMeshCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const mouse = { x: -9999, y: -9999 };

    // mesh grid dimensions
    const COLS = 18;
    const ROWS = 12;

    // mesh anchor — drifts slowly
    const anchor = { x: 0, y: 0, vx: 0.28, vy: 0.18 };
    let cellW = 0;
    let cellH = 0;
    let meshW = 0;
    let meshH = 0;

    // per-point mouse offset (smoothly interpolated)
    const mouseOffsetX = new Float32Array(COLS * ROWS);
    const mouseOffsetY = new Float32Array(COLS * ROWS);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      meshW = canvas.width * (isMobile ? 0.85 : 0.55);
      meshH = meshW * (ROWS / COLS) * (isMobile ? 0.9 : 0.75);
      cellW = meshW / (COLS - 1);
      cellH = meshH / (ROWS - 1);
      anchor.x = canvas.width / 2 - meshW / 2;
      anchor.y = canvas.height / 2 - meshH / 2;
    };

    const draw = (time: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // drift anchor slowly, bounce off walls with padding
      const pad = 60;
      anchor.x += anchor.vx;
      anchor.y += anchor.vy;
      if (anchor.x < pad || anchor.x + meshW > width - pad) anchor.vx *= -1;
      if (anchor.y < pad || anchor.y + meshH > height - pad) anchor.vy *= -1;

      // compute screen position for each grid point
      const sx = new Float32Array(COLS * ROWS);
      const sy = new Float32Array(COLS * ROWS);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const baseX = anchor.x + c * cellW;
          const baseY = anchor.y + r * cellH;

          // flag wave: amplitude grows from left (fixed edge) to right
          const waveProgress = c / (COLS - 1);
          const amplitude = waveProgress * cellH * 1.4;

          const waveY =
            Math.sin(time * 0.0012 + c * 0.45 - r * 0.15) * amplitude +
            Math.cos(time * 0.0008 + r * 0.4 + c * 0.2) * amplitude * 0.35;

          // subtle depth ripple in X too
          const waveX =
            Math.sin(time * 0.0007 + r * 0.5) * waveProgress * cellW * 0.2;

          // mouse repulsion
          const MOUSE_RADIUS = 100;
          const MOUSE_STRENGTH = 22;
          const dx = baseX + waveX - mouse.x;
          const dy = baseY + waveY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let targetOffX = 0;
          let targetOffY = 0;
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH;
            targetOffX = (dx / dist) * force;
            targetOffY = (dy / dist) * force;
          }

          // smooth interpolation toward target
          mouseOffsetX[idx] += (targetOffX - mouseOffsetX[idx]) * 0.12;
          mouseOffsetY[idx] += (targetOffY - mouseOffsetY[idx]) * 0.12;

          sx[idx] = baseX + waveX + mouseOffsetX[idx];
          sy[idx] = baseY + waveY + mouseOffsetY[idx];
        }
      }

      // draw horizontal lines
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const a = r * COLS + c;
          const b = r * COLS + c + 1;
          // fade right side slightly more
          const alpha = opacity * (0.6 + 0.4 * (c / (COLS - 1)));
          ctx.beginPath();
          ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(sx[a], sy[a]);
          ctx.lineTo(sx[b], sy[b]);
          ctx.stroke();
        }
      }

      // draw vertical lines
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 1; r++) {
          const a = r * COLS + c;
          const b = (r + 1) * COLS + c;
          const alpha = opacity * (0.6 + 0.4 * (c / (COLS - 1)));
          ctx.beginPath();
          ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(sx[a], sy[a]);
          ctx.lineTo(sx[b], sy[b]);
          ctx.stroke();
        }
      }

      // dots at intersections
      for (let i = 0; i < COLS * ROWS; i++) {
        const c = i % COLS;
        const dotAlpha = opacity * (0.5 + 0.5 * (c / (COLS - 1)));
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${dotAlpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);

    requestAnimationFrame(() => {
      resize();
      animationId = requestAnimationFrame(draw);
    });

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}
    />
  );
};

export default BlobMeshCanvas;
