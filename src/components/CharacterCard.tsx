import { Character } from "@/lib/characters";
import { useState } from "react";
import ChatInterface from "./ChatInterface";
import { ElevenLabsWidget } from "@/components/ElevenLabsWidget";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  const handleVoiceCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowWidget(!showWidget);
  };

  const handleTextChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`/chat/${character.id}`, '_blank');
  };

  return (
    <div className="h-[600px] w-full">
      <div className="relative w-full h-full">
        <div 
          className="absolute w-full h-full cursor-pointer bg-black rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
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
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleTextChat}
                className="bg-primary/20 hover:bg-primary/30 text-primary p-2 rounded-full transition-colors"
                title="Open Text Chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
              <button
                onClick={handleVoiceCall}
                className="bg-primary/20 hover:bg-primary/30 text-primary p-2 rounded-full transition-colors"
                title="Start Voice Call"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </button>
            </div>
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
      </div>

      {/* Voice Chat Widget */}
      {showWidget && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-xl">
          <div className="bg-background p-4 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Voice Chat with {character.name}</h3>
              <button 
                onClick={handleVoiceCall}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <ElevenLabsWidget widgetId={character.widgetId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;