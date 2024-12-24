import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import TierCard from "./TierCard";
import CharityCard from "./CharityCard";

const ContributionTiers = () => {
  const [customAmount, setCustomAmount] = useState("");
  const session = useSession();

  const handleContribute = async (amount: number) => {
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
          is_recurring: true,
          status: 'pending'
        });

      if (error) throw error;
      toast.success(`Thank you for your monthly contribution of £${amount}`);
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

  const tiers = [
    {
      name: "Seed Level",
      amount: 25,
      htbImpacts: [
        "Support Alpha courses for 2 participants",
        "Provide resources for HTB's youth ministry",
        "Support church community programs"
      ],
      bornPurposeFeatures: [
        "Full BornPurpose Premium Access",
        "Group Bible Study Features",
        "Prayer Wall Access",
        "All AI Ministry Companions"
      ]
    },
    {
      name: "Growth Level",
      amount: 50,
      isPopular: true,
      htbImpacts: [
        "Fund Alpha materials for 5 participants",
        "Support HTB's community outreach programs",
        "Help maintain church facilities"
      ],
      bornPurposeFeatures: [
        "Full BornPurpose Premium Access",
        "Priority Prayer Support",
        "Advanced Study Tools",
        "Extended Chat Sessions"
      ]
    },
    {
      name: "Harvest Level",
      amount: 100,
      htbImpacts: [
        "Sponsor a complete Alpha small group",
        "Support HTB's global mission work",
        "Fund youth and children's programs"
      ],
      bornPurposeFeatures: [
        "Full BornPurpose Premium Access",
        "Quarterly Ministry Team Meetings",
        "Custom Study Plans",
        "Priority Support"
      ]
    }
  ];

  const charities = [
    {
      name: "Kids Matter",
      description: "Supporting parents in prisons, schools, and communities"
    },
    {
      name: "Compassion",
      description: "Helping children escape poverty"
    },
    {
      name: "World Vision",
      description: "Protecting children in dangerous places"
    }
  ];

  return (
    <div className="py-16 relative">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xs" />
      <div className="relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Monthly Kingdom Impact</h2>
          <p className="text-white/90 max-w-2xl mx-auto bg-black/30 p-4 rounded-lg backdrop-blur-sm">
            Support HTB's mission while getting full access to BornPurpose premium features. 
            Every contribution helps expand our reach and impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => (
            <TierCard
              key={tier.name}
              {...tier}
              onContribute={handleContribute}
            />
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <Card className="p-6 bg-white/95 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-center mb-6">Custom Monthly Amount</h3>
            <div className="flex gap-4">
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
                onClick={() => handleContribute(Number(customAmount))}
              >
                Contribute Monthly
              </Button>
            </div>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-center mb-4 text-white">One-off Donations to Partner Charities</h3>
          <p className="text-center text-white/90 mb-8 bg-black/30 p-4 rounded-lg backdrop-blur-sm max-w-2xl mx-auto">
            Support HTB's partner charities making a difference in children's lives around the world
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {charities.map((charity) => (
              <CharityCard
                key={charity.name}
                {...charity}
                onDonate={() => handleDonateToCharity(charity.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionTiers;