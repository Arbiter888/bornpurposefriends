import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Message } from "@/types/chat";

interface ChatWindowProps {
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  characterImage?: string;
  characterName?: string;
  isLoading?: boolean;
}

export const ChatWindow = ({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  characterImage,
  characterName,
  isLoading
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="p-6">
      <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            characterImage={characterImage}
            characterName={characterName}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        value={newMessage}
        onChange={setNewMessage}
        onSubmit={handleSendMessage}
        disabled={isLoading}
      />
    </Card>
  );
};