import { Character } from "@/lib/characters";
import { Card } from "../ui/card";
import { PrayingHands } from "lucide-react";
import { Button } from "../ui/button";
import { AspectRatio } from "../ui/aspect-ratio";
import { useEffect, useState } from "react";
import { CharacterDetails } from "./CharacterDetails";
import { CharacterTopics } from "./CharacterTopics";
import { CharacterWidget } from "./CharacterWidget";

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

  const handlePrayerRequest = () => {
    if (scriptLoaded) {
      console.log("Opening prayer request widget for:", character.name);
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
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          onClick={handlePrayerRequest}
        >
          <PrayingHands className="w-4 h-4 mr-2" />
          Submit Prayer Request
        </Button>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">About</h3>
            <p className="text-sm text-muted-foreground">{character.description}</p>
          </div>

          <CharacterDetails character={character} />
          <CharacterTopics character={character} />
        </div>
      </Card>

      {showWidget && scriptLoaded && (
        <CharacterWidget 
          widgetId={character.widgetId} 
          onClose={() => setShowWidget(false)} 
        />
      )}
    </>
  );
};