
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { DisclaimerDialog } from "./auth/DisclaimerDialog";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useUser();
  const [disclaimerAccepted, setDisclaimerAccepted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDisclaimerAcceptance = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await supabase
          .from('profiles')
          .select('disclaimer_accepted')
          .eq('id', user.id)
          .single();

        setDisclaimerAccepted(!!data?.disclaimer_accepted);
      } catch (error) {
        console.error('Error checking disclaimer acceptance:', error);
        setDisclaimerAccepted(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkDisclaimerAcceptance();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!disclaimerAccepted) {
    return <DisclaimerDialog />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
