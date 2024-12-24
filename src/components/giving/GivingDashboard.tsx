import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, History, CreditCard, Church } from "lucide-react";
import ContributionTiers from "../contribution/ContributionTiers";
import PaymentMethodsSection from "../profile/PaymentMethodsSection";
import ContributionHistory from "../profile/ContributionHistory";
import ChurchUpdates from "./ChurchUpdates";

const GivingDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Giving Dashboard</h1>
          
          <Tabs defaultValue="give" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto bg-gray-100/80">
              <TabsTrigger value="give" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Heart className="h-4 w-4" />
                Give
              </TabsTrigger>
              <TabsTrigger value="payment-methods" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <CreditCard className="h-4 w-4" />
                Payment
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="updates" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Church className="h-4 w-4" />
                Updates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="give">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <ContributionTiers />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment-methods">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <PaymentMethodsSection />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <ContributionHistory />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <ChurchUpdates />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GivingDashboard;