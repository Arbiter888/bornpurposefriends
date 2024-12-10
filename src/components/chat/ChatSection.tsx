import { Message } from "@/types/chat";
import { ChatWindow } from "./ChatWindow";
import { KanbanBoard } from "../kanban/KanbanBoard";

interface ChatSectionProps {
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  characterImage?: string;
  characterName?: string;
  isLoading?: boolean;
  isGroupChat?: boolean;
  onToggleGroupChat: () => void;
}

export const ChatSection = ({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  characterImage,
  characterName,
  isLoading,
  isGroupChat,
  onToggleGroupChat,
}: ChatSectionProps) => {
  return (
    <div className="space-y-6">
      <ChatWindow
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        characterImage={characterImage}
        characterName={characterName}
        isLoading={isLoading}
        isGroupChat={isGroupChat}
        onToggleGroupChat={onToggleGroupChat}
      />
      <KanbanBoard />
    </div>
  );
};