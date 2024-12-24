import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Building2, Check, ChevronRight, Gift, Home, Sparkles } from "lucide-react";

const ContributionTiers = () => {
  const [customAmount, setCustomAmount] = useState("");
  const session = useSession();

  const handleContribute = async (amount: number, isRecurring: boolean = true) => {
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
          status: 'pending'
        });

      if (error) throw error;

      toast.success(`Thank you for your ${isRecurring ? 'monthly' : 'one-time'} contribution of £${amount}`);
    } catch (error) {
      console.error('Error making contribution:', error);
      toast.error("Failed to process contribution. Please try again.");
    }
  };

  const handleDonateToCharity = async (charityName: string) => {
    if (!session) {
      toast.error("Please sign in to donate");
      return;
    }

    try {
      const { data: charities } = await supabase
        .from('charities')
        .select('id')
        .eq('name', charityName)
        .single();

      if (charities) {
        const { error } = await supabase
          .from('contributions')
          .insert({
            user_id: session.user.id,
            amount: 25,
            charity_id: charities.id,
            is_recurring: false,
            status: 'pending'
          });

        if (error) throw error;
        toast.success(`Thank you for your donation to ${charityName}`);
      }
    } catch (error) {
      console.error('Error donating to charity:', error);
      toast.error("Failed to process donation. Please try again.");
    }
  };

  const calculateImpact = (amount: number) => ({
    htbImpact: [
      amount >= 100 ? "Sponsor a complete Alpha small group" : amount >= 50 ? "Fund Alpha materials for 5 participants" : "Support Alpha courses for 2 participants",
      amount >= 100 ? "Support HTB's global mission work" : amount >= 50 ? "Support HTB's community outreach programs" : "Provide resources for HTB's youth ministry",
      amount >= 100 ? "Fund youth and children's programs" : amount >= 50 ? "Help maintain church facilities" : "Contribute to church community programs"
    ],
    bornPurposeFeatures: [
      "Full BornPurpose Premium Access",
      amount >= 100 ? "Quarterly Ministry Team Meetings" : amount >= 50 ? "Priority Prayer Support" : "Group Bible Study Features",
      amount >= 100 ? "Custom Study Plans" : amount >= 50 ? "Advanced Study Tools" : "Prayer Wall Access",
      amount >= 100 ? "Priority Support" : amount >= 50 ? "Extended Chat Sessions" : "All AI Ministry Companions"
    ]
  });

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Monthly Kingdom Impact</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Support HTB's mission while getting full access to BornPurpose premium features. 
          Every contribution helps expand our reach and impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { name: "Seed Level", amount: 25 },
          { name: "Growth Level", amount: 50, popular: true },
          { name: "Harvest Level", amount: 100 }
        ].map((tier) => {
          const impact = calculateImpact(tier.amount);
          return (
            <Card key={tier.name} className={`p-6 relative ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-primary mb-2">
                  £{tier.amount}
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
                    {impact.htbImpact.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{item}</span>
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
                    {impact.bornPurposeFeatures.map((feature, i) => (
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
                onClick={() => handleContribute(tier.amount, true)}
              >
                Contribute Monthly
              </Button>
            </Card>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto mb-16">
        <Card className="p-6">
          <h3 className="text-2xl font-bold text-center mb-6">Custom Monthly Amount</h3>
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
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  Your HTB Impact:
                </h4>
                <ul className="space-y-2">
                  {calculateImpact(Number(customAmount)).htbImpact.map((impact, i) => (
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
                  Your BornPurpose Features:
                </h4>
                <ul className="space-y-2">
                  {calculateImpact(Number(customAmount)).bornPurposeFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-center mb-4">One-off Donations to Partner Charities</h3>
        <p className="text-center text-gray-600 mb-8">
          Support HTB's partner charities making a difference in children's lives around the world
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Kids Matter", description: "Supporting parents in prisons, schools, and communities" },
            { name: "Compassion", description: "Helping children escape poverty" },
            { name: "World Vision", description: "Protecting children in dangerous places" }
          ].map((charity) => (
            <Card key={charity.name} className="p-6 text-center">
              <h4 className="text-xl font-semibold mb-2">{charity.name}</h4>
              <p className="text-gray-600 mb-6">{charity.description}</p>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => handleDonateToCharity(charity.name)}
              >
                <Gift className="mr-2 h-4 w-4" />
                Donate Now
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionTiers;