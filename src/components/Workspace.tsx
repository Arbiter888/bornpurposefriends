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
import { TemplateQuestions } from "./workspace/TemplateQuestions";
import { KnowledgeBase } from "./workspace/KnowledgeBase";
import { Gallery } from "./workspace/Gallery";

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

  const handlePrayerRequest = () => {
    toast({
      title: "Opening prayer request...",
      description: `Connecting with ${character?.name} for prayer`,
    });
  };

  const toggleGroupChat = () => {
    setIsGroupChat(!isGroupChat);
    toast({
      title: isGroupChat ? "Individual Study Mode" : "Group Bible Study Mode",
      description: isGroupChat 
        ? `Switching to individual study with ${character?.name}`
        : "Starting a group Bible study session with all spiritual mentors. Each will provide their unique perspective.",
    });
  };

  const handleBackgroundChange = (newBackground: string) => {
    setBackground(newBackground);
    toast({
      title: "Background Updated",
      description: "Study environment background has been changed",
    });
  };

  const handleTemplateSelect = (question: string) => {
    setNewMessage(question);
    toast({
      title: "Bible Study Question Selected",
      description: "The message field has been populated with your selected question",
    });
  };

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <WorkspaceHeader />
        
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-end mb-4 md:mb-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Bible Study Workspace
            </h1>
            <p className="text-secondary/80 text-base md:text-lg max-w-2xl">
              Welcome to your spiritual growth workspace. Here you can engage in Bible study, 
              join group discussions, and seek spiritual guidance. Use the tools provided to 
              enhance your learning and prayer experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <div className="w-full sm:w-auto">
              <TemplateQuestions onSelect={handleTemplateSelect} />
            </div>
            <div className="w-full sm:w-auto">
              <BackgroundSelector onSelect={handleBackgroundChange} />
            </div>
            <div className="w-full sm:w-auto">
              <Button
                onClick={toggleGroupChat}
                variant={isGroupChat ? "default" : "outline"}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                {isGroupChat ? "Exit Group Study" : "Join Group Study"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="space-y-4 md:space-y-6">
            <CharacterProfile 
              character={character}
              onQuickCall={handlePrayerRequest}
            />
            <Gallery
              videos={character.gallery?.videos}
              images={character.gallery?.images}
              characterId={character.id}
            />
            <KnowledgeBase />
          </div>
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