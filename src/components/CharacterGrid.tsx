import { characters } from "@/lib/characters";
import { useState } from "react";
import CharacterCard from "./CharacterCard";

const CharacterGrid = () => {
  const [activeWidgetId, setActiveWidgetId] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {characters.map((character) => (
          <CharacterCard 
            key={character.id} 
            character={character}
            onWidgetOpen={() => setActiveWidgetId(character.id)}
            isWidgetActive={activeWidgetId === character.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterGrid;