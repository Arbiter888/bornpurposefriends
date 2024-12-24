import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Heart, Church, Gift } from "lucide-react";

const ContributionTiers = () => {
  const [customAmount, setCustomAmount] = useState("");
  const session = useSession();

  const calculateImpact = (amount: number) => {
    return [
      `Support ${Math.max(1, Math.floor(amount / 5))} prayer group sessions`,
      `Contribute to ${Math.max(1, Math.floor(amount / 10))} community outreach meals`,
      `Help provide ${Math.max(1, Math.floor(amount / 15))} Alpha course materials`,
      `Support ${Math.max(1, Math.floor(amount / 20))} youth ministry activities`,
    ];
  };

  const handleContribute = async (amount: number, isRecurring: boolean = false, charityId?: string) => {
    if (!session) {
      toast.error("Please sign in to contribute");
      return;
    }

    try {
      const { error } = await supabase
        .from('contributions')
        .insert({
          user_id: session.user.id,
          amount,
          is_recurring: isRecurring,
          charity_id: charityId,
          status: 'pending'
        });

      if (error) throw error;

      toast.success(`Thank you for your ${isRecurring ? 'monthly' : 'one-time'} contribution of £${amount}`);
    } catch (error) {
      console.error('Error making contribution:', error);
      toast.error("Failed to process contribution. Please try again.");
    }
  };

  const tiers = [
    {
      name: "Friend",
      amount: 10,
      description: "Support our community's growth",
      features: calculateImpact(10)
    },
    {
      name: "Partner",
      amount: 25,
      description: "Help us reach more people",
      features: calculateImpact(25)
    },
    {
      name: "Steward",
      amount: 50,
      description: "Make a significant impact",
      features: calculateImpact(50)
    }
  ];

  const charities = [
    {
      name: "Tearfund",
      description: "Supporting communities in poverty"
    },
    {
      name: "Christians Against Poverty",
      description: "Breaking the cycle of poverty"
    },
    {
      name: "Open Doors",
      description: "Supporting persecuted Christians"
    }
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Support Our Ministry</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join us in spreading God's love through your generous contributions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {tiers.map((tier) => (
          <Card key={tier.name} className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-600 mb-4">{tier.description}</p>
              <div className="text-3xl font-bold text-primary">£{tier.amount}/month</div>
            </div>
            <ul className="space-y-3 mb-6">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => handleContribute(tier.amount, true)}
            >
              Contribute Monthly
            </Button>
          </Card>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mb-16">
        <Card className="p-6">
          <h3 className="text-2xl font-bold text-center mb-6">Custom Contribution</h3>
          <div className="flex gap-4 mb-6">
            <Input
              type="number"
              min="1"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="text-lg"
            />
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => handleContribute(Number(customAmount), true)}
            >
              Contribute Monthly
            </Button>
          </div>
          {customAmount && Number(customAmount) > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-lg mb-2">Your Impact:</h4>
              {calculateImpact(Number(customAmount)).map((impact, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{impact}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-8">Support Our Partner Charities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {charities.map((charity) => (
            <Card key={charity.name} className="p-6 text-center">
              <Church className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2">{charity.name}</h4>
              <p className="text-gray-600 mb-4">{charity.description}</p>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => handleContribute(25, false)}
              >
                <Gift className="mr-2 h-4 w-4" />
                Make One-time Gift
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionTiers;