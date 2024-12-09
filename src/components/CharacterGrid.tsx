import { characters } from "@/lib/characters";
import { useState } from "react";
import CharacterCard from "./CharacterCard";

const CharacterGrid = () => {
  const [activeWidgetId, setActiveWidgetId] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        style={{
          opacity: 0,
          animation: 'fade-in 0.5s ease-out forwards',
          animationDelay: '0.3s'
        }}
      >
        {characters.map((character, index) => (
          <div
            key={character.id}
            style={{
              opacity: 0,
              animation: 'fade-in 0.5s ease-out forwards',
              animationDelay: `${0.2 * (index + 1)}s`
            }}
          >
            <CharacterCard 
              character={character}
              onWidgetOpen={() => setActiveWidgetId(character.id)}
              isWidgetActive={activeWidgetId === character.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterGrid;