import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, ChevronDown, ChevronUp, CalendarPlus } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  characterImage?: string;
  characterName?: string;
}

export const ChatMessage = ({ role, content, characterImage, characterName }: ChatMessageProps) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const messageLength = 300;
  const shouldTruncate = content.length > messageLength;
  const displayContent = shouldTruncate && !isExpanded 
    ? content.slice(0, messageLength) + "..."
    : content;

  const handleAddToPlanner = () => {
    const event = new CustomEvent('addToKanban', { 
      detail: { 
        title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
        description: content
      } 
    });
    window.dispatchEvent(event);
    
    toast({
      title: "Added to Bible Study Planner",
      description: "The scripture has been added to your planner",
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
    <div className={`flex gap-3 ${role === 'assistant' ? 'flex-row' : 'flex-row-reverse'} animate-fade-up`}>
      <Avatar>
        <AvatarImage src={role === 'assistant' ? characterImage : undefined} />
        <AvatarFallback>
          {role === 'assistant' ? characterName?.[0] : 'You'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        {role === 'assistant' && (
          <p className="text-sm text-foreground/70">{characterName}</p>
        )}
        <div
          className={`rounded-lg p-4 ${
            role === 'assistant'
              ? 'bg-[#9b87f5] text-white'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          <div className="prose max-w-none">
            {displayContent}
          </div>
          {shouldTruncate && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 flex items-center gap-2 text-white hover:text-white/90"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Read more
                </>
              )}
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {role === 'assistant' && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleAddToPlanner}
            >
              <CalendarPlus className="w-4 h-4" />
              Add to Bible Study Planner
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