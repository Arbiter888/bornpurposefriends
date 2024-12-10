import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { characters } from "@/lib/characters";
import { MessageSquare, Kanban } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ChatWindow } from "./chat/ChatWindow";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";
import { Message } from "@/types/chat";
import { KanbanBoard } from "./kanban/KanbanBoard";

const Workspace = () => {
  const { characterId } = useParams();
  const character = characters.find((c) => c.id === characterId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const user = useUser();

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
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
      // Save user message to Supabase
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

      // Get AI response using Supabase Edge Function
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

      // Save AI message to Supabase
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

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <img
            src={character.image}
            alt={character.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{character.name}</h1>
            <p className="text-gray-500">{character.role}</p>
          </div>
        </div>

        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <Kanban className="w-4 h-4" />
              Kanban Board
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <ChatWindow
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              characterImage={character.image}
              characterName={character.name}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="kanban">
            <KanbanBoard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Workspace;