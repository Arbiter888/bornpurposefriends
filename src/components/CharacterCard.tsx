import { Character } from "@/lib/characters";
import { useEffect, useRef, useState } from "react";
import { Phone, BookOpen, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

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

  const getCurrentName = () => {
    if (currentLanguage === "en") return character.name;
    return character.translations?.[currentLanguage]?.name || character.name;
  };

  const getCurrentRole = () => {
    if (currentLanguage === "en") return character.role;
    return character.translations?.[currentLanguage]?.role || character.role;
  };

  const getCurrentDescription = () => {
    if (currentLanguage === "en") return character.description;
    return character.translations?.[currentLanguage]?.description || character.description;
  };

  const getCurrentWidgetId = () => {
    if (currentLanguage === "en") return character.widgetId;
    return character.translations?.[currentLanguage]?.widgetId || character.widgetId;
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="relative group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl rounded-2xl"
        style={{
          height: 'auto',
          fontFamily: 'Tomorrow'
        }}
      >
        <div className="relative">
          <img
            src={character.image}
            alt={getCurrentName()}
            className="w-full h-full object-contain rounded-2xl"
            loading="lazy"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-bold text-white">{getCurrentName()}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCurrentLanguage("en")}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentLanguage("ko")}>
                    한국어
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400">{getCurrentRole()}</span>
            </div>
            <p className="text-gray-300 text-sm">{getCurrentDescription()}</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handlePrayerRequest}
              className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-xl"
            >
              <Phone className="w-4 h-4 mr-2" />
              {currentLanguage === "ko" ? "기도 요청" : "Prayer Request Call"}
            </Button>
            <Button
              onClick={handleBibleStudy}
              className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-xl"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {currentLanguage === "ko" ? "성경 공부" : "Bible Study"}
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
                __html: `<elevenlabs-convai agent-id="${getCurrentWidgetId()}"></elevenlabs-convai>`
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterCard;