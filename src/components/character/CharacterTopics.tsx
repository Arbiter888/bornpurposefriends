import { Character } from "@/lib/types/character";
import { Badge } from "../ui/badge";

interface CharacterTopicsProps {
  character: Character;
}

export const CharacterTopics = ({ character }: CharacterTopicsProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Topics</h3>
      <div className="flex flex-wrap gap-2">
        {character.conversationTopics.map((topic) => (
          <Badge key={topic} variant="secondary">
            {topic}
          </Badge>
        ))}
      </div>
    </div>
  );
};
