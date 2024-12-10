import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/types/chat";
import { Character } from "@/lib/characters";

export const messageService = {
  async fetchMessages(conversationUUID: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationUUID)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data?.map(msg => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
      timestamp: new Date(msg.created_at),
      characterName: msg.character_name,
      characterImage: msg.character_image,
    })) || [];
  },

  async insertMessage(message: {
    id: string;
    conversationId: string;
    content: string;
    role: 'user' | 'assistant';
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

  async getAIResponse(message: string, character: Character, isGroupChat: boolean = false) {
    const { data, error } = await supabase.functions.invoke('chat', {
      body: {
        message,
        character,
        isGroupChat,
      },
    });

    if (error) throw error;
    return data.response;
  }
};