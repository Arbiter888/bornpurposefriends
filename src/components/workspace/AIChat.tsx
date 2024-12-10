import { Character } from "@/lib/characters";
import { useState } from "react";
import { Button } from "../ui/button";

interface AIChatProps {
  character: Character;
}

const AIChat = ({ character }: AIChatProps) => {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: `Hello! I'm ${character.name}. How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: `As ${character.name}, I acknowledge your message: "${input}"` },
    ]);
    setInput("");
  };

  return (
    <div className="h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 bg-background border rounded-lg px-4 py-2"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default AIChat;