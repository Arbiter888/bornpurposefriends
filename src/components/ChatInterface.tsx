import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Character } from "@/lib/characters";

interface Message {
  id: string;
  text: string;
  sender: "user" | "character";
  timestamp: Date;
}

interface ChatInterfaceProps {
  character: Character;
  onClose: () => void;
}

const ChatInterface = ({ character, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello! I'm ${character.name}. ${character.description}`,
      sender: "character",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Simulate character response
    setTimeout(() => {
      const characterResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand what you're saying about "${newMessage}". As ${character.role}, I can help you with that.`,
        sender: "character",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, characterResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-background border rounded-lg shadow-xl flex flex-col animate-fade-in">
      <div className="p-4 border-b flex justify-between items-center bg-secondary rounded-t-lg">
        <div className="flex items-center gap-3">
          <img
            src={character.image}
            alt={character.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground">{character.name}</h3>
            <p className="text-sm text-primary">{character.role}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground"
          onClick={onClose}
        >
          ×
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p>{message.text}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;