import { useState } from "react";
import { ChatSection } from "../chat/ChatSection";
import { Button } from "../ui/button";
import { CharacterWidget } from "../character/CharacterWidget";
import { MessageSquare, BookOpen, Church } from "lucide-react";
import { pastorAndrew } from "@/lib/data/pastorAndrew";

interface VideoInteractionSectionProps {
  videoId: string;
}

export const VideoInteractionSection = ({ videoId }: VideoInteractionSectionProps) => {
  const [showChat, setShowChat] = useState(false);
  const [showPrayerWidget, setShowPrayerWidget] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    // Add user message
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: newMessage,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage, videoId }),
      });

      const data = await response.json();
      
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        characterName: pastorAndrew.name,
        characterImage: pastorAndrew.image,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
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
          onClick={() => setShowPrayerWidget(true)}
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
          background="/lovable-uploads/4d95070c-c289-4e0e-9845-9dc062d08687.png"
        />
      )}

      {showPrayerWidget && (
        <CharacterWidget
          widgetId={pastorAndrew.widgetId}
          onClose={() => setShowPrayerWidget(false)}
        />
      )}
    </div>
  );
};