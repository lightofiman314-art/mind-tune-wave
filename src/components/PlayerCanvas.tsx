import { useEffect, useRef } from "react";
import type { FrequencyData } from "@/lib/frequencies";

interface PlayerCanvasProps {
  freq: FrequencyData;
  isPlaying: boolean;
}

const PlayerCanvas = ({ freq, isPlaying }: PlayerCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;
    let t = 0;

    const orbs = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * 300,
      y: Math.random() * 300,
      r: 8 + Math.random() * 20,
      speed: 0.3 + Math.random() * 0.7,
      phase: i * 0.8,
    }));

    const draw = () => {
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);
      t += isPlaying ? 0.02 : 0.005;

      const cx = cw / 2;
      const cy = ch / 2;

      if (isPlaying) {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cw * 0.4);
        grad.addColorStop(0, freq.gradientFrom + "20");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cw, ch);
      }

      orbs.forEach((orb) => {
        const amp = isPlaying ? 1 : 0.2;
        const ox = cx + Math.sin(t * orb.speed + orb.phase) * (cw * 0.3) * amp;
        const oy = cy + Math.cos(t * orb.speed * 0.7 + orb.phase) * (ch * 0.25) * amp;
        const pulse = isPlaying ? 1 + Math.sin(t * 3 + orb.phase) * 0.3 : 1;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r * pulse * 2);
        grad.addColorStop(0, freq.gradientFrom + (isPlaying ? "60" : "20"));
        grad.addColorStop(0.5, freq.gradientTo + (isPlaying ? "30" : "10"));
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r * pulse * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      if (isPlaying) {
        for (let i = 0; i < 4; i++) {
          const phase = (t * 2 + i * 1.5) % 6;
          const radius = phase * cw * 0.12;
          const alpha = Math.max(0, 1 - phase / 6);
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = freq.gradientFrom + Math.round(alpha * 40).toString(16).padStart(2, "0");
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      ctx.beginPath();
      const waveFreq = Math.min(freq.hz / 50, 8);
      const waveAmp = isPlaying ? ch * 0.08 : ch * 0.02;
      for (let x = 0; x < cw; x++) {
        const y = cy + Math.sin((x / cw) * Math.PI * waveFreq + t * 3) * waveAmp * Math.sin((x / cw) * Math.PI);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = freq.gradientFrom + (isPlaying ? "80" : "30");
      ctx.lineWidth = 2;
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [freq, isPlaying]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default PlayerCanvas;
