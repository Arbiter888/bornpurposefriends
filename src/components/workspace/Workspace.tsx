import { useParams } from "react-router-dom";
import { characters } from "@/lib/characters";
import { useState } from "react";
import { Button } from "../ui/button";
import KanbanBoard from "./KanbanBoard";
import AIChat from "./AIChat";

const Workspace = () => {
  const { characterId } = useParams();
  const character = characters.find((c) => c.id === characterId);
  const [view, setView] = useState<"chat" | "kanban">("chat");

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <img
            src={character.image}
            alt={character.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{character.name}</h1>
            <p className="text-gray-500">{character.role}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setView("chat")}
            variant={view === "chat" ? "default" : "secondary"}
          >
            Chat
          </Button>
          <Button
            onClick={() => setView("kanban")}
            variant={view === "kanban" ? "default" : "secondary"}
          >
            Kanban Board
          </Button>
        </div>

        <div className="bg-card rounded-xl p-6">
          {view === "chat" ? (
            <AIChat character={character} />
          ) : (
            <KanbanBoard character={character} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspace;