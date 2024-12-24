import { Check, Church, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  impacts: string[];
  featured?: boolean;
  onSubscribe: (tier: string, price: string) => void;
}

const TierCard = ({
  name,
  price,
  description,
  features,
  impacts,
  featured,
  onSubscribe,
}: TierProps) => {
  return (
    <Card
      className={`relative transform transition-all duration-300 hover:scale-105 ${
        featured
          ? "border-primary shadow-lg scale-105"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="flex items-baseline">
          <span className="text-3xl font-bold">£{price}</span>
          <span className="ml-1 text-gray-600">/month</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* HTB Impact Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Church className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-lg">HTB Impact:</h4>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg" />
            <ul className="space-y-3 relative">
              {impacts.map((impact) => (
                <li key={impact} className="flex items-start gap-2 group">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                    {impact}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BornPurpose Features Section */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary" />
            <h4 className="font-semibold text-lg">BornPurpose Features:</h4>
          </div>
          <ul className="space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-secondary/70 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full transition-colors ${
            featured
              ? "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              : "bg-primary hover:bg-primary/90"
          }`}
          onClick={() => onSubscribe(name, price)}
        >
          Contribute Monthly
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TierCard;