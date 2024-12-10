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
    console.log('Fetching messages for conversation:', conversationId);
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase error fetching messages:', error);
        throw error;
      }

      if (!data) {
        console.log('No messages found for conversation:', conversationId);
        return [];
      }

      console.log('Successfully fetched messages:', data.length);
      
      return (data as SupabaseMessage[]).map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        timestamp: new Date(msg.created_at),
        characterName: msg.character_name,
        characterImage: msg.character_image,
      }));
    } catch (error) {
      console.error('Error in fetchMessages:', error);
      throw error;
    }
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
    console.log('Inserting message:', message);
    
    try {
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

      if (error) {
        console.error('Supabase error inserting message:', error);
        throw error;
      }

      console.log('Message inserted successfully');
    } catch (error) {
      console.error('Error in insertMessage:', error);
      throw error;
    }
  },

  async getAIResponse(message: string, character: Character, isGroupChat: boolean = false): Promise<string> {
    console.log('Getting AI response for message:', message);
    
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message,
          character,
          isGroupChat,
        },
      });

      if (error) {
        console.error('Error getting AI response:', error);
        throw error;
      }

      console.log('AI response received successfully');
      return data.response;
    } catch (error) {
      console.error('Error in getAIResponse:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  },
};