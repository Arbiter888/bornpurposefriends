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
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

const tiers = [
  {
    name: "Seed Level",
    price: "25",
    description: "Make an impact while accessing premium features",
    features: [
      "Full BornPurpose Premium Access",
      "All AI Ministry Companions",
      "Group Bible Study Features",
      "Prayer Wall Access",
    ],
    impacts: [
      "20 meals for families in need",
      "Weekly children's Bible study materials for 5 kids",
      "Support for youth discipleship program",
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
      "Weekend meals for 10 struggling families",
      "Educational materials for after-school program",
      "Training materials for 2 new group leaders",
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
      "Monthly grocery assistance for 3 families",
      "Full scholarship for youth summer camp",
      "Resources for new community small group",
    ],
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
    // Stripe integration will be added here
  };

  return (
    <div className="py-12 bg-gradient-to-b from-background to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Kingdom Impact Tiers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us in making a difference. Every contribution includes full access to BornPurpose
            premium features while supporting vital church initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <span className="text-2xl font-bold">${tier.price}</span>
                  /month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Premium Features:</h4>
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
                  <h4 className="font-semibold mb-2">Your Impact:</h4>
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
      </div>
    </div>
  );
};

export default ContributionTiers;