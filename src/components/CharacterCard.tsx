import { Character } from "@/lib/characters";
import { useState } from "react";
import ChatInterface from "./ChatInterface";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const [showChat, setShowChat] = useState(false);

  const handleCardClick = () => {
    setShowChat(true);
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="relative group bg-black rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer h-full"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          fontFamily: 'Tomorrow'
        }}
      >
        <div className="relative">
          <img
            src={character.image}
            alt={character.name}
            className="w-full object-cover"
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

      {showChat && (
        <ChatInterface 
          character={character} 
          onClose={() => setShowChat(false)} 
        />
      )}
    </>
  );
};

export default CharacterCard;