import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookmarkPlus } from "lucide-react";
import { useToast } from "../ui/use-toast";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  characterImage?: string;
  characterName?: string;
}

export const ChatMessage = ({ role, content, characterImage, characterName }: ChatMessageProps) => {
  const { toast } = useToast();

  const handleAddToKanban = () => {
    const event = new CustomEvent('addToKanban', { 
      detail: { 
        title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
        description: content
      } 
    });
    window.dispatchEvent(event);
    
    toast({
      title: "Added to Kanban",
      description: "The suggestion has been added to your todo list",
    });
  };

  const handleSaveMessage = () => {
    const event = new CustomEvent('saveMessage', { 
      detail: { 
        title: `Saved message from ${role === 'assistant' ? characterName : 'you'}`,
        description: content
      } 
    });
    window.dispatchEvent(event);
    
    toast({
      title: "Message Saved",
      description: "The message has been added to your saved messages",
    });
  };

  return (
    <div className={`flex gap-3 ${role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}>
      <Avatar>
        <AvatarImage src={role === 'assistant' ? characterImage : undefined} />
        <AvatarFallback>
          {role === 'assistant' ? characterName?.[0] : 'You'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div
          className={`rounded-lg p-3 mb-2 ${
            role === 'assistant'
              ? 'bg-card text-card-foreground'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          {content}
        </div>
        <div className="flex gap-2">
          {role === 'assistant' && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleAddToKanban}
            >
              <PlusCircle className="w-4 h-4" />
              Add to Kanban
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleSaveMessage}
          >
            <BookmarkPlus className="w-4 h-4" />
            Save Message
          </Button>
        </div>
      </div>
    </div>
  );
};