import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/auth-helpers-react";

export const useChat = (user: User | null, characterId: string | undefined) => {
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
        })));
      }
    };

    fetchMessages();
  }, [user?.id, characterId, toast]);

  const handleSendMessage = async (character: any) => {
    if (!newMessage.trim() || !user?.id || !character) return;

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
      };

      const { error: aiInsertError } = await supabase
        .from('messages')
        .insert({
          id: aiMessageId,
          conversation_id: conversationUUID,
          content: data.response,
          role: 'assistant',
          user_id: user.id,
        });

      if (aiInsertError) throw aiInsertError;

      setMessages(prev => [...prev, aiMessage]);
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