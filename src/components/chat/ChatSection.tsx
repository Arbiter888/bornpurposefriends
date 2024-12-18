import { Message } from "@/types/chat";
import { ChatWindow } from "./ChatWindow";
import { KanbanBoard } from "../kanban/KanbanBoard";
import { useAtlasChat } from "@/hooks/useAtlasChat";
import { useState } from "react";

interface ChatSectionProps {
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent, documentId?: string) => void;
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

  const handleSubmit = async (e: React.FormEvent, documentId?: string) => {
    e.preventDefault();
    if (isAtlas) {
      await sendAtlasMessage(newMessage, documentId);
      setNewMessage("");
    } else {
      handleSendMessage(e, documentId);
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
      />
      <KanbanBoard />
    </div>
  );
};