import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { characters } from "@/lib/characters";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";
import { Message } from "@/types/chat";
import { CharacterProfile } from "./character/CharacterProfile";
import { ChatSection } from "./chat/ChatSection";
import { Home, LogOut } from "lucide-react";
import { Button } from "./ui/button";

const Workspace = () => {
  const { characterId } = useParams();
  const character = characters.find((c) => c.id === characterId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const user = useUser();
  const navigate = useNavigate();

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

  const handleQuickCall = () => {
    toast({
      title: "Starting call...",
      description: `Initiating a call with ${character?.name}`,
    });
    // Additional call logic would go here
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-end gap-2 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-secondary/10"
          >
            <Home className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            className="hover:bg-secondary/10"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <CharacterProfile 
            character={character}
            onQuickCall={handleQuickCall}
          />
          <div className="md:col-span-3">
            <ChatSection
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              characterImage={character.image}
              characterName={character.name}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
