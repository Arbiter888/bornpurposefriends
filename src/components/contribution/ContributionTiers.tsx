import { Check, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

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
    <div className="py-12 bg-gradient-to-b from-background to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Monthly Kingdom Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Support HTB's mission while getting full access to BornPurpose premium features.
            Every contribution helps expand our reach and impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative ${
                tier.featured
                  ? "border-primary shadow-lg scale-105"
                  : "border-gray-200"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">£{tier.price}</span>
                  /month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">BornPurpose Features:</h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Your HTB Impact:</h4>
                  <ul className="space-y-2">
                    {tier.impacts.map((impact) => (
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
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleSubscribe(tier.name, tier.price)}
                >
                  Contribute Monthly
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">One-off Donations to Partner Charities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Support HTB's partner charities making a difference in children's lives around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {charities.map((charity) => (
            <Card key={charity.name} className="text-center">
              <CardHeader>
                <CardTitle>{charity.name}</CardTitle>
                <CardDescription>{charity.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleOneOffDonation(charity.name, charity.link)}
                >
                  <Gift className="mr-2" />
                  Donate Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionTiers;