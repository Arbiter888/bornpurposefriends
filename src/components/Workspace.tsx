import { useParams } from "react-router-dom";
import { characters } from "@/lib/characters";
import { useUser } from "@supabase/auth-helpers-react";
import { CharacterProfile } from "./character/CharacterProfile";
import { ChatSection } from "./chat/ChatSection";
import { WorkspaceHeader } from "./workspace/WorkspaceHeader";
import { useChat } from "@/hooks/useChat";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Button } from "./ui/button";
import { Users } from "lucide-react";
import { BackgroundSelector } from "./workspace/BackgroundSelector";

const Workspace = () => {
  const { characterId } = useParams();
  const character = characters.find((c) => c.id === characterId);
  const user = useUser();
  const { toast } = useToast();
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [background, setBackground] = useState("");
  
  const {
    messages,
    newMessage,
    setNewMessage,
    isLoading,
    handleSendMessage,
  } = useChat(user, characterId, isGroupChat);

  const handleQuickCall = () => {
    toast({
      title: "Starting call...",
      description: `Initiating a call with ${character?.name}`,
    });
  };

  const toggleGroupChat = () => {
    setIsGroupChat(!isGroupChat);
    toast({
      title: isGroupChat ? "Single Chat Mode" : "Group Chat Mode",
      description: isGroupChat 
        ? `Switching to chat with ${character?.name}`
        : "Switching to group chat with all AI companions",
    });
  };

  const handleBackgroundChange = (newBackground: string) => {
    setBackground(newBackground);
    toast({
      title: "Background Updated",
      description: "Chat background has been changed successfully",
    });
  };

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <WorkspaceHeader />
        <div className="flex justify-end gap-2">
          <BackgroundSelector onSelect={handleBackgroundChange} />
          <Button
            onClick={toggleGroupChat}
            variant={isGroupChat ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            {isGroupChat ? "Exit Group Chat" : "Start Group Chat"}
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
              handleSendMessage={(e) => {
                e.preventDefault();
                handleSendMessage(isGroupChat ? characters : character);
              }}
              characterImage={character.image}
              characterName={character.name}
              isLoading={isLoading}
              isGroupChat={isGroupChat}
              background={background}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;