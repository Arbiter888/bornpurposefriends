import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pastorAndrew } from "@/lib/data/pastorAndrew";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useState, useEffect } from "react";

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
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={pastorAndrew.image}
              alt={pastorAndrew.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{pastorAndrew.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{pastorAndrew.role}</p>
            <Button
              onClick={handlePrayerRequest}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <Phone className="w-4 h-4 mr-2" />
              Try Prayer Request (Preview)
            </Button>
          </div>
          <p className="text-sm text-gray-500 text-center italic">
            Experience a preview of our prayer request feature with Pastor Andrew
          </p>
        </div>
      </CardContent>
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
                __html: `<elevenlabs-convai agent-id="${pastorAndrew.widgetId}"></elevenlabs-convai>`
              }}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default FeaturedCompanions;