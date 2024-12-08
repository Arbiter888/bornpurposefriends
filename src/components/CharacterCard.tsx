import { Character } from "@/lib/characters";
import { useEffect, useRef, useState } from "react";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const [showWidget, setShowWidget] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCardClick = () => {
    setShowWidget(true);
  };

  return (
    <>
      <div 
        ref={containerRef}
        onClick={handleCardClick}
        className="relative group bg-black rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          fontFamily: 'Tomorrow'
        }}
      >
        <div className="aspect-[3/4] relative">
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

      {showWidget && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div 
            className="relative bg-black rounded-lg p-4 shadow-2xl"
            style={{ width: '300px' }}
          >
            <button 
              onClick={() => setShowWidget(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
            >
              ×
            </button>
            <div 
              dangerouslySetInnerHTML={{
                __html: `<elevenlabs-convai agent-id="${character.widgetId}"></elevenlabs-convai>`
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterCard;