
import { Character } from "@/lib/characters";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CharacterActionsProps {
  character: Character;
  onQuickCall: () => void;
}

const CharacterActions = ({ character, onQuickCall }: CharacterActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <Button 
        onClick={onQuickCall}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Phone className="w-4 h-4 mr-2" />
        Call {character.name}
      </Button>
      <Button 
        onClick={() => navigate(`/workspace/${character.id}`)}
        variant="secondary"
        className="w-full"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Chat with {character.name}
      </Button>
    </div>
  );
};

export default CharacterActions;
