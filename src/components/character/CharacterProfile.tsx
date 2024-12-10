import { Character } from "@/lib/characters";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Globe, MessageCircle, Clock, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { AspectRatio } from "../ui/aspect-ratio";
import { useEffect, useState } from "react";

interface CharacterProfileProps {
  character: Character;
  onQuickCall: () => void;
}

export const CharacterProfile = ({ character, onQuickCall }: CharacterProfileProps) => {
  const [showWidget, setShowWidget] = useState(false);
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

  const handleQuickCall = () => {
    if (scriptLoaded) {
      console.log("Opening widget for character:", character.name);
      setShowWidget(true);
    } else {
      console.warn("Widget script not loaded yet");
    }
  };

  return (
    <>
      <Card className="p-6 space-y-6">
        <AspectRatio ratio={3/4} className="bg-muted rounded-lg overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="object-cover w-full h-full object-top"
          />
        </AspectRatio>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <p className="text-muted-foreground">{character.role}</p>
        </div>

        <Button 
          className="w-full"
          onClick={handleQuickCall}
        >
          <Phone className="w-4 h-4 mr-2" />
          Call {character.name}
        </Button>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">About</h3>
            <p className="text-sm text-muted-foreground">{character.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Details</h3>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{character.nationality}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{character.skills.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{character.relationshipStats.yearsKnown} years</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {character.conversationTopics.map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

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