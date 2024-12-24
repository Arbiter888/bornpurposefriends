import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import CustomTierCard from "./CustomTierCard";
import { Button } from "@/components/ui/button";
import { Church, Heart } from "lucide-react";

const PRESET_AMOUNTS = [
  {
    amount: "10",
    impacts: [
      "Support 2 prayer group sessions",
      "Contribute to community meals",
      "Help provide Alpha materials",
    ],
  },
  {
    amount: "25",
    impacts: [
      "Support 5 prayer group sessions",
      "Provide meals for 2 community events",
      "Fund Alpha materials for 2 participants",
    ],
  },
  {
    amount: "50",
    impacts: [
      "Support 10 prayer group sessions",
      "Fund a month of youth activities",
      "Provide Alpha materials for 3 participants",
    ],
  },
];

const ContributionTiers = () => {
  const session = useSession();

  const handleSubscribe = (amount: string) => {
    if (!session) {
      toast.error("Please sign in to contribute");
      return;
    }
    toast.info(`Processing £${amount} contribution...`);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-background to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Church className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Join Us in Ministry
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
            Every contribution, no matter the size, helps spread God's love and supports our ministry's mission. Together, we can make a difference in His kingdom.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <CustomTierCard onSubscribe={handleSubscribe} />
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-4">Quick Select Blessings</h3>
          <p className="text-gray-600 mb-8">Choose from our suggested monthly contributions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PRESET_AMOUNTS.map((tier) => (
            <div
              key={tier.amount}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-center mb-4">
                <span className="text-2xl font-bold">£{tier.amount}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <div className="space-y-3">
                {tier.impacts.map((impact, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Heart
                      className="h-5 w-5 text-primary flex-shrink-0 mt-1"
                      fill="#9b87f5"
                      opacity={0.2}
                    />
                    <span className="text-sm text-gray-700">{impact}</span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-6 bg-gradient-to-r from-primary/90 to-secondary/90 hover:from-primary hover:to-secondary"
                onClick={() => handleSubscribe(tier.amount)}
              >
                Contribute £{tier.amount}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionTiers;