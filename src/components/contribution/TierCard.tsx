import { Check } from "lucide-react";
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
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-semibold text-lg">BornPurpose Features:</h4>
          <ul className="space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-lg">Your HTB Impact:</h4>
          <ul className="space-y-2">
            {impacts.map((impact) => (
              <li key={impact} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{impact}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-primary hover:bg-primary/90 transition-colors"
          onClick={() => onSubscribe(name, price)}
        >
          Contribute Monthly
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TierCard;