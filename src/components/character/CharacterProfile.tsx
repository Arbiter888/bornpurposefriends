import { Character } from "@/lib/characters";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Globe, MessageCircle, Clock, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { AspectRatio } from "../ui/aspect-ratio";

interface CharacterProfileProps {
  character: Character;
  onQuickCall: () => void;
}

export const CharacterProfile = ({ character, onQuickCall }: CharacterProfileProps) => {
  return (
    <Card className="p-6 space-y-6">
      {/* Full Image */}
      <AspectRatio ratio={3/4} className="bg-muted rounded-lg overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="object-cover w-full h-full"
        />
      </AspectRatio>

      {/* Profile Info */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold">{character.name}</h2>
        <p className="text-muted-foreground">{character.role}</p>
      </div>

      {/* Call Button */}
      <Button 
        className="w-full"
        onClick={onQuickCall}
      >
        <Phone className="w-4 h-4 mr-2" />
        Call {character.name}
      </Button>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">About</h3>
          <p className="text-sm text-muted-foreground">{character.description}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Details</h3>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{character.nationality}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{character.languages.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{character.relationshipStats.yearsKnown} years</span>
          </div>
        </div>

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
      </div>
    </Card>
  );
};