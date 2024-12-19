export interface Character {
  id: string;
  name: string;
  title: string;
  image: string; // Chat avatar image
  profileImage: string; // Profile/card image
  description: string;
  topics: string[];
  skills: string[];
  quickCall?: {
    title: string;
    description: string;
  };
  gallery?: {
    videos?: string[];
    images?: string[];
  };
}