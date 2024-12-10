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
    if (!user?.id || !characterId) {
      console.log('Missing user or character ID:', { userId: user?.id, characterId });
      return;
    }
    
    const loadMessages = async () => {
      try {
        console.log('Loading messages for conversation:', conversationUUID);
        const messages = await messageService.fetchMessages(conversationUUID);
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Error fetching messages",
          description: "Failed to load chat messages. Please try again.",
          variant: "destructive",
        });
      }
    };

    loadMessages();
  }, [user?.id, characterId, toast, conversationUUID]);

  const handleSendMessage = async (character: Character | Character[]) => {
    if (!newMessage.trim() || !user?.id || isLoading) {
      console.log('Invalid send message attempt:', { 
        hasMessage: Boolean(newMessage.trim()), 
        hasUser: Boolean(user?.id), 
        isLoading 
      });
      return;
    }

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
          await handleAIResponse(char, user.id);
        }
      } else if (!Array.isArray(character)) {
        await handleAIResponse(character, user.id);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIResponse = async (character: Character, userId: string) => {
    try {
      const response = await messageService.getAIResponse(newMessage, character, isGroupChat);
      
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
        userId: userId,
        characterName: character.name,
        characterImage: character.image,
      });

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error handling AI response:', error);
      throw error;
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