import { Message } from "@/types/chat";
import { ChatWindow } from "./ChatWindow";
import { KanbanBoard } from "../kanban/KanbanBoard";
import { useAtlasChat } from "@/hooks/useAtlasChat";
import { useState } from "react";

interface ChatSectionProps {
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  characterImage?: string;
  characterName?: string;
  isLoading?: boolean;
  isGroupChat?: boolean;
  background?: string;
}

export const ChatSection = ({
  messages: defaultMessages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  characterImage,
  characterName,
  isLoading: defaultIsLoading,
  isGroupChat,
  background,
}: ChatSectionProps) => {
  const isAtlas = characterName === "Atlas";
  const { messages: atlasMessages, isLoading: atlasIsLoading, sendMessage: sendAtlasMessage } = useAtlasChat();
  const [useKnowledgeBase, setUseKnowledgeBase] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAtlas) {
      await sendAtlasMessage(newMessage);
      setNewMessage("");
    } else {
      handleSendMessage(e);
    }
  };

  return (
    <div className="space-y-6">
      <ChatWindow
        messages={isAtlas ? atlasMessages : defaultMessages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSubmit}
        characterImage={characterImage}
        characterName={characterName}
        isLoading={isAtlas ? atlasIsLoading : defaultIsLoading}
        isGroupChat={isGroupChat}
        background={background}
        useKnowledgeBase={useKnowledgeBase}
        onToggleKnowledgeBase={() => setUseKnowledgeBase(!useKnowledgeBase)}
      />
      <KanbanBoard />
    </div>
  );
};