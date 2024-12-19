export interface Character {
  id: string;
  name: string;
  title: string;
  role: string;
  description: string;
  image: string;
  profileImage: string;
  widgetId: string;
  nationality: string;
  skills: string[];
  relationshipStats: {
    trustLevel: number;
    yearsKnown: number;
    meetingsPerMonth: number;
  };
  conversationTopics: string[];
  quickCall?: {
    title: string;
    description: string;
  };
  gallery?: {
    videos?: string[];
    images?: string[];
  };
}