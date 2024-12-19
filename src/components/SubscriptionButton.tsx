import { useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

const SubscriptionButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const handleSubscribe = async () => {
    if (!session) {
      toast.error("Please sign in to contribute");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/functions/v1/create-checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const { url, error } = await response.json();
      
      if (error) {
        throw new Error(error);
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Contribution error:", error);
      toast.error("Failed to process contribution. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSubscribe} 
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
    >
      {isLoading ? "Processing..." : "Contribute Now"}
    </Button>
  );
};

export default SubscriptionButton;