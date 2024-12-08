export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  widgetId: string;
  relationshipStats: {
    trustLevel: number;
    yearsKnown: number;
    meetingsPerMonth: number;
  };
  conversationTopics: string[];
}

export const characters: Character[] = [
  {
    id: "atlas",
    name: "Atlas",
    role: "Executive Officer",
    description: "Atlas and you first met during a neural-linked business conference in the Metaverse Financial District. You've been strategic allies for 3 years, sharing insights on future market trends.",
    image: "/lovable-uploads/545221c7-1d0e-41c8-bda0-235b932c3a9f.png",
    widgetId: "8gJ0dMHzPVXRpxVpWpnj",
    relationshipStats: {
      trustLevel: 92,
      yearsKnown: 3,
      meetingsPerMonth: 8
    },
    conversationTopics: ["Market predictions", "AI integration strategies", "Virtual team management"]
  },
  {
    id: "cipher",
    name: "Cipher",
    role: "Security Specialist",
    description: "You met Cipher at the Mars Colony Wellness Symposium while researching personalized nutrition algorithms. You've been friends for 4 years, regularly consulting on holistic health optimization.",
    image: "/lovable-uploads/3ed1979a-c47e-4d48-b773-ead55dd2ed84.png",
    widgetId: "6uUzWns28me6nq7WB2Ch",
    relationshipStats: {
      trustLevel: 88,
      yearsKnown: 4,
      meetingsPerMonth: 6
    },
    conversationTopics: ["Wellness protocols", "Nutrition science", "Health optimization"]
  },
  {
    id: "pace",
    name: "Pace",
    role: "Fitness Trainer",
    description: "You met Pace at the Neo-Tokyo Wellness Center during a virtual reality fitness session. You've been friends for 3 years, bonding over holographic HIIT classes and anti-gravity yoga.",
    image: "/lovable-uploads/ba86daaf-2e7c-4615-9b24-5cdfb9adfdda.png",
    widgetId: "WO8DnLMvodLhjPDCkk24",
    relationshipStats: {
      trustLevel: 95,
      yearsKnown: 3,
      meetingsPerMonth: 12
    },
    conversationTopics: ["VR fitness innovations", "Anti-gravity training", "Mindfulness techniques"]
  },
  {
    id: "aria",
    name: "Aria",
    role: "Research Assistant",
    description: "Aria and you crossed paths at the Quantum Library of Alexandria while researching ancient civilizations through time-projection technology. You've been knowledge-sharing partners for 1.5 years.",
    image: "/lovable-uploads/d13f4738-2c22-4587-a616-b0cee2931b0b.png",
    widgetId: "RFVLgNGutYmjTtsIGNX1",
    relationshipStats: {
      trustLevel: 85,
      yearsKnown: 1.5,
      meetingsPerMonth: 4
    },
    conversationTopics: ["Time-projection findings", "Ancient civilizations", "Quantum archaeology"]
  },
  {
    id: "sentinel",
    name: "Sentinel",
    role: "Security Expert",
    description: "Sentinel became your trusted ally during a cybersecurity crisis in the Digital Defense Grid. For the past 2 years, they've been your go-to expert for digital security and encryption protocols.",
    image: "/lovable-uploads/761f3623-3775-4357-be2c-383985df2544.png",
    widgetId: "2TrHp4U7CtvKYhNlPx6U",
    relationshipStats: {
      trustLevel: 97,
      yearsKnown: 2,
      meetingsPerMonth: 10
    },
    conversationTopics: ["Cybersecurity updates", "Encryption protocols", "Digital defense strategies"]
  },
  {
    id: "nova",
    name: "Nova",
    role: "Translator",
    description: "Nova and you first connected at the International Space Station's Cultural Exchange Hub. You've known each other for 2 years, helping bridge communication gaps across the solar system's colonies.",
    image: "/lovable-uploads/13d26c54-f985-4e90-92f2-dca91eca7a1b.png",
    widgetId: "cJZziDTpqaTCZzKseAKK",
    relationshipStats: {
      trustLevel: 90,
      yearsKnown: 2,
      meetingsPerMonth: 7
    },
    conversationTopics: ["Interplanetary cultures", "Translation algorithms", "Colony communications"]
  }
];