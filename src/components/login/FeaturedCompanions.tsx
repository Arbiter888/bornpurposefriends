import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pastorAndrew } from "@/lib/data/pastorAndrew";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { CharacterWidget } from "../character/CharacterWidget";

const FeaturedCompanions = () => {
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
        setScriptLoaded(true);
      };
      
      document.head.appendChild(script);
    };

    loadScript();
  }, []);

  const handlePrayerRequest = () => {
    if (scriptLoaded) {
      setShowWidget(true);
    }
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>Meet Our Ministry Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[pastorAndrew, ...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
              <h3 className="text-lg font-semibold">Ministry Member</h3>
              <p className="text-gray-600 text-sm mb-2">Spiritual Guide</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button
            onClick={handlePrayerRequest}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <Phone className="w-4 h-4 mr-2" />
            Try Prayer Request (Preview)
          </Button>
        </div>
      </CardContent>
      {showWidget && scriptLoaded && (
        <CharacterWidget 
          widgetId={pastorAndrew.widgetId} 
          onClose={() => setShowWidget(false)} 
        />
      )}
    </Card>
  );
};

export default FeaturedCompanions;