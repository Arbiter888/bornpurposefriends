import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/auth-helpers-react";
import { Character } from "@/lib/characters";

export const useChat = (user: User | null, characterId: string | undefined, isGroupChat: boolean = false) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!user?.id || !characterId) return;
    
    const fetchMessages = async () => {
      const conversationUUID = crypto.randomUUID();
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationUUID)
        .order('created_at', { ascending: true });

      if (error) {
        toast({
          title: "Error fetching messages",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setMessages(data.map(msg => ({
          id: msg.id,
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: new Date(msg.created_at),
          characterName: msg.character_name,
          characterImage: msg.character_image,
        })));
      }
    };

    fetchMessages();
  }, [user?.id, characterId, toast]);

  const handleSendMessage = async (character: Character | Character[]) => {
    if (!newMessage.trim() || !user?.id) return;

    setIsLoading(true);
    const messageId = crypto.randomUUID();
    const conversationUUID = crypto.randomUUID();
    
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content: newMessage,
      timestamp: new Date(),
    };

    try {
      const { error: insertError } = await supabase
        .from('messages')
        .insert({
          id: messageId,
          conversation_id: conversationUUID,
          content: newMessage,
          role: 'user',
          user_id: user.id,
        });

      if (insertError) throw insertError;

      setMessages(prev => [...prev, userMessage]);
      setNewMessage("");

      if (isGroupChat && Array.isArray(character)) {
        // Handle group chat responses
        for (const char of character) {
          const { data, error } = await supabase.functions.invoke('chat', {
            body: {
              message: newMessage,
              character: char,
              isGroupChat: true,
            },
          });

          if (error) throw error;

          const aiMessageId = crypto.randomUUID();
          const aiMessage: Message = {
            id: aiMessageId,
            role: 'assistant',
            content: data.response,
            timestamp: new Date(),
            characterName: char.name,
            characterImage: char.image,
          };

          const { error: aiInsertError } = await supabase
            .from('messages')
            .insert({
              id: aiMessageId,
              conversation_id: conversationUUID,
              content: data.response,
              role: 'assistant',
              user_id: user.id,
              character_name: char.name,
              character_image: char.image,
            });

          if (aiInsertError) throw aiInsertError;

          setMessages(prev => [...prev, aiMessage]);
        }
      } else {
        // Handle single character chat
        const { data, error } = await supabase.functions.invoke('chat', {
          body: {
            message: newMessage,
            character,
          },
        });

        if (error) throw error;

        const aiMessageId = crypto.randomUUID();
        const aiMessage: Message = {
          id: aiMessageId,
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          characterName: character.name,
          characterImage: character.image,
        };

        const { error: aiInsertError } = await supabase
          .from('messages')
          .insert({
            id: aiMessageId,
            conversation_id: conversationUUID,
            content: data.response,
            role: 'assistant',
            user_id: user.id,
            character_name: character.name,
            character_image: character.image,
          });

        if (aiInsertError) throw aiInsertError;

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    isLoading,
    handleSendMessage,
  };
};