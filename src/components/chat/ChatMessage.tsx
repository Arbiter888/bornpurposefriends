import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  characterImage?: string;
  characterName?: string;
}

export const ChatMessage = ({
  role,
  content,
  characterImage,
  characterName,
}: ChatMessageProps) => {
  const isUser = role === 'user';

  return (
    <div className={cn(
      "flex gap-3 items-start",
      isUser && "flex-row-reverse"
    )}>
      <Avatar className="w-8 h-8 border">
        {isUser ? (
          <AvatarFallback className="bg-primary text-primary-foreground">
            U
          </AvatarFallback>
        ) : (
          characterImage ? (
            <AvatarImage 
              src={characterImage} 
              alt={characterName || "Character"}
              className="object-cover"
            />
          ) : (
            <AvatarFallback>AI</AvatarFallback>
          )
        )}
      </Avatar>
      <div className={cn(
        "rounded-lg px-4 py-2 max-w-[80%] break-words",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        {!isUser && characterName && (
          <div className="font-semibold text-sm mb-1">{characterName}</div>
        )}
        <div className="text-sm whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );
};