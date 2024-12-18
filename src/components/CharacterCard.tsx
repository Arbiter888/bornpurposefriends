import { Character } from "@/lib/characters";
import { useEffect, useRef, useState } from "react";
import { Cross, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface CharacterCardProps {
  character: Character;
  onWidgetOpen: () => void;
  isWidgetActive: boolean;
}

const CharacterCard = ({ character, onWidgetOpen, isWidgetActive }: CharacterCardProps) => {
  const [showWidget, setShowWidget] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const navigate = useNavigate();

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

  const handlePrayerRequest = () => {
    if (scriptLoaded) {
      console.log("Opening widget for character:", character.name);
      onWidgetOpen();
      setShowWidget(true);
    } else {
      console.warn("Widget script not loaded yet");
    }
  };

  const handleBibleStudy = () => {
    navigate(`/workspace/${character.id}`);
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="relative group bg-black rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl h-[500px]"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2">{character.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400">{character.role}</span>
            </div>
            <p className="text-gray-300 text-sm">{character.description}</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handlePrayerRequest}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              <Cross className="w-4 h-4 mr-2" />
              Prayer Request
            </Button>
            <Button
              onClick={handleBibleStudy}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Bible Study
            </Button>
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