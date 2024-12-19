import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SubscriptionButton from "@/components/SubscriptionButton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CharacterWidget } from "../character/CharacterWidget";

const PremiumFeatures = () => {
  const [showPrayerWidget, setShowPrayerWidget] = useState(false);
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
      console.log("Opening prayer request widget");
      setShowPrayerWidget(true);
    } else {
      console.warn("Widget script not loaded yet");
    }
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>Join Our Mission</CardTitle>
        <CardDescription>
          Help us expand our reach and bring the Christian faith to more people through enhanced tools and resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-center">Your contribution helps us achieve:</h4>
            <ul className="space-y-2">
              {[
                "More Bible study sessions for every user",
                "A larger and more capable ministry team",
                "Expanded priority prayer support",
                "Better study tools and advanced resources",
                "Deeper, personalized spiritual guidance"
              ].map((feature, i) => (
                <li key={i} className="flex items-center justify-center gap-2 text-gray-600">
                  <Star className="w-4 h-4 text-[#0EA5E9]" /> {feature}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-gray-500 italic text-center">
            Be a part of something greater and help us spread faith, hope, and love to more people
          </p>
          <SubscriptionButton />
          <Button 
            onClick={handlePrayerRequest}
            className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white"
          >
            Try a Prayer Request
          </Button>
        </div>
      </CardContent>

      {showPrayerWidget && scriptLoaded && (
        <CharacterWidget
          widgetId="d1CQmaU4op8GfEiw8o6k"
          onClose={() => setShowPrayerWidget(false)}
        />
      )}
    </Card>
  );
};

export default PremiumFeatures;