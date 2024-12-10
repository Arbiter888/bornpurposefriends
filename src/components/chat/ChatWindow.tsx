import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Message } from "@/types/chat";
import { ChatControls } from "./ChatControls";

interface ChatWindowProps {
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

export const ChatWindow = ({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  characterImage,
  characterName,
  isLoading,
  isGroupChat,
  onToggleGroupChat
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [background, setBackground] = useState("none");
  const [prevMessagesLength, setPrevMessagesLength] = useState(messages.length);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > prevMessagesLength && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setPrevMessagesLength(messages.length);
  }, [messages, prevMessagesLength]);

  const getBackgroundStyle = () => {
    switch (background) {
      case "none":
        return {};
      case "gradient":
        return {
          background: "linear-gradient(to right, #0ea5e9, #2563eb)",
        };
      default:
        return {
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        };
    }
  };

  return (
    <div className="space-y-4">
      <ChatControls
        isGroupChat={isGroupChat}
        onToggleGroupChat={onToggleGroupChat}
        onChangeBackground={setBackground}
      />
      <Card 
        className="p-6 relative overflow-hidden"
        style={getBackgroundStyle()}
      >
        <div 
          className={`absolute inset-0 ${background !== 'none' ? 'bg-black/30 backdrop-blur-xs' : ''}`}
        />
        <div className="relative z-10">
          <div 
            ref={chatContainerRef}
            className="h-[500px] overflow-y-auto mb-4 space-y-4 scroll-smooth"
          >
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
    </div>
  );
};