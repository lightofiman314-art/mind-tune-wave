export type FrequencyCategory = "stop_overthinking" | "study_fast" | "stress_relief" | "control_emotions";

export interface FrequencyData {
  hz: number;
  name: string;
  description: string;
  longDescription: string;
  benefits: string[];
  category: FrequencyCategory;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

export const categoryLabels: Record<FrequencyCategory, string> = {
  stop_overthinking: "Stop Overthinking",
  study_fast: "Study Fast",
  stress_relief: "Stress Relief",
  control_emotions: "Control Emotions",
};

export const frequencies: FrequencyData[] = [
  // === STOP OVERTHINKING ===
  {
    hz: 396, name: "Fear Dissolve",
    description: "Releasing guilt and emotional blocks",
    longDescription: "This frequency liberates the energy of fear and guilt. It cleanses feelings of guilt and helps you achieve goals in the most direct way. It releases deep-seated negative beliefs and patterns that have been blocking you from achieving your life goals.",
    benefits: ["Fear release", "Guilt liberation", "Goal clarity", "Emotional freedom"],
    category: "stop_overthinking", color: "from-red-600/20 to-rose-500/20",
    gradientFrom: "#dc2626", gradientTo: "#f43f5e"
  },
  {
    hz: 852, name: "Inner Vision",
    description: "Awakening intuition and spiritual light",
    longDescription: "852 Hz raises awareness and helps return to spiritual order. It awakens intuition and inner strength. This frequency is linked to the third eye chakra and can be used to cleanse trapped negative energy. It helps see through illusions and discover the highest truth.",
    benefits: ["Third eye activation", "Spiritual awakening", "Inner strength", "Truth discovery"],
    category: "stop_overthinking", color: "from-indigo-500/20 to-violet-500/20",
    gradientFrom: "#6366f1", gradientTo: "#8b5cf6"
  },
  {
    hz: 963, name: "Apex Mind",
    description: "Connecting to higher consciousness",
    longDescription: "963 Hz awakens any system to its original, perfect state. It is connected with the Light and enables direct experience with Spirit. This frequency reconnects you with the Spirit, or the non-vibrational energies of the spiritual world, enabling a return to Oneness and unity.",
    benefits: ["Higher consciousness", "Spiritual connection", "Pineal activation", "Divine unity"],
    category: "stop_overthinking", color: "from-violet-500/20 to-purple-500/20",
    gradientFrom: "#8b5cf6", gradientTo: "#a855f7"
  },
  {
    hz: 741, name: "Pure Flow",
    description: "Mental detox and creative expression",
    longDescription: "741 Hz cleans the cell from toxins and electromagnetic radiation. It leads to a pure, stable, and healthier life. This frequency awakens intuition and promotes expression of self. It helps solve problems and express yourself fully, cleansing infections and dissolving toxins.",
    benefits: ["Toxin removal", "Creative expression", "Problem solving", "Intuition awakening"],
    category: "stop_overthinking", color: "from-blue-500/20 to-indigo-500/20",
    gradientFrom: "#3b82f6", gradientTo: "#6366f1"
  },
  {
    hz: 6, name: "Dream State",
    description: "Theta wave for deep meditation",
    longDescription: "6 Hz is in the theta brainwave range (4–8 Hz), the gateway to learning, memory, and intuition. Theta waves are present during deep meditation, light sleep, and REM dreaming. This state allows access to subconscious material, enhancing creativity and emotional processing.",
    benefits: ["Deep meditation", "Enhanced creativity", "Memory access", "Subconscious healing"],
    category: "stop_overthinking", color: "from-purple-600/20 to-indigo-600/20",
    gradientFrom: "#9333ea", gradientTo: "#4f46e5"
  },

  // === STUDY FAST ===
  {
    hz: 40, name: "Cognitive Boost",
    description: "Gamma wave for memory and learning",
    longDescription: "40 Hz is the primary gamma brainwave frequency (30–100 Hz), associated with higher mental activity, including perception, problem-solving, and consciousness. Research shows 40 Hz stimulation may help clear amyloid plaques associated with Alzheimer's. It enhances memory consolidation and learning.",
    benefits: ["Memory enhancement", "Learning boost", "Peak awareness", "Neuroplasticity"],
    category: "study_fast", color: "from-fuchsia-500/20 to-pink-500/20",
    gradientFrom: "#d946ef", gradientTo: "#ec4899"
  },
  {
    hz: 20, name: "The Sharp Edge",
    description: "Beta wave for intense concentration",
    longDescription: "20 Hz is in the beta brainwave range (12–30 Hz), associated with normal waking consciousness, active thinking, and concentration. Beta waves dominate when we're alert, attentive, and engaged in problem-solving. This frequency sharpens focus and enhances cognitive performance.",
    benefits: ["Intense focus", "Mental alertness", "Problem solving", "Cognitive enhancement"],
    category: "study_fast", color: "from-yellow-500/20 to-orange-500/20",
    gradientFrom: "#eab308", gradientTo: "#f97316"
  },
  {
    hz: 10, name: "The Calm Zone",
    description: "Alpha wave for relaxed focus",
    longDescription: "10 Hz sits at the center of the alpha brainwave range (8–12 Hz), representing a state of wakeful relaxation. Alpha waves bridge the conscious and subconscious mind, promoting calmness without drowsiness. This is the ideal state for stress reduction, relaxation, and positive thinking.",
    benefits: ["Relaxed focus", "Stress reduction", "Mind-body bridge", "Positive thinking"],
    category: "study_fast", color: "from-cyan-500/20 to-blue-500/20",
    gradientFrom: "#06b6d4", gradientTo: "#3b82f6"
  },
  {
    hz: 528, name: "DNA Echo",
    description: 'The "Miracle" tone for transformation',
    longDescription: "Known as the 'Love Frequency' or 'Miracle Tone,' 528 Hz is central to the Solfeggio scale. Research suggests it may help repair DNA. It brings transformation, miracles, and an increased amount of life energy, clarity of mind, awareness, and deep inner peace. It activates imagination and intention.",
    benefits: ["DNA repair", "Transformation", "Love activation", "Miracle manifestation"],
    category: "study_fast", color: "from-emerald-500/20 to-green-500/20",
    gradientFrom: "#10b981", gradientTo: "#22c55e"
  },
  {
    hz: 126.22, name: "Vital Sun",
    description: "Boosting energy and self-confidence",
    longDescription: "126.22 Hz corresponds to the frequency of the Sun in the cosmic octave scale. It radiates warmth, energy, joy, and vitality. This frequency promotes self-confidence, willpower, and a strong sense of self. It stimulates the solar plexus chakra — the center of personal power and identity.",
    benefits: ["Energy boost", "Self-confidence", "Willpower", "Solar plexus activation"],
    category: "study_fast", color: "from-amber-400/20 to-yellow-400/20",
    gradientFrom: "#fbbf24", gradientTo: "#facc15"
  },

  // === STRESS RELIEF ===
  {
    hz: 174, name: "The Grounder",
    description: "Pain relief and physical security",
    longDescription: "The 174 Hz frequency is the lowest of the Solfeggio scale and acts as a natural anesthetic. It reduces pain physically and energetically, giving organs a sense of security, safety, and love. It encourages cells to do their best and helps release tension stored in the body.",
    benefits: ["Pain reduction", "Stress relief", "Physical relaxation", "Sense of security"],
    category: "stress_relief", color: "from-red-500/20 to-orange-500/20",
    gradientFrom: "#ef4444", gradientTo: "#f97316"
  },
  {
    hz: 285, name: "The Restorer",
    description: "Tissue and energetic rejuvenation",
    longDescription: "285 Hz influences energy fields, sending a message to restructure damaged organs. It helps tissue return to its original form by influencing the etheric body. This frequency is connected to the blueprint of the body and helps heal wounds, cuts, and other tissue damage.",
    benefits: ["Tissue healing", "Energy restoration", "Cellular repair", "Immune boost"],
    category: "stress_relief", color: "from-orange-500/20 to-amber-500/20",
    gradientFrom: "#f97316", gradientTo: "#f59e0b"
  },
  {
    hz: 432, name: "Nature's Pulse",
    description: "Harmonizing with the universe",
    longDescription: "432 Hz is known as the natural frequency of the universe. It resonates with the Schumann Resonance of the Earth and is mathematically consistent with patterns of the cosmos. Listening promotes mental clarity, unlocks intuition, and creates a profound sense of peace and wellbeing.",
    benefits: ["Universal harmony", "Mental clarity", "Deep relaxation", "Natural alignment"],
    category: "stress_relief", color: "from-green-500/20 to-emerald-500/20",
    gradientFrom: "#22c55e", gradientTo: "#10b981"
  },
  {
    hz: 7.83, name: "Earth's Heartbeat",
    description: "Grounding via the Schumann Resonance",
    longDescription: "7.83 Hz is the fundamental Schumann Resonance — the electromagnetic heartbeat of our planet. This frequency exists in the cavity between Earth's surface and the ionosphere. Exposure can improve stress tolerance, promote anti-jetlag recovery, and create a sense of deep grounding and connection to nature.",
    benefits: ["Earth grounding", "Stress reduction", "Natural rhythm sync", "Deep calm"],
    category: "stress_relief", color: "from-emerald-600/20 to-teal-600/20",
    gradientFrom: "#059669", gradientTo: "#0d9488"
  },
  {
    hz: 2, name: "Deep Slumber",
    description: "Delta wave for restorative sleep",
    longDescription: "2 Hz falls in the delta brainwave range (0.5–4 Hz), associated with the deepest levels of relaxation and restorative sleep. Delta waves are dominant during dreamless sleep and are essential for healing, immune function, and physical restoration. This frequency promotes the most rejuvenating form of rest.",
    benefits: ["Deep sleep", "Physical healing", "Immune boost", "Complete restoration"],
    category: "stress_relief", color: "from-indigo-600/20 to-blue-800/20",
    gradientFrom: "#4f46e5", gradientTo: "#1e40af"
  },

  // === CONTROL EMOTIONS ===
  {
    hz: 417, name: "The Catalyst",
    description: "Facilitating change and clearing trauma",
    longDescription: "417 Hz marks the start of new beginnings. It produces energy to bring about change and cleanses traumatic experiences. This frequency puts you in touch with an inexhaustible source of energy that allows you to change your life and remove destructive influences of past events.",
    benefits: ["Trauma clearing", "Change facilitation", "Energy renewal", "Pattern breaking"],
    category: "control_emotions", color: "from-amber-500/20 to-yellow-500/20",
    gradientFrom: "#f59e0b", gradientTo: "#eab308"
  },
  {
    hz: 444, name: "Inner Anchor",
    description: "Emotional protection and peace",
    longDescription: "444 Hz creates a shield of emotional stability and inner peace. This frequency helps establish a strong emotional foundation, protecting against external negativity while fostering a calm, centered state. It resonates with the heart and promotes feelings of safety and self-assurance.",
    benefits: ["Emotional stability", "Inner peace", "Protection", "Heart centering"],
    category: "control_emotions", color: "from-teal-500/20 to-cyan-500/20",
    gradientFrom: "#14b8a6", gradientTo: "#06b6d4"
  },
  {
    hz: 639, name: "Bridge Builder",
    description: "Improving social connections and love",
    longDescription: "639 Hz enables creation of harmonious interpersonal relationships. It enhances communication, understanding, tolerance, and love. It can be used to deal with relationship problems — in family, between partners, or with friends. It encourages cells to communicate with their environment.",
    benefits: ["Better relationships", "Enhanced communication", "Love attraction", "Social harmony"],
    category: "control_emotions", color: "from-pink-500/20 to-rose-500/20",
    gradientFrom: "#ec4899", gradientTo: "#f43f5e"
  },
  {
    hz: 136.1, name: "Heart Resonance",
    description: 'The cosmic "OM" for centering',
    longDescription: "136.1 Hz is the frequency of the cosmic OM — the sound of the universe according to Vedic tradition. It corresponds to the Earth's year and creates a calming, meditative effect. Often used in sound healing with Tibetan singing bowls, it promotes deep centering and heart-chakra alignment.",
    benefits: ["Heart centering", "OM resonance", "Meditation deepening", "Cosmic alignment"],
    category: "control_emotions", color: "from-rose-500/20 to-pink-500/20",
    gradientFrom: "#f43f5e", gradientTo: "#ec4899"
  },
  {
    hz: 111, name: "The Genesis",
    description: "Cell rejuvenation and new beginnings",
    longDescription: "111 Hz is associated with cell regeneration and the production of endorphins. Studies have shown it can stimulate beta-endorphin production, providing natural pain relief. Ancient temples were designed to resonate at this frequency, creating powerful healing spaces.",
    benefits: ["Cell regeneration", "Endorphin release", "New beginnings", "Natural healing"],
    category: "control_emotions", color: "from-yellow-500/20 to-lime-500/20",
    gradientFrom: "#eab308", gradientTo: "#84cc16"
  },
];
