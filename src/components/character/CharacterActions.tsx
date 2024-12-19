import { Character } from "@/lib/types/character";
import { Button } from "@/components/ui/button";
import { Cross, BookOpen } from "lucide-react";
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
        <Cross className="w-4 h-4 mr-2" />
        Prayer Request
      </Button>
      <Button 
        onClick={() => navigate(`/workspace/${character.id}`)}
        variant="secondary"
        className="w-full"
      >
        <BookOpen className="w-4 h-4 mr-2" />
        Bible Study Together
      </Button>
    </div>
  );
};

export default CharacterActions;
