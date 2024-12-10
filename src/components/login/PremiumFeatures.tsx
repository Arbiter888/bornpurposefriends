import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SubscriptionButton from "@/components/SubscriptionButton";

const PremiumFeatures = () => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>Premium Access</CardTitle>
        <CardDescription>
          Unlock unlimited conversations with all AI companions and experience personalized growth through advanced neural-linked interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-center">What's included:</h4>
            <ul className="space-y-2">
              {[
                "Unlimited character interactions",
                "Premium character access",
                "Priority support",
                "Advanced conversation features",
                "Customizable AI responses"
              ].map((feature, i) => (
                <li key={i} className="flex items-center justify-center gap-2 text-gray-600">
                  <Star className="w-4 h-4 text-[#990000]" /> {feature}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-gray-500 italic text-center">
            Join our premium members and unlock the full potential of AI companionship
          </p>
          <SubscriptionButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumFeatures;