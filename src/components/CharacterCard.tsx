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
        className="relative group bg-black rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer h-full animate-fade-up"
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
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-4 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
            <h3 className="text-2xl font-bold mb-2">{character.name}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#8B0000]/10 text-[#FF0000] transition-colors duration-300 hover:bg-[#8B0000]/20">
                {character.role}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#8B0000]/10 text-[#FF0000] transition-colors duration-300 hover:bg-[#8B0000]/20">
                {character.nationality}
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{character.description}</p>
          </div>
          
          <div className="space-y-3 mb-4 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-400">Trust Level</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF0000] rounded-full transition-all duration-500"
                    style={{ width: `${character.relationshipStats.trustLevel}%` }}
                  />
                </div>
                <span className="text-[#FF0000] font-medium">{character.relationshipStats.trustLevel}%</span>
              </div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Years Known</span>
              <span className="text-[#FF0000]">{character.relationshipStats.yearsKnown}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Meetings/Month</span>
              <span className="text-[#FF0000]">{character.relationshipStats.meetingsPerMonth}</span>
            </div>
          </div>

          <div className="space-y-3 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
            <div>
              <h4 className="text-sm text-gray-400 mb-2">Languages:</h4>
              <div className="flex flex-wrap gap-2">
                {character.languages.map((language, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-[#8B0000]/10 text-[#FF0000] transition-colors duration-300 hover:bg-[#8B0000]/20"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-400 mb-2">Common Topics:</h4>
              <div className="flex flex-wrap gap-2">
                {character.conversationTopics.map((topic, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-gray-300 transition-colors duration-300 hover:bg-secondary/70"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4 opacity-75">© George Jacklin 2024</p>
        </div>
      </div>

      {showWidget && scriptLoaded && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div 
            className="relative bg-black rounded-lg p-4 shadow-2xl border border-[#FF0000]/20"
            style={{ width: '300px' }}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowWidget(false);
              }}
              className="absolute top-2 right-2 text-white hover:text-[#FF0000] transition-colors duration-300"
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