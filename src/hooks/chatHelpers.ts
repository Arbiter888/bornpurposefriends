import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";

export const handleMessageStorage = async (
  message: Message,
  userId: string,
  characterName?: string,
  characterImage?: string
) => {
  const { error } = await supabase
    .from('messages')
    .insert({
      id: message.id,
      content: message.content,
      role: message.role,
      user_id: userId,
      character_name: characterName,
      character_image: characterImage,
      conversation_id: message.conversationId || crypto.randomUUID(),
    });

  if (error) {
    throw error;
  }
};