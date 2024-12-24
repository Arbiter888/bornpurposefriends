import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Church, Heart, Sparkles } from "lucide-react";

interface CustomTierProps {
  onSubscribe: (amount: string) => void;
}

const CustomTierCard = ({ onSubscribe }: CustomTierProps) => {
  const [amount, setAmount] = useState(75);

  const calculateImpact = (value: number) => {
    const baseImpacts = [
      "Support Alpha courses",
      "Provide youth ministry resources",
      "Contribute to community programs",
    ];

    const scaledImpacts = [
      `Support ${Math.floor(value / 25)} Alpha participants`,
      `Fund ${Math.floor(value / 50)} youth ministry sessions`,
      `Enable ${Math.floor(value / 30)} community outreach events`,
    ];

    return value >= 25 ? scaledImpacts : baseImpacts;
  };

  const impacts = calculateImpact(amount);

  return (
    <Card className="relative transform transition-all duration-300 hover:scale-105 border-primary shadow-lg">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          Custom Impact
        </span>
      </div>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center gap-2">
          Custom Level
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        </CardTitle>
        <CardDescription className="flex items-baseline">
          <span className="text-3xl font-bold">£{amount}</span>
          <span className="ml-1 text-gray-600">/month</span>
        </CardDescription>
        <p className="text-sm text-gray-600 mt-2">
          Choose your own contribution level and see your impact scale
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <label className="text-sm text-gray-600">Adjust your contribution:</label>
          <Slider
            value={[amount]}
            onValueChange={(values) => setAmount(values[0])}
            min={25}
            max={500}
            step={5}
            className="w-full"
          />
        </div>

        <div className="space-y-4 relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Church className="h-6 w-6 text-primary animate-fade-in" />
              <h4 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Your Impact:
              </h4>
            </div>
            <ul className="space-y-4">
              {impacts.map((impact, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 group animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Heart
                    className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                    fill="#9b87f5"
                    opacity={0.2}
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                    {impact}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary" />
            <h4 className="font-semibold text-lg">All Premium Features Included:</h4>
          </div>
          <ul className="space-y-2">
            {[
              "Full BornPurpose Premium Access",
              "All AI Ministry Companions",
              "Priority Prayer Support",
              "Advanced Study Tools",
              "Extended Chat Sessions",
              "Quarterly Ministry Team Meetings",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 text-secondary/70 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl"
          onClick={() => onSubscribe(amount.toString())}
        >
          Contribute Monthly
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomTierCard;