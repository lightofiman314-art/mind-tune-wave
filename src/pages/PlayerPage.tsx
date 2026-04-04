import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause, Repeat, Volume2, VolumeX } from "lucide-react";
import { frequencies } from "@/lib/frequencies";
import { playFrequency, stopFrequency, setVolume } from "@/lib/audioEngine";
import { useAuth } from "@/contexts/AuthContext";

const PlayerPage = () => {
  const { hz } = useParams<{ hz: string }>();
  const navigate = useNavigate();
  const { user, hasUsedFreeTrial, markTrialUsed } = useAuth();

  const freq = frequencies.find((f) => f.hz === parseFloat(hz || "0"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Auth gate: if trial used & not logged in, redirect
  useEffect(() => {
    if (!user && hasUsedFreeTrial) {
      navigate("/auth", { replace: true });
    }
  }, [user, hasUsedFreeTrial, navigate]);

  // Mark trial on first play
  const handlePlay = useCallback(() => {
    if (!freq) return;
    if (isPlaying) {
      stopFrequency();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      playFrequency(freq.hz, volume);
      setIsPlaying(true);
      if (!user) markTrialUsed();
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
  }, [freq, isPlaying, volume, user, markTrialUsed]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopFrequency();
      if (timerRef.current) clearInterval(timerRef.current);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !freq) return;
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

    // Orbs
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

      // Background gradient circles
      const cx = cw / 2;
      const cy = ch / 2;

      if (isPlaying) {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cw * 0.4);
        grad.addColorStop(0, freq.gradientFrom + "20");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cw, ch);
      }

      // Orbs
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

      // Wave rings
      if (isPlaying) {
        const numRings = 4;
        for (let i = 0; i < numRings; i++) {
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

      // Central waveform
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

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolumeState(v);
    setVolume(v);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  if (!freq) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Frequency not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-4">
        <button
          onClick={() => { stopFrequency(); navigate("/"); }}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          {volume === 0 ? <VolumeX size={16} className="text-muted-foreground" /> : <Volume2 size={16} className="text-primary" />}
          <input
            type="range" min="0" max="0.6" step="0.01" value={volume}
            onChange={handleVolume}
            className="w-20 h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Frequency display */}
        <div className="mb-2">
          <span className="text-6xl font-bold text-foreground tracking-tight">{freq.hz}</span>
          <span className="text-2xl text-muted-foreground ml-1">Hz</span>
        </div>
        <h2 className="text-xl font-semibold text-primary mb-1">{freq.name}</h2>
        <p className="text-sm text-muted-foreground mb-8">{freq.description}</p>

        {/* Timer */}
        <p className="text-lg font-mono text-foreground/60 mb-8">{formatTime(elapsed)}</p>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setRepeat(!repeat)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              repeat ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <Repeat size={20} />
          </button>

          <button
            onClick={handlePlay}
            className="w-20 h-20 rounded-full flex items-center justify-center bg-primary text-primary-foreground transition-all hover:scale-105 active:scale-95"
            style={{ boxShadow: isPlaying ? `0 0 40px ${freq.gradientFrom}60` : undefined }}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </button>

          <button
            onClick={() => { setElapsed(0); }}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-muted text-muted-foreground hover:text-foreground transition-all text-xs font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Description panel */}
      <div className="relative z-10 px-6 pb-8 pt-4">
        <div className="rounded-xl bg-card/80 backdrop-blur border border-border p-4 max-h-48 overflow-y-auto">
          <h3 className="text-sm font-semibold text-foreground mb-2">About this Frequency</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">{freq.longDescription}</p>
          <div className="flex flex-wrap gap-1.5">
            {freq.benefits.map((b) => (
              <span key={b} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
