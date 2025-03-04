import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/auth-helpers-react";
import { Character } from "@/lib/characters";
import { handleMessageStorage } from "./chatHelpers";
import { searchKnowledgeBase } from "./knowledgeBaseHelpers";

export const useChat = (user: User | null, characterId: string | undefined, isGroupChat: boolean = false) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [conversationId] = useState(() => crypto.randomUUID());

  useEffect(() => {
    if (!user?.id || !characterId) return;
    
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .eq('conversation_id', conversationId)
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
          conversationId: msg.conversation_id,
        })));
      }
    };

    fetchMessages();
  }, [user?.id, characterId, conversationId, toast]);

  const handleSendMessage = async (character: Character | Character[]) => {
    if (!newMessage.trim() || !user?.id) return;

    setIsLoading(true);
    const messageId = crypto.randomUUID();
    
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content: newMessage,
      timestamp: new Date(),
      conversationId,
    };

    try {
      // Store user message
      await handleMessageStorage(userMessage, user.id);
      setMessages(prev => [...prev, userMessage]);
      setNewMessage("");

      // Get knowledge base content
      const knowledgeBaseContent = await searchKnowledgeBase(newMessage);

      if (isGroupChat && Array.isArray(character)) {
        // Handle group debate responses
        const previousResponses = messages.filter(msg => msg.role === 'assistant' && msg.content.trim() !== '');
        
        for (const char of character) {
          console.log('Processing character in group debate:', char.name);
          
          const { data, error } = await supabase.functions.invoke('chat', {
            body: {
              message: newMessage,
              character: char,
              isGroupChat: true,
              knowledgeBaseContent,
              conversationId,
              previousResponses,
            },
          });

          if (error) {
            console.error('Error in group debate for character:', char.name, error);
            throw error;
          }

          const aiMessageId = crypto.randomUUID();
          const aiMessage: Message = {
            id: aiMessageId,
            role: 'assistant',
            content: data.response,
            timestamp: new Date(),
            characterName: char.name,
            characterImage: char.image,
            conversationId,
          };

          await handleMessageStorage(aiMessage, user.id, char.name, char.image);
          setMessages(prev => [...prev, aiMessage]);
        }
      } else if (!Array.isArray(character)) {
        // Handle single character chat
        console.log('Processing single character chat:', character.name);
        
        const { data, error } = await supabase.functions.invoke('chat', {
          body: {
            message: newMessage,
            character,
            isGroupChat: false,
            knowledgeBaseContent,
            conversationId,
          },
        });

        if (error) {
          console.error('Error in single chat:', error);
          throw error;
        }

        const aiMessageId = crypto.randomUUID();
        const aiMessage: Message = {
          id: aiMessageId,
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          characterName: character.name,
          characterImage: character.image,
          conversationId,
        };

        await handleMessageStorage(aiMessage, user.id, character.name, character.image);
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error: any) {
      console.error('Chat error:', error);
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