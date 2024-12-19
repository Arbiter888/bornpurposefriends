import { Button } from "@/components/ui/button";
import { Character } from "@/lib/types/character";
import { Phone } from "lucide-react";

interface CharacterProfileProps {
  character: Character;
  onQuickCall?: () => void;
}

export const CharacterProfile = ({ character, onQuickCall }: CharacterProfileProps) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={character.profileImage}
            alt={character.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{character.name}</h3>
            <p className="text-sm text-muted-foreground">{character.title}</p>
          </div>
        </div>
        
        <p className="text-sm">{character.description}</p>
        
        {character.quickCall && (
          <Button
            onClick={onQuickCall}
            className="w-full flex items-center gap-2"
            variant="outline"
          >
            <Phone className="w-4 h-4" />
            {character.quickCall.title}
          </Button>
        )}
      </div>
    </div>
  );
};