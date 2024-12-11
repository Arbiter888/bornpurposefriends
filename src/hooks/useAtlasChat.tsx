import { useState } from "react";
import { getAtlasResponse } from "@/services/atlasChat";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/types/chat"; // Import the Message type

export const useAtlasChat = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Use Message type instead of ChatMessage
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      
      // Add user message
      const userMessage: Message = {
        id: crypto.randomUUID(), // Add unique id
        role: "user",
        content: message,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Get Atlas's response
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await getAtlasResponse(message, conversationHistory);

      // Add Atlas's response
      const assistantMessage: Message = {
        id: crypto.randomUUID(), // Add unique id
        role: "assistant",
        content: response || "I apologize, but I couldn't process that request. Could you try rephrasing it?",
        timestamp: new Date(),
        characterName: "Atlas",
        characterImage: "/lovable-uploads/c5dfc262-4e33-44a9-9ded-4ede0b241e17.png" // Atlas's image
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error in chat:", error);
      toast({
        title: "Error",
        description: "Failed to get a response from Atlas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};