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
    id: "echo",
    name: "Echo",
    role: "Health Coach",
    description: "You met Echo at the Mars Colony Wellness Symposium while researching personalized nutrition algorithms. You've been friends for 4 years, regularly consulting on holistic health optimization.",
    image: "/lovable-uploads/761f3623-3775-4357-be2c-383985df2544.png",
    widgetId: "2TrHp4U7CtvKYhNlPx6U"
  },
  {
    id: "cipher",
    name: "Cipher",
    role: "Security Specialist",
    description: "Cipher became your trusted ally during a cybersecurity crisis in the Digital Defense Grid. For the past 2 years, they've been your go-to expert for digital security and encryption protocols.",
    image: "/lovable-uploads/3ed1979a-c47e-4d48-b773-ead55dd2ed84.png",
    widgetId: "6uUzWns28me6nq7WB2Ch"
  },
  {
    id: "nova",
    name: "Nova",
    role: "Translator",
    description: "Nova and you first connected at the International Space Station's Cultural Exchange Hub. You've known each other for 2 years, helping bridge communication gaps across the solar system's colonies.",
    image: "/lovable-uploads/c5dfc262-4e33-44a9-9ded-4ede0b241e17.png",
    widgetId: "cJZziDTpqaTCZzKseAKK"
  },
  {
    id: "aria",
    name: "Aria",
    role: "Research Assistant",
    description: "Aria and you crossed paths at the Quantum Library of Alexandria while researching ancient civilizations through time-projection technology. You've been knowledge-sharing partners for 1.5 years.",
    image: "/lovable-uploads/d13f4738-2c22-4587-a616-b0cee2931b0b.png",
    widgetId: "RFVLgNGutYmjTtsIGNX1"
  }
];