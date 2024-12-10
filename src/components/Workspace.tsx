import { useParams } from "react-router-dom";
import { characters } from "@/lib/characters";
import { useUser } from "@supabase/auth-helpers-react";
import { CharacterProfile } from "./character/CharacterProfile";
import { ChatSection } from "./chat/ChatSection";
import { WorkspaceHeader } from "./workspace/WorkspaceHeader";
import { useChat } from "@/hooks/useChat";
import { useToast } from "./ui/use-toast";

const Workspace = () => {
  const { characterId } = useParams();
  const character = characters.find((c) => c.id === characterId);
  const user = useUser();
  const { toast } = useToast();
  
  const {
    messages,
    newMessage,
    setNewMessage,
    isLoading,
    handleSendMessage,
  } = useChat(user, characterId);

  const handleQuickCall = () => {
    toast({
      title: "Starting call...",
      description: `Initiating a call with ${character?.name}`,
    });
    // Additional call logic would go here
  };

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <WorkspaceHeader />
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
                handleSendMessage(character);
              }}
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