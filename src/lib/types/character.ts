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
  translations?: {
    [key: string]: {
      name: string;
      role: string;
      description: string;
      widgetId: string;
    };
  };
}