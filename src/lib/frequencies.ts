export interface FrequencyData {
  hz: number;
  name: string;
  description: string;
  category: "solfeggio" | "brainwave" | "special";
  color: string;
}

export const frequencies: FrequencyData[] = [
  { hz: 174, name: "The Grounder", description: "Pain relief and physical security", category: "solfeggio", color: "from-red-500/20 to-orange-500/20" },
  { hz: 285, name: "The Restorer", description: "Tissue and energetic rejuvenation", category: "solfeggio", color: "from-orange-500/20 to-amber-500/20" },
  { hz: 396, name: "Fear Dissolve", description: "Releasing guilt and emotional blocks", category: "solfeggio", color: "from-red-600/20 to-rose-500/20" },
  { hz: 417, name: "The Catalyst", description: "Facilitating change and clearing trauma", category: "solfeggio", color: "from-amber-500/20 to-yellow-500/20" },
  { hz: 432, name: "Nature's Pulse", description: "Harmonizing with the universe", category: "special", color: "from-green-500/20 to-emerald-500/20" },
  { hz: 444, name: "Inner Anchor", description: "Emotional protection and peace", category: "special", color: "from-teal-500/20 to-cyan-500/20" },
  { hz: 528, name: "DNA Echo", description: 'The "Miracle" tone for transformation', category: "solfeggio", color: "from-emerald-500/20 to-green-500/20" },
  { hz: 639, name: "Bridge Builder", description: "Improving social connections and love", category: "solfeggio", color: "from-pink-500/20 to-rose-500/20" },
  { hz: 741, name: "Pure Flow", description: "Mental detox and creative expression", category: "solfeggio", color: "from-blue-500/20 to-indigo-500/20" },
  { hz: 852, name: "Inner Vision", description: "Awakening intuition and spiritual light", category: "solfeggio", color: "from-indigo-500/20 to-violet-500/20" },
  { hz: 963, name: "Apex Mind", description: "Connecting to higher consciousness", category: "solfeggio", color: "from-violet-500/20 to-purple-500/20" },
  { hz: 111, name: "The Genesis", description: "Cell rejuvenation and new beginnings", category: "special", color: "from-yellow-500/20 to-lime-500/20" },
  { hz: 136.1, name: "Heart Resonance", description: 'The cosmic "OM" for centering', category: "special", color: "from-rose-500/20 to-pink-500/20" },
  { hz: 7.83, name: "Earth's Heartbeat", description: "Grounding via the Schumann Resonance", category: "brainwave", color: "from-emerald-600/20 to-teal-600/20" },
  { hz: 2, name: "Deep Slumber", description: "Delta wave for restorative sleep", category: "brainwave", color: "from-indigo-600/20 to-blue-800/20" },
  { hz: 6, name: "Dream State", description: "Theta wave for deep meditation", category: "brainwave", color: "from-purple-600/20 to-indigo-600/20" },
  { hz: 10, name: "The Calm Zone", description: "Alpha wave for relaxed focus", category: "brainwave", color: "from-cyan-500/20 to-blue-500/20" },
  { hz: 20, name: "The Sharp Edge", description: "Beta wave for intense concentration", category: "brainwave", color: "from-yellow-500/20 to-orange-500/20" },
  { hz: 40, name: "Cognitive Boost", description: "Gamma wave for memory and learning", category: "brainwave", color: "from-fuchsia-500/20 to-pink-500/20" },
  { hz: 126.22, name: "Vital Sun", description: "Boosting energy and self-confidence", category: "special", color: "from-amber-400/20 to-yellow-400/20" },
];
