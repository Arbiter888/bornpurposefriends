import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, History, CreditCard, Church } from "lucide-react";
import ContributionTiers from "../contribution/ContributionTiers";
import PaymentMethodsSection from "../profile/PaymentMethodsSection";
import ContributionHistory from "../profile/ContributionHistory";
import ChurchUpdates from "./ChurchUpdates";

const GivingDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Giving Dashboard</h1>
      
      <Tabs defaultValue="give" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
          <TabsTrigger value="give" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Give
          </TabsTrigger>
          <TabsTrigger value="payment-methods" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="updates" className="flex items-center gap-2">
            <Church className="h-4 w-4" />
            Updates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="give">
          <ContributionTiers />
        </TabsContent>

        <TabsContent value="payment-methods">
          <PaymentMethodsSection />
        </TabsContent>

        <TabsContent value="history">
          <ContributionHistory />
        </TabsContent>

        <TabsContent value="updates">
          <ChurchUpdates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GivingDashboard;