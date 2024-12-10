import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { characters } from "@/lib/characters";
import { MessageSquare, Kanban } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const Workspace = () => {
  const { characterId } = useParams();
  const character = characters.find((c) => c.id === characterId);
  const [activeTab, setActiveTab] = useState<'chat' | 'kanban'>('chat');

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
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

        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'chat' ? 'default' : 'secondary'}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </Button>
          <Button
            variant={activeTab === 'kanban' ? 'default' : 'secondary'}
            onClick={() => setActiveTab('kanban')}
          >
            <Kanban className="w-4 h-4 mr-2" />
            Kanban Board
          </Button>
        </div>

        <Card className="p-6">
          {activeTab === 'chat' ? (
            <div className="h-[600px]">
              <div 
                dangerouslySetInnerHTML={{
                  __html: `<elevenlabs-convai agent-id="${character.widgetId}"></elevenlabs-convai>`
                }}
              />
            </div>
          ) : (
            <div className="h-[600px] flex items-center justify-center">
              <p className="text-gray-500">Kanban board coming soon...</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Workspace;