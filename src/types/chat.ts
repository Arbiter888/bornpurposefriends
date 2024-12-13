export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  characterName?: string;
  characterImage?: string;
  conversationId?: string;
}