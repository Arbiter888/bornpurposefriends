import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Database } from "lucide-react";
import { FormEvent } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled?: boolean;
  useKnowledgeBase: boolean;
  onToggleKnowledgeBase: () => void;
}

export const ChatInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  disabled,
  useKnowledgeBase,
  onToggleKnowledgeBase 
}: ChatInputProps) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
        disabled={disabled}
      />
      <Toggle
        pressed={useKnowledgeBase}
        onPressedChange={onToggleKnowledgeBase}
        className="px-3"
        title="Use Knowledge Base"
      >
        <Database className={`h-4 w-4 ${useKnowledgeBase ? 'text-primary' : 'text-muted-foreground'}`} />
      </Toggle>
      <Button type="submit" disabled={disabled}>Send</Button>
    </form>
  );
};