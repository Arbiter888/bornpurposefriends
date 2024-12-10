import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled?: boolean;
}

export const ChatInput = ({ value, onChange, onSubmit, disabled }: ChatInputProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (value.trim()) { // Only submit if there's actual content
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled || !value.trim()}>Send</Button>
    </form>
  );
};