import { Character } from "@/lib/characters";
import { useEffect, useRef } from "react";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
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

  return (
    <div 
      ref={containerRef}
      className="relative group bg-card rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div className="aspect-[3/4] relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-1">{character.name}</h3>
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
            {character.role}
          </span>
        </div>
        <p className="text-gray-300 mb-6">{character.description}</p>
        <div 
          dangerouslySetInnerHTML={{
            __html: `<elevenlabs-convai agent-id="${character.widgetId}"></elevenlabs-convai>`
          }}
        />
      </div>
    </div>
  );
};

export default CharacterCard;