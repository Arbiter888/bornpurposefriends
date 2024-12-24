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
  const [amount, setAmount] = useState(25);

  const calculateImpact = (value: number) => {
    // Scaled impacts starting from small contributions
    return [
      `Support ${Math.max(1, Math.floor(value / 5))} prayer group sessions`,
      `Contribute to ${Math.max(1, Math.floor(value / 10))} community outreach meals`,
      `Help provide ${Math.max(1, Math.floor(value / 15))} Alpha course materials`,
      `Support ${Math.max(1, Math.floor(value / 20))} youth ministry activities`,
    ];
  };

  const impacts = calculateImpact(amount);

  return (
    <Card className="relative transform transition-all duration-300 hover:scale-105 border-primary/20 shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl flex items-center gap-2 justify-center">
          Your Monthly Blessing
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
        </CardTitle>
        <CardDescription className="text-center">
          <p className="text-sm text-gray-600 mb-2">Every contribution makes a difference in God's kingdom</p>
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
            Choose your monthly blessing amount:
          </label>
          <Slider
            value={[amount]}
            onValueChange={(values) => setAmount(values[0])}
            min={5}
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
            <h4 className="font-semibold text-lg">Included Blessings:</h4>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {[
              "Full BornPurpose Access",
              "Prayer Community",
              "Bible Study Tools",
              "Ministry Support",
              "Spiritual Growth Resources",
              "Community Connection",
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