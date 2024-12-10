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
  isGroupChat?: boolean;
  background?: string;
}

export const ChatWindow = ({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  characterImage,
  characterName,
  isLoading,
  isGroupChat,
  background,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card 
      className="p-6 relative overflow-hidden"
      style={background ? {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      <div className="relative z-10">
        <div className="h-[500px] overflow-y-auto mb-4 space-y-4 backdrop-blur-sm bg-white/10 rounded-lg p-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
              characterImage={isGroupChat ? message.characterImage : characterImage}
              characterName={isGroupChat ? message.characterName : characterName}
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
      </div>
    </Card>
  );
};