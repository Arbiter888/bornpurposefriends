import { useSubscription } from "@/hooks/useSubscription";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import SubscriptionButton from "./SubscriptionButton";

interface PaywallWrapperProps {
  children: React.ReactNode;
}

const PaywallWrapper = ({ children }: PaywallWrapperProps) => {
  const session = useSession();
  const { data, isLoading } = useSubscription();

  if (!session) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data?.subscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="bg-card p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Premium Content</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to access all premium features and characters
            </p>
            <SubscriptionButton />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PaywallWrapper;