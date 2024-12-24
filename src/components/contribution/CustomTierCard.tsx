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
    return [
      `Support ${Math.floor(value / 25)} Alpha participants`,
      `Fund ${Math.floor(value / 50)} youth ministry sessions`,
      `Enable ${Math.floor(value / 30)} community outreach events`,
      `Support ${Math.floor(value / 40)} worship services`,
    ];
  };

  const impacts = calculateImpact(amount);

  return (
    <Card className="relative transform transition-all duration-300 hover:scale-105 border-primary/20 shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl flex items-center gap-2 justify-center">
          Choose Your Impact
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
        </CardTitle>
        <CardDescription className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold mt-2">
            <span className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              £{amount}
            </span>
            <span className="text-gray-600 text-base">/month</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <label className="text-sm text-gray-600 block text-center">
            Adjust your monthly contribution:
          </label>
          <Slider
            value={[amount]}
            onValueChange={(values) => setAmount(values[0])}
            min={25}
            max={500}
            step={5}
            className="w-full"
          />
        </div>

        <div className="space-y-4 p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <Church className="h-6 w-6 text-primary" />
            <h4 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Your Kingdom Impact:
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

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary" />
            <h4 className="font-semibold text-lg">All Premium Features Included:</h4>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {[
              "Full BornPurpose Access",
              "All AI Companions",
              "Priority Support",
              "Advanced Study Tools",
              "Extended Sessions",
              "Ministry Team Meetings",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary/70 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl text-lg py-6"
          onClick={() => onSubscribe(amount.toString())}
        >
          Contribute £{amount} Monthly
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomTierCard;