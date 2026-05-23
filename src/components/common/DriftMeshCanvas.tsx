import { useEffect, useRef } from 'react';

interface DriftMeshCanvasProps {
  opacity?: number;
}

const DriftMeshCanvas = ({ opacity = 0.18 }: DriftMeshCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let offsetX = 0;
    let offsetY = 0;

    const isMobile = () => window.innerWidth < 768;

    const getConfig = () => {
      const mobile = isMobile();
      return {
        spacing: mobile ? 40 : 60,
        speed: mobile ? 0.12 : 0.18,
        dotRadius: mobile ? 1 : 1.5,
        lineWidth: mobile ? 0.4 : 0.6,
      };
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      const { width, height } = canvas;
      const { spacing, speed, dotRadius, lineWidth } = getConfig();

      ctx.clearRect(0, 0, width, height);

      // slowly drift the offset
      offsetX = (offsetX + speed * 0.4) % spacing;
      offsetY = (offsetY + speed * 0.25) % spacing;

      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      const startX = -spacing + (offsetX % spacing);
      const startY = -spacing + (offsetY % spacing);

      ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
      ctx.lineWidth = lineWidth;
      ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 1.4})`;

      // horizontal lines
      for (let r = 0; r < rows; r++) {
        const y = startY + r * spacing;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(startX + cols * spacing, y);
        ctx.stroke();
      }

      // vertical lines
      for (let c = 0; c < cols; c++) {
        const x = startX + c * spacing;
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY + rows * spacing);
        ctx.stroke();
      }

      // dots at intersections
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * spacing;
          const y = startY + r * spacing;
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    requestAnimationFrame(() => {
      resize();
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

export default DriftMeshCanvas;
