import { Heart, Play, Pause } from "lucide-react";
import type { FrequencyData, FrequencyCategory } from "@/lib/frequencies";

interface FrequencyCardProps {
  freq: FrequencyData;
  isPlaying: boolean;
  onToggle: () => void;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

const categoryBadge: Record<FrequencyCategory, string> = {
  stop_overthinking: "bg-primary/10 text-primary border-primary/20",
  study_fast: "bg-secondary/10 text-secondary border-secondary/20",
  stress_relief: "bg-accent/10 text-accent border-accent/20",
  control_emotions: "bg-primary/10 text-primary border-primary/20",
};

const categoryLabel: Record<FrequencyCategory, string> = {
  stop_overthinking: "Overthinking",
  study_fast: "Study",
  stress_relief: "Stress",
  control_emotions: "Emotions",
};

const FrequencyCard = ({ freq, isPlaying, onToggle, isFavorite = false, onFavoriteToggle }: FrequencyCardProps) => {
  return (
    <article
      className={`card-hover group relative w-full text-left rounded-xl border p-4 transition-all duration-300 ${
        isPlaying
          ? "border-primary/40 bg-primary/5 glow-primary"
          : "border-border bg-card hover:border-primary/20"
      }`}
    >
      {isPlaying && (
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-wave" />
        </div>
      )}

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-foreground">
              {freq.hz} Hz
            </span>
            <span
              className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                categoryBadge[freq.category]
              }`}
            >
              {categoryLabel[freq.category]}
            </span>
          </div>
          <p className="text-sm font-medium text-primary mb-0.5">{freq.name}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {freq.description}
          </p>

          <button
            type="button"
            onClick={onFavoriteToggle}
            className={`mt-3 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[10px] font-semibold uppercase transition-colors ${
              isFavorite
                ? "border-primary/30 bg-primary/15 text-primary"
                : "border-border bg-muted/50 text-muted-foreground hover:border-primary/30 hover:text-primary"
            }`}
          >
            <Heart size={12} className={isFavorite ? "fill-current" : ""} />
            {isFavorite ? "Favourited" : "Add to favourites"}
          </button>
        </div>

        <button
          type="button"
          onClick={onToggle}
          aria-label={`Play ${freq.name}`}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? "bg-primary text-primary-foreground animate-pulse-glow"
              : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
          }`}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
      </div>

      {isPlaying && (
        <div className="flex items-end gap-0.5 mt-3 h-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/40 rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </article>
  );
};

export default FrequencyCard;
