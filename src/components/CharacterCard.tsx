import { Character } from "@/lib/characters";
import { useEffect, useRef, useState } from "react";

interface CharacterCardProps {
  character: Character;
  onWidgetOpen: () => void;
  isWidgetActive: boolean;
}

const CharacterCard = ({ character, onWidgetOpen, isWidgetActive }: CharacterCardProps) => {
  const [showWidget, setShowWidget] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadScript = () => {
      const existingScript = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
      
      if (existingScript) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log("Script loaded successfully");
        setScriptLoaded(true);
      };

      script.onerror = (error) => {
        console.error("Script loading error:", error);
        setScriptLoaded(false);
      };
      
      document.head.appendChild(script);
    };

    loadScript();

    return () => {
      // Cleanup not needed as we want to keep the script loaded
    };
  }, []);

  useEffect(() => {
    if (!isWidgetActive) {
      setShowWidget(false);
    }
  }, [isWidgetActive]);

  const handleCardClick = () => {
    if (scriptLoaded) {
      console.log("Opening widget for character:", character.name);
      onWidgetOpen();
      setShowWidget(true);
    } else {
      console.warn("Widget script not loaded yet");
    }
  };

  return (
    <>
      <div 
        ref={containerRef}
        onClick={handleCardClick}
        className="relative group h-[600px] w-full max-w-[400px] mx-auto cursor-pointer transform transition-all duration-300 hover:scale-105"
      >
        {/* Card Frame */}
        <div className="absolute inset-0 rounded-[20px] p-[2px] bg-gradient-to-b from-primary/50 to-secondary/50">
          <div className="absolute inset-0 bg-black rounded-[19px]" />
        </div>

        {/* Card Content */}
        <div className="relative h-full rounded-[19px] overflow-hidden bg-gradient-to-b from-gray-900 to-black p-4 flex flex-col">
          {/* Character Name Banner */}
          <div className="absolute top-4 left-0 right-0 text-center z-10">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-secondary/80 text-white px-4 py-2 rounded-r-full rounded-l-full mx-4 backdrop-blur-sm">
              {character.name}
            </h3>
          </div>

          {/* Character Image */}
          <div className="relative h-[45%] mt-12 mb-4">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10 rounded-xl" />
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
            />
          </div>

          {/* Role Badge */}
          <div className="mb-4 text-center">
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30">
              {character.role}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{character.description}</p>

          {/* Stats */}
          <div className="flex-1 space-y-3 mb-4 bg-gradient-to-b from-gray-900/50 to-black/50 rounded-xl p-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Trust Level</span>
              <span className="text-primary font-bold">{character.relationshipStats.trustLevel}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Years Known</span>
              <span className="text-primary font-bold">{character.relationshipStats.yearsKnown}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Meetings/Month</span>
              <span className="text-primary font-bold">{character.relationshipStats.meetingsPerMonth}</span>
            </div>
          </div>

          {/* Topics */}
          <div className="mb-4">
            <h4 className="text-sm text-gray-400 mb-2">Common Topics:</h4>
            <div className="flex flex-wrap gap-2">
              {character.conversationTopics.map((topic, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-500">© George Jacklin 2024</p>
          </div>
        </div>
      </div>

      {showWidget && scriptLoaded && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div 
            className="relative bg-black rounded-lg p-4 shadow-2xl"
            style={{ width: '300px' }}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowWidget(false);
              }}
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