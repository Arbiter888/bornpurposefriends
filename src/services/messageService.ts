import { supabase } from "@/integrations/supabase/client";
import { Character } from "@/lib/characters";
import { Message } from "@/types/chat";

interface SupabaseMessage {
  id: string;
  conversation_id: string;
  content: string;
  role: string;
  user_id: string;
  character_name?: string;
  character_image?: string;
  created_at: string;
}

export const messageService = {
  async fetchMessages(conversationId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    
    // Transform the Supabase data into the Message type
    return (data as SupabaseMessage[]).map(msg => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
      timestamp: new Date(msg.created_at),
      characterName: msg.character_name,
      characterImage: msg.character_image,
    }));
  },

  async insertMessage(message: {
    id: string;
    conversationId: string;
    content: string;
    role: string;
    userId: string;
    characterName?: string;
    characterImage?: string;
  }) {
    const { error } = await supabase
      .from('messages')
      .insert({
        id: message.id,
        conversation_id: message.conversationId,
        content: message.content,
        role: message.role,
        user_id: message.userId,
        character_name: message.characterName,
        character_image: message.characterImage,
      });

    if (error) throw error;
  },

  async getAIResponse(message: string, character: Character, isGroupChat: boolean = false): Promise<string> {
    try {
      // Use the Supabase client's built-in functions.invoke method instead of raw fetch
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message,
          character,
          isGroupChat,
        },
      });

      if (error) {
        console.error('Error getting AI response:', error);
        throw new Error('Failed to get AI response');
      }

      return data.response;
    } catch (error) {
      console.error('Error getting AI response:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  },
};