import { useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { frequencies } from "@/lib/frequencies";
import { playFrequency, stopFrequency, setVolume } from "@/lib/audioEngine";
import FrequencyCard from "@/components/FrequencyCard";
import WaveVisualizer from "@/components/WaveVisualizer";
import FloatingOrbs from "@/components/FloatingOrbs";

const Index = () => {
  const [activeHz, setActiveHz] = useState<number | null>(null);
  const [volume, setVolumeState] = useState(0.3);

  const handleToggle = useCallback(
    (hz: number) => {
      if (activeHz === hz) {
        stopFrequency();
        setActiveHz(null);
      } else {
        playFrequency(hz, volume);
        setActiveHz(hz);
      }
    },
    [activeHz, volume]
  );

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolumeState(v);
    setVolume(v);
  };

  const activeFreq = frequencies.find((f) => f.hz === activeHz);

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingOrbs />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Mind Control
              <span className="text-primary"> — Sound Therapy</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Healing frequencies for mind & body
            </p>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            {volume === 0 ? (
              <VolumeX size={18} className="text-muted-foreground" />
            ) : (
              <Volume2 size={18} className="text-primary" />
            )}
            <input
              type="range"
              min="0"
              max="0.6"
              step="0.01"
              value={volume}
              onChange={handleVolume}
              className="w-24 h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </header>

      {/* Active visualizer */}
      {activeHz && (
        <div className="container max-w-6xl mx-auto px-4 pt-6">
          <div className="rounded-xl border border-primary/20 bg-card/50 backdrop-blur p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-sm font-medium text-primary">
                Now Playing: {activeFreq?.hz} Hz — {activeFreq?.name}
              </span>
            </div>
            <WaveVisualizer isPlaying={true} hz={activeHz} />
          </div>
        </div>
      )}

      {/* Frequency grid */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Category sections */}
        {(["solfeggio", "brainwave", "special"] as const).map((cat) => {
          const catFreqs = frequencies.filter((f) => f.category === cat);
          const labels = {
            solfeggio: "Solfeggio Frequencies",
            brainwave: "Brainwave Entrainment",
            special: "Special Frequencies",
          };
          return (
            <section key={cat} className="mb-10">
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-medium">
                {labels[cat]}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {catFreqs.map((freq) => (
                  <FrequencyCard
                    key={freq.hz}
                    freq={freq}
                    isPlaying={activeHz === freq.hz}
                    onToggle={() => handleToggle(freq.hz)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default Index;
