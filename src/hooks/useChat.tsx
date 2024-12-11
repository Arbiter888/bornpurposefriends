import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/auth-helpers-react";
import { Character } from "@/lib/characters";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useChat = (user: User | null, characterId: string | undefined, isGroupChat: boolean = false) => {
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch or create conversation
  const { data: conversation } = useQuery({
    queryKey: ['conversation', user?.id, characterId],
    queryFn: async () => {
      if (!user?.id || !characterId) return null;
      
      // Try to find existing conversation
      let { data: existingConversation } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .eq('character_id', characterId)
        .single();

      if (!existingConversation) {
        // Create new conversation if none exists
        const { data: newConversation } = await supabase
          .from('conversations')
          .insert({
            user_id: user.id,
            character_id: characterId,
          })
          .select()
          .single();
        
        existingConversation = newConversation;
      }

      return existingConversation;
    },
    enabled: !!user?.id && !!characterId,
  });

  // Fetch messages for current conversation
  const { data: messages = [] } = useQuery({
    queryKey: ['messages', conversation?.id],
    queryFn: async () => {
      if (!conversation?.id) return [];

      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true });

      return data?.map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        characterName: msg.character_name,
        characterImage: msg.character_image,
        timestamp: new Date(msg.created_at),
      })) || [];
    },
    enabled: !!conversation?.id,
  });

  // Mutation for sending messages
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: {
      content: string;
      character: Character | Character[];
    }) => {
      if (!user?.id || !conversation?.id) throw new Error('Not authenticated');

      const userMessage = {
        conversation_id: conversation.id,
        user_id: user.id,
        role: 'user',
        content: messageData.content,
      };

      await supabase.from('messages').insert(userMessage);

      // Handle AI response(s)
      if (Array.isArray(messageData.character)) {
        for (const char of messageData.character) {
          const { data } = await supabase.functions.invoke('chat', {
            body: {
              message: messageData.content,
              character: char,
              isGroupChat: true,
            },
          });

          await supabase.from('messages').insert({
            conversation_id: conversation.id,
            user_id: user.id,
            role: 'assistant',
            content: data.response,
            character_name: char.name,
            character_image: char.image,
          });
        }
      } else {
        const { data } = await supabase.functions.invoke('chat', {
          body: {
            message: messageData.content,
            character: messageData.character,
          },
        });

        await supabase.from('messages').insert({
          conversation_id: conversation.id,
          user_id: user.id,
          role: 'assistant',
          content: data.response,
          character_name: messageData.character.name,
          character_image: messageData.character.image,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversation?.id] });
      setNewMessage("");
      setIsLoading(false);
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const handleSendMessage = async (character: Character | Character[]) => {
    if (!newMessage.trim()) return;
    setIsLoading(true);
    sendMessageMutation.mutate({ content: newMessage, character });
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    isLoading,
    handleSendMessage,
  };
};