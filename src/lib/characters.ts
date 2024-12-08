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
    image: "/lovable-uploads/3ed1979a-c47e-4d48-b773-ead55dd2ed84.png",
    widgetId: "6uUzWns28me6nq7WB2Ch"
  },
  {
    id: "echo",
    name: "Echo",
    role: "Health Coach",
    description: "You met Echo at the Mars Colony Wellness Symposium while researching personalized nutrition algorithms. You've been friends for 4 years, regularly consulting on holistic health optimization.",
    image: "/lovable-uploads/761f3623-3775-4357-be2c-383985df2544.png",
    widgetId: "2TrHp4U7CtvKYhNlPx6U"
  }
];