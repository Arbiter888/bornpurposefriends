import { Check, Church, Heart, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
      className={cn(
        "relative transform transition-all duration-300 hover:scale-105",
        featured
          ? "border-primary shadow-lg scale-105"
          : "border-gray-200 hover:shadow-md"
      )}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center gap-2">
          {name}
          {featured && <TrendingUp className="h-5 w-5 text-primary animate-pulse" />}
        </CardTitle>
        <CardDescription className="flex items-baseline">
          <span className="text-3xl font-bold">£{price}</span>
          <span className="ml-1 text-gray-600">/month</span>
        </CardDescription>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* HTB Impact Section with enhanced visibility */}
        <div className="space-y-4 relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Church className="h-6 w-6 text-primary animate-fade-in" />
              <h4 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                HTB Impact:
              </h4>
            </div>
            <ul className="space-y-4">
              {impacts.map((impact, index) => (
                <li
                  key={impact}
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

        {/* BornPurpose Features Section */}
        <div className="space-y-4 pt-6 border-t border-gray-100">
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
          className={cn(
            "w-full transition-all duration-300",
            featured
              ? "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl"
              : "bg-primary hover:bg-primary/90"
          )}
          onClick={() => onSubscribe(name, price)}
        >
          Contribute Monthly
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TierCard;