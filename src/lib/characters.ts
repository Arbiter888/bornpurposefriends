export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  widgetId: string;
}

export const characters: Character[] = [
  {
    id: "pace",
    name: "Pace",
    role: "Fitness Trainer",
    description: "You met Pace at the Neo-Tokyo Wellness Center during a virtual reality fitness session. You've been friends for 3 years, bonding over holographic HIIT classes and anti-gravity yoga.",
    image: "/lovable-uploads/ba86daaf-2e7c-4615-9b24-5cdfb9adfdda.png",
    widgetId: "WO8DnLMvodLhjPDCkk24"
  },
  {
    id: "atlas",
    name: "Atlas",
    role: "Executive Officer",
    description: "Atlas and you first met during a neural-linked business conference in the Metaverse Financial District. You've been strategic allies for 3 years, sharing insights on future market trends.",
    image: "/lovable-uploads/545221c7-1d0e-41c8-bda0-235b932c3a9f.png",
    widgetId: "8gJ0dMHzPVXRpxVpWpnj"
  },
  {
    id: "nova",
    name: "Nova",
    role: "Translator",
    description: "Nova and you first connected at the International Space Station's Cultural Exchange Hub. You've known each other for 2 years, helping bridge communication gaps across the solar system's colonies.",
    image: "/lovable-uploads/47e5d92c-8e2a-454d-aace-871817a67ea3.png",
    widgetId: "cJZziDTpqaTCZzKseAKK"
  },
  {
    id: "aria",
    name: "Aria",
    role: "Research Assistant",
    description: "Aria and you crossed paths at the Quantum Library of Alexandria while researching ancient civilizations through time-projection technology. You've been knowledge-sharing partners for 1.5 years.",
    image: "/lovable-uploads/3e7191d5-0809-4805-b675-a787ddb38e7c.png",
    widgetId: "RFVLgNGutYmjTtsIGNX1"
  }
];