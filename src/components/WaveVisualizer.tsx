import { useEffect, useRef } from "react";

interface WaveVisualizerProps {
  isPlaying: boolean;
  hz: number;
}

const WaveVisualizer = ({ isPlaying, hz }: WaveVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      if (!isPlaying) {
        // Static line
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.strokeStyle = "rgba(45, 212, 191, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
        return;
      }

      t += 0.03;
      const freq = Math.min(hz / 50, 8);

      // Draw multiple waves
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        const alpha = 0.6 - layer * 0.15;
        const amp = (h / 3) * (1 - layer * 0.25);
        const phase = layer * 0.8;

        for (let x = 0; x < w; x++) {
          const y = h / 2 + Math.sin((x / w) * Math.PI * freq + t + phase) * amp * Math.sin((x / w) * Math.PI);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const hue = 174 + layer * 40;
        ctx.strokeStyle = `hsla(${hue}, 72%, 50%, ${alpha})`;
        ctx.lineWidth = 2 - layer * 0.5;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    if (isPlaying) {
      animRef.current = requestAnimationFrame(draw);
    }

    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, hz]);

  return <canvas ref={canvasRef} className="w-full h-24 rounded-lg" />;
};

export default WaveVisualizer;
