import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Trash2 } from "lucide-react";

const PaymentMethodsSection = () => {
  const session = useSession();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [savedCards, setSavedCards] = useState<any[]>([]);

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate card addition - in reality, this would involve Stripe
    const last4 = cardNumber.slice(-4);
    try {
      const { error } = await supabase
        .from('payment_methods')
        .insert({
          user_id: session?.user.id,
          card_last4: last4,
          card_brand: 'visa', // Simulated
          card_exp_month: parseInt(expiryMonth),
          card_exp_year: parseInt(expiryYear),
          is_default: savedCards.length === 0
        });

      if (error) throw error;

      toast.success("Card added successfully");
      setIsAddingCard(false);
      setCardNumber("");
      setExpiryMonth("");
      setExpiryYear("");
      setCvc("");
      fetchCards();
    } catch (error) {
      console.error('Error adding card:', error);
      toast.error("Failed to add card");
    }
  };

  const fetchCards = async () => {
    if (!session) return;
    
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedCards(data || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast.error("Failed to load payment methods");
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', cardId);

      if (error) throw error;
      toast.success("Card removed successfully");
      fetchCards();
    } catch (error) {
      console.error('Error removing card:', error);
      toast.error("Failed to remove card");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Methods
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAddingCard ? (
          <form onSubmit={handleAddCard} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={16}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryMonth">Month</Label>
                <Input
                  id="expiryMonth"
                  placeholder="MM"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  maxLength={2}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryYear">Year</Label>
                <Input
                  id="expiryYear"
                  placeholder="YY"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  maxLength={2}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={3}
                  required
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsAddingCard(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Card</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {savedCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">
                      {card.card_brand.toUpperCase()} •••• {card.card_last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {card.card_exp_month}/{card.card_exp_year}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setIsAddingCard(true)}
              className="w-full"
            >
              Add New Card
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsSection;