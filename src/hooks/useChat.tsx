import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { User } from "@supabase/auth-helpers-react";
import { Character } from "@/lib/characters";
import { useToast } from "@/components/ui/use-toast";
import { messageService } from "@/services/messageService";
import { UseChatResult } from "@/types/chat-types";

export const useChat = (
  user: User | null, 
  characterId: string | undefined, 
  isGroupChat: boolean = false
): UseChatResult => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const conversationUUID = crypto.randomUUID();

  useEffect(() => {
    if (!user?.id || !characterId) return;
    
    const loadMessages = async () => {
      try {
        const messages = await messageService.fetchMessages(conversationUUID);
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Error fetching messages",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    loadMessages();
  }, [user?.id, characterId, toast, conversationUUID]);

  const handleSendMessage = async (character: Character | Character[]) => {
    if (!newMessage.trim() || !user?.id || isLoading) return;

    setIsLoading(true);
    const messageId = crypto.randomUUID();

    try {
      // Add user message
      const userMessage: Message = {
        id: messageId,
        role: 'user',
        content: newMessage,
        timestamp: new Date(),
      };

      await messageService.insertMessage({
        id: messageId,
        conversationId: conversationUUID,
        content: newMessage,
        role: 'user',
        userId: user.id,
      });

      setMessages(prev => [...prev, userMessage]);
      setNewMessage("");

      // Handle AI responses
      if (isGroupChat && Array.isArray(character)) {
        for (const char of character) {
          const response = await messageService.getAIResponse(newMessage, char, true);
          
          const aiMessageId = crypto.randomUUID();
          const aiMessage: Message = {
            id: aiMessageId,
            role: 'assistant',
            content: response,
            timestamp: new Date(),
            characterName: char.name,
            characterImage: char.image,
          };

          await messageService.insertMessage({
            id: aiMessageId,
            conversationId: conversationUUID,
            content: response,
            role: 'assistant',
            userId: user.id,
            characterName: char.name,
            characterImage: char.image,
          });

          setMessages(prev => [...prev, aiMessage]);
        }
      } else if (!Array.isArray(character)) {
        const response = await messageService.getAIResponse(newMessage, character);
        
        const aiMessageId = crypto.randomUUID();
        const aiMessage: Message = {
          id: aiMessageId,
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          characterName: character.name,
          characterImage: character.image,
        };

        await messageService.insertMessage({
          id: aiMessageId,
          conversationId: conversationUUID,
          content: response,
          role: 'assistant',
          userId: user.id,
          characterName: character.name,
          characterImage: character.image,
        });

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
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