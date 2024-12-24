import { useState } from "react";
import { ChatSection } from "../chat/ChatSection";
import { Button } from "../ui/button";
import { CharacterWidget } from "../character/CharacterWidget";
import { MessageSquare, BookOpen, Church } from "lucide-react";
import { pastorAndrew } from "@/lib/data/pastorAndrew";
import { useChat } from "@/hooks/useChat";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "../ui/use-toast";
import { KanbanBoard } from "../kanban/KanbanBoard";

interface VideoInteractionSectionProps {
  videoId: string;
}

export const VideoInteractionSection = ({ videoId }: VideoInteractionSectionProps) => {
  const [showChat, setShowChat] = useState(false);
  const [showPrayerWidget, setShowPrayerWidget] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const user = useUser();
  const { toast } = useToast();
  
  const {
    messages,
    isLoading,
    handleSendMessage,
  } = useChat(user, pastorAndrew.id);

  const handlePrayerRequest = () => {
    setShowPrayerWidget(true);
    toast({
      title: "Opening prayer request...",
      description: "Connecting with Pastor Andrew for prayer",
    });
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={() => setShowChat(!showChat)}
          className="flex items-center gap-2"
          variant={showChat ? "secondary" : "default"}
        >
          <MessageSquare className="w-4 h-4" />
          Chat with Pastor Andrew
        </Button>
        <Button
          onClick={handlePrayerRequest}
          className="flex items-center gap-2"
        >
          <Church className="w-4 h-4" />
          Prayer Request
        </Button>
      </div>

      {showChat && (
        <ChatSection
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          characterImage={pastorAndrew.image}
          characterName={pastorAndrew.name}
          isLoading={isLoading}
          background="/lovable-uploads/13d38535-30c9-41f0-8ad6-f6f3d90dceb4.png"
        />
      )}

      {showPrayerWidget && (
        <CharacterWidget
          widgetId={pastorAndrew.widgetId}
          onClose={() => setShowPrayerWidget(false)}
        />
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Bible Study Planner</h2>
        <KanbanBoard />
      </div>
    </div>
  );
};