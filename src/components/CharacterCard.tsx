import { Character } from "@/lib/characters";
import { useState } from "react";
import ChatInterface from "./ChatInterface";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="h-[500px] perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div 
          onClick={handleCardClick}
          className="absolute w-full h-full backface-hidden cursor-pointer bg-black rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            fontFamily: 'Tomorrow'
          }}
        >
          <div className="relative h-full">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-2">
              <h3 className="text-2xl font-bold mb-1">{character.name}</h3>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                {character.role}
              </span>
            </div>
            <p className="text-gray-300 text-sm">{character.description}</p>
          </div>
        </div>

        {/* Back of card (Chat Interface) */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180 bg-background rounded-xl overflow-hidden shadow-xl"
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-secondary">
              <div className="flex items-center gap-3">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{character.name}</h3>
                  <p className="text-sm text-primary">{character.role}</p>
                </div>
              </div>
              <button
                className="text-foreground hover:text-primary transition-colors"
                onClick={handleCardClick}
              >
                ×
              </button>
            </div>
            <ChatInterface character={character} onClose={handleCardClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;