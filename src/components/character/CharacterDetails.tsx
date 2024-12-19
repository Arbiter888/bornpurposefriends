import { Character } from "@/lib/types/character";
import { Globe, MessageCircle, Clock } from "lucide-react";

interface CharacterDetailsProps {
  character: Character;
}

export const CharacterDetails = ({ character }: CharacterDetailsProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Details</h3>
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm">{character.nationality}</span>
      </div>
      <div className="flex items-center gap-2">
        <MessageCircle className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm">{character.skills.join(", ")}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm">{character.relationshipStats.yearsKnown} years</span>
      </div>
    </div>
  );
};
