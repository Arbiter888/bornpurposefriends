import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  characterImage?: string;
  characterName?: string;
}

export const ChatMessage = ({ role, content, characterImage, characterName }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 ${role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}>
      <Avatar>
        <AvatarImage src={role === 'assistant' ? characterImage : undefined} />
        <AvatarFallback>
          {role === 'assistant' ? characterName?.[0] : 'You'}
        </AvatarFallback>
      </Avatar>
      <div
        className={`rounded-lg p-3 max-w-[80%] ${
          role === 'assistant'
            ? 'bg-card text-card-foreground'
            : 'bg-primary text-primary-foreground'
        }`}
      >
        {content}
      </div>
    </div>
  );
};