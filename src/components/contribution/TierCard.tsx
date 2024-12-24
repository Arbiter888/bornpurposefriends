import { Building2, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TierProps {
  name: string;
  amount: number;
  isPopular?: boolean;
  htbImpacts: string[];
  bornPurposeFeatures: string[];
  onContribute: (amount: number) => void;
}

const TierCard = ({
  name,
  amount,
  isPopular,
  htbImpacts,
  bornPurposeFeatures,
  onContribute,
}: TierProps) => {
  return (
    <Card className={`p-6 relative bg-white/95 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all ${
      isPopular ? 'border-primary shadow-md' : ''
    }`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="text-3xl font-bold text-primary mb-4">
          £{amount}
          <span className="text-base text-gray-600">/month</span>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-3">
            <Building2 className="h-5 w-5 text-primary" />
            HTB Impact:
          </h4>
          <ul className="space-y-2">
            {htbImpacts.map((impact, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                <span className="text-gray-600">{impact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-primary" />
            BornPurpose Features:
          </h4>
          <ul className="space-y-2">
            {bornPurposeFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button 
        className="w-full bg-primary hover:bg-primary/90"
        onClick={() => onContribute(amount)}
      >
        Contribute Monthly
      </Button>
    </Card>
  );
};

export default TierCard;