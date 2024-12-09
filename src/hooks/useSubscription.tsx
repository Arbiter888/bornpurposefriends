import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

export const useSubscription = () => {
  const session = useSession();

  return useQuery({
    queryKey: ["subscription", session?.user?.id],
    queryFn: async () => {
      if (!session?.access_token) {
        return { subscribed: false };
      }

      const response = await fetch("/functions/v1/check-subscription", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to check subscription status");
      }

      return response.json();
    },
    enabled: !!session,
  });
};