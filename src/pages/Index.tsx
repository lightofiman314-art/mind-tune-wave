import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, LogIn, Headphones } from "lucide-react";
import { frequencies, categoryLabels, type FrequencyCategory } from "@/lib/frequencies";
import FrequencyCard from "@/components/FrequencyCard";
import FloatingOrbs from "@/components/FloatingOrbs";
import { useAuth } from "@/contexts/AuthContext";

const categoryOrder: FrequencyCategory[] = [
  "stop_overthinking",
  "study_fast",
  "stress_relief",
  "control_emotions",
];

const categoryIcons: Record<FrequencyCategory, string> = {
  stop_overthinking: "🧠",
  study_fast: "📚",
  stress_relief: "🧘",
  control_emotions: "💎",
};

const Index = () => {
  const navigate = useNavigate();
  const { user, hasUsedFreeTrial, signOut } = useAuth();

  const handleCardTap = useCallback(
    (hz: number) => {
      if (!user && hasUsedFreeTrial) {
        navigate("/auth");
        return;
      }
      navigate(`/player/${hz}`);
    },
    [user, hasUsedFreeTrial, navigate]
  );

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingOrbs />

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
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut size={14} /> Sign Out
              </button>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
              >
                <LogIn size={14} /> Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Headphones tip */}
      <div className="container max-w-6xl mx-auto px-4 pt-4">
        <div className="rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-center flex items-center justify-center gap-2">
          <Headphones size={16} className="text-primary" />
          <p className="text-xs text-muted-foreground">
            Use headphones 🎧 for better results
          </p>
        </div>
      </div>

      {/* Free trial banner */}
      {!user && !hasUsedFreeTrial && (
        <div className="container max-w-6xl mx-auto px-4 pt-3">
          <div className="rounded-lg bg-primary/10 border border-primary/20 px-4 py-2.5 text-center">
            <p className="text-xs text-primary">
              🎵 Try one frequency for free — create an account to unlock all 20!
            </p>
          </div>
        </div>
      )}

      {/* Frequency grid */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {categoryOrder.map((cat) => {
          const catFreqs = frequencies.filter((f) => f.category === cat);
          return (
            <section key={cat} className="mb-10">
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-medium flex items-center gap-2">
                <span>{categoryIcons[cat]}</span>
                {categoryLabels[cat]}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {catFreqs.map((freq) => (
                  <FrequencyCard
                    key={freq.hz}
                    freq={freq}
                    isPlaying={false}
                    onToggle={() => handleCardTap(freq.hz)}
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
