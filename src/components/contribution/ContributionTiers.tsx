import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import TierCard from "./TierCard";
import CharityCard from "./CharityCard";

const tiers = [
  {
    name: "Seed Level",
    price: "25",
    description: "Support HTB's mission while accessing BornPurpose premium features",
    features: [
      "Full BornPurpose Premium Access",
      "All AI Ministry Companions",
      "Group Bible Study Features",
      "Prayer Wall Access",
    ],
    impacts: [
      "Support Alpha courses for 2 participants",
      "Provide resources for HTB's youth ministry",
      "Contribute to church community programs",
    ],
  },
  {
    name: "Growth Level",
    price: "50",
    description: "Expanded impact with enhanced features",
    features: [
      "All Seed Level Features",
      "Priority Prayer Support",
      "Advanced Study Tools",
      "Extended Chat Sessions",
    ],
    impacts: [
      "Fund Alpha materials for 5 participants",
      "Support HTB's community outreach programs",
      "Help maintain church facilities",
    ],
    featured: true,
  },
  {
    name: "Harvest Level",
    price: "100",
    description: "Maximum kingdom impact with full features",
    features: [
      "All Growth Level Features",
      "Quarterly Ministry Team Meetings",
      "Custom Study Plans",
      "Priority Support",
    ],
    impacts: [
      "Sponsor a complete Alpha small group",
      "Support HTB's global mission work",
      "Fund youth and children's programs",
    ],
  },
];

const charities = [
  {
    name: "Kids Matter",
    description: "Supporting parents in prisons, schools, and communities",
    link: "https://kidsmatter.org.uk",
  },
  {
    name: "Compassion",
    description: "Helping children escape poverty",
    link: "https://www.compassion.org.uk",
  },
  {
    name: "World Vision",
    description: "Protecting children in dangerous places",
    link: "https://www.worldvision.org.uk",
  },
];

const ContributionTiers = () => {
  const session = useSession();

  const handleSubscribe = (tier: string, price: string) => {
    if (!session) {
      toast.error("Please sign in to contribute");
      return;
    }
    toast.info(`Processing ${tier} contribution...`);
  };

  const handleOneOffDonation = (charity: string, link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="py-16 bg-gradient-to-b from-background to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Monthly Kingdom Impact
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Support HTB's mission while getting full access to BornPurpose premium features.
            Every contribution helps expand our reach and impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => (
            <TierCard
              key={tier.name}
              {...tier}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>

        <div className="text-center mb-8 animate-fade-up">
          <h2 className="text-3xl font-bold mb-4">One-off Donations to Partner Charities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
            Support HTB's partner charities making a difference in children's lives around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {charities.map((charity) => (
            <CharityCard
              key={charity.name}
              {...charity}
              onDonate={handleOneOffDonation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionTiers;
