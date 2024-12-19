import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SubscriptionButton from "@/components/SubscriptionButton";

const PremiumFeatures = () => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>Premium Access</CardTitle>
        <CardDescription>
          Deepen your spiritual journey with unlimited access to our ministry team and enhanced Bible study features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-center">What's included:</h4>
            <ul className="space-y-2">
              {[
                "Unlimited Bible study sessions",
                "Access to all ministry team members",
                "Priority prayer support",
                "Advanced study tools and resources",
                "Personalized spiritual guidance"
              ].map((feature, i) => (
                <li key={i} className="flex items-center justify-center gap-2 text-gray-600">
                  <Star className="w-4 h-4 text-[#0EA5E9]" /> {feature}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-gray-500 italic text-center">
            Join our community of believers and enhance your spiritual growth journey
          </p>
          <SubscriptionButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumFeatures;