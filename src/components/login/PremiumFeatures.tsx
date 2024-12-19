import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SubscriptionButton from "@/components/SubscriptionButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CharacterWidget } from "../character/CharacterWidget";
import { characters } from "@/lib/characters";

const PremiumFeatures = () => {
  const [showPrayerWidget, setShowPrayerWidget] = useState(false);

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Join Our Mission</CardTitle>
        <CardDescription>
          Help us expand our reach and bring the Christian faith to more people through enhanced tools and resources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600">
            Your contribution helps us achieve:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              More Bible study sessions for every user
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              A larger and more capable ministry team
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              Expanded priority prayer support
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              Better study tools and advanced resources
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              Deeper, personalized spiritual guidance
            </li>
          </ul>
          <p className="text-gray-600">
            Be a part of something greater and help us spread faith, hope, and love to more people
          </p>
          <div className="space-y-3">
            <SubscriptionButton />
            <Button 
              onClick={() => setShowPrayerWidget(true)}
              className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white"
            >
              Try a Prayer Request
            </Button>
          </div>
        </div>
      </CardContent>

      {showPrayerWidget && (
        <CharacterWidget
          widgetId={characters[0].widgetId}
          onClose={() => setShowPrayerWidget(false)}
        />
      )}
    </Card>
  );
};

export default PremiumFeatures;