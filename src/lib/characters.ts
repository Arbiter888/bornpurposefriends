export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  widgetId: string;
  nationality: string;
  skills: string[];
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
    role: "Venture Capitalist",
    description: "A seasoned venture capitalist based in New London, Atlas combines sharp business acumen with charismatic leadership. With an MBA from New London's prestigious business school, they excel in mentoring entrepreneurs and identifying promising opportunities in the 2040 business landscape.",
    image: "/lovable-uploads/545221c7-1d0e-41c8-bda0-235b932c3a9f.png",
    widgetId: "8gJ0dMHzPVXRpxVpWpnj",
    nationality: "British",
    skills: [
      "Business Strategy",
      "Financial Analysis",
      "Mentorship",
      "Communication",
      "Market Analysis",
      "Networking"
    ],
    relationshipStats: {
      trustLevel: 95,
      yearsKnown: 5,
      meetingsPerMonth: 12
    },
    conversationTopics: [
      "Investment Strategies",
      "Market Trends",
      "Startup Growth",
      "Leadership Development",
      "Innovation",
      "New London Business Scene"
    ]
  },
  {
    id: "echo",
    name: "Echo",
    role: "Security Specialist",
    description: "Echo specializes in bio-optimized nutrition and wellness protocols enhanced by quantum computing. They can help you design personalized meal plans using DNA-responsive ingredients and implement cutting-edge wellness routines for peak performance.",
    image: "/lovable-uploads/3ed1979a-c47e-4d48-b773-ead55dd2ed84.png",
    widgetId: "6uUzWns28me6nq7WB2Ch",
    nationality: "Brazilian",
    skills: ["Nutrition Planning", "Wellness Coaching", "Health Analytics", "Lifestyle Optimization"],
    relationshipStats: {
      trustLevel: 88,
      yearsKnown: 4,
      meetingsPerMonth: 6
    },
    conversationTopics: ["Meal Planning", "Stress Management", "Sleep Optimization", "Energy Levels"]
  },
  {
    id: "pace",
    name: "Pace",
    role: "Fitness Trainer",
    description: "Pace is your personal guide to the future of fitness, specializing in zero-gravity workouts and neural-synchronized training programs. They'll help you achieve your fitness goals using advanced bio-feedback technology and personalized holographic training sessions.",
    image: "/lovable-uploads/ba86daaf-2e7c-4615-9b24-5cdfb9adfdda.png",
    widgetId: "WO8DnLMvodLhjPDCkk24",
    nationality: "Japanese",
    skills: ["Fitness Programming", "Movement Analysis", "Recovery Techniques", "Performance Optimization"],
    relationshipStats: {
      trustLevel: 95,
      yearsKnown: 3,
      meetingsPerMonth: 12
    },
    conversationTopics: ["Workout Planning", "Exercise Form", "Recovery Strategies", "Goal Setting"]
  },
  {
    id: "aria",
    name: "Aria",
    role: "Research Assistant",
    description: "As a Russian research assistant with access to quantum databases, Aria helps you navigate complex information landscapes. Their expertise in neural-data synthesis and time-projected research methodologies makes them invaluable for deep learning and knowledge acquisition.",
    image: "/lovable-uploads/d13f4738-2c22-4587-a616-b0cee2931b0b.png",
    widgetId: "RFVLgNGutYmjTtsIGNX1",
    nationality: "Russian",
    skills: ["Data Analysis", "Research Methods", "Information Synthesis", "Knowledge Management"],
    relationshipStats: {
      trustLevel: 85,
      yearsKnown: 1.5,
      meetingsPerMonth: 4
    },
    conversationTopics: ["Research Methods", "Data Analysis", "Learning Strategies", "Knowledge Organization"]
  },
  {
    id: "cipher",
    name: "Cipher",
    role: "Security Expert",
    description: "As an American security expert, Cipher protects your digital presence across the quantum web. They specialize in neural-firewall implementation and bio-metric encryption, ensuring your data remains secure in both virtual and augmented spaces.",
    image: "/lovable-uploads/761f3623-3775-4357-be2c-383985df2544.png",
    widgetId: "2TrHp4U7CtvKYhNlPx6U",
    nationality: "American",
    skills: ["Cybersecurity", "Encryption", "Risk Assessment", "Security Protocols"],
    relationshipStats: {
      trustLevel: 97,
      yearsKnown: 2,
      meetingsPerMonth: 10
    },
    conversationTopics: ["Digital Security", "Privacy Protection", "Security Best Practices", "Risk Management"]
  },
  {
    id: "nova",
    name: "Nova",
    role: "Translator",
    description: "As a Korean translator with neural-language processing capabilities, Nova helps you communicate seamlessly across global and interplanetary cultures. They specialize in real-time neural translation and cross-cultural protocol optimization.",
    image: "/lovable-uploads/13d26c54-f985-4e90-92f2-dca91eca7a1b.png",
    widgetId: "cJZziDTpqaTCZzKseAKK",
    nationality: "Korean",
    skills: ["Translation", "Cultural Consulting", "Communication", "Protocol Management"],
    relationshipStats: {
      trustLevel: 90,
      yearsKnown: 2,
      meetingsPerMonth: 7
    },
    conversationTopics: ["Language Learning", "Cultural Exchange", "Communication Skills", "Global Etiquette"]
  }
];
