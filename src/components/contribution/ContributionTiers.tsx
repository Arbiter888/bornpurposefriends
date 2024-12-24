import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import TierCard from "./TierCard";
import CharityCard from "./CharityCard";
import { Church, Users, BookOpen, Heart } from "lucide-react";

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
      name: "Church Partner Basic",
      amount: 25,
      icon: <Church className="w-6 h-6 text-primary" />,
      description: "Support your local church while accessing essential digital ministry tools",
      churchBenefits: [
        "50% of donation goes to partner church",
        "Support church community programs",
        "Help maintain church facilities"
      ],
      platformBenefits: [
        "Access to AI Ministry Team",
        "Basic Bible Study Planner",
        "Prayer Request Support",
        "Community Features"
      ]
    },
    {
      name: "Church Partner Plus",
      amount: 50,
      icon: <Users className="w-6 h-6 text-primary" />,
      isPopular: true,
      description: "Enhanced support for your church with advanced ministry capabilities",
      churchBenefits: [
        "60% of donation goes to partner church",
        "Fund youth and children's programs",
        "Support church outreach initiatives"
      ],
      platformBenefits: [
        "Full AI Ministry Team Access",
        "Advanced Study Planning Tools",
        "Priority Prayer Support",
        "Group Study Features"
      ]
    },
    {
      name: "Church Partner Premium",
      amount: 100,
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      description: "Maximum impact for your church with comprehensive ministry tools",
      churchBenefits: [
        "70% of donation goes to partner church",
        "Support global mission work",
        "Fund major church initiatives"
      ],
      platformBenefits: [
        "Unlimited AI Ministry Access",
        "Custom Study Programs",
        "24/7 Prayer Support",
        "Advanced Analytics"
      ]
    }
  ];

  return (
    <div className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm" />
      <div className="relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Partner With Churches Through Technology</h2>
          <p className="text-white/90 max-w-2xl mx-auto bg-black/30 p-4 rounded-lg backdrop-blur-sm">
            Your monthly contribution supports both local churches and digital ministry. A significant portion of your 
            donation goes directly to our partner churches, while also giving you access to our advanced ministry platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => (
            <Card key={tier.name} className="p-6 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                {tier.icon}
                <h3 className="text-xl font-bold">{tier.name}</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-4">
                £{tier.amount}
                <span className="text-base text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">{tier.description}</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <Church className="h-5 w-5 text-primary" />
                    Church Impact:
                  </h4>
                  <ul className="space-y-2">
                    {tier.churchBenefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Heart className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Platform Features:
                  </h4>
                  <ul className="space-y-2">
                    {tier.platformBenefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Heart className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                onClick={() => handleContribute(tier.amount)}
              >
                Choose {tier.name}
              </Button>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <Card className="p-6 bg-white/95 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-center mb-6">Custom Monthly Amount</h3>
            <p className="text-gray-600 text-center mb-6">
              60% of your custom donation will go to our partner church
            </p>
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
          <h3 className="text-2xl font-bold text-center mb-4 text-white">Support Partner Charities</h3>
          <p className="text-center text-white/90 mb-8 bg-black/30 p-4 rounded-lg backdrop-blur-sm max-w-2xl mx-auto">
            Make one-time donations to our partner charities making a difference in communities worldwide
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
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
            ].map((charity) => (
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