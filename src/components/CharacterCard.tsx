import { Character } from "@/lib/characters";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Kanban, User } from "lucide-react";
import { Button } from "./ui/button";

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

  const openWorkspace = () => {
    const workspaceUrl = `/workspace/${character.id}`;
    window.open(workspaceUrl, '_blank');
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="relative group bg-black rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl h-full"
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
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#8B0000]/10 text-[#FF0000]">
                {character.role}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#8B0000]/10 text-[#FF0000]">
                {character.nationality}
              </span>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-4">{character.description}</p>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Trust Level</span>
              <span className="text-primary">{character.relationshipStats.trustLevel}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Years Known</span>
              <span className="text-primary">{character.relationshipStats.yearsKnown}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Meetings/Month</span>
              <span className="text-primary">{character.relationshipStats.meetingsPerMonth}</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm text-gray-400 mb-2">Languages:</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {character.languages.map((language, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-[#8B0000]/10 text-[#FF0000]"
                >
                  {language}
                </span>
              ))}
            </div>
            
            <h4 className="text-sm text-gray-400 mb-2">Common Topics:</h4>
            <div className="flex flex-wrap gap-2">
              {character.conversationTopics.map((topic, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-gray-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleCardClick}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Quick Chat
            </Button>
            <Button 
              onClick={openWorkspace}
              variant="secondary"
              className="w-full"
            >
              <User className="w-4 h-4 mr-2" />
              Open Workspace
            </Button>
          </div>

          <p className="text-xs text-gray-400 mt-4">© George Jacklin 2024</p>
        </div>
      </div>

      {showWidget && scriptLoaded && (
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