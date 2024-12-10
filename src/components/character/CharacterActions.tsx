import { Character } from "@/lib/characters";
import { Button } from "@/components/ui/button";
import { PhoneCall, User } from "lucide-react";
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
        <PhoneCall className="w-4 h-4 mr-2" />
        Quick Call
      </Button>
      <Button 
        onClick={() => navigate(`/workspace/${character.id}`)}
        variant="secondary"
        className="w-full"
      >
        <User className="w-4 h-4 mr-2" />
        Open Workspace
      </Button>
    </div>
  );
};

export default CharacterActions;