import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { History } from "lucide-react";
import { toast } from "sonner";

const ContributionHistory = () => {
  const session = useSession();
  const [contributions, setContributions] = useState<any[]>([]);

  useEffect(() => {
    if (session) {
      fetchContributions();
    }
  }, [session]);

  const fetchContributions = async () => {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('*, charities(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContributions(data || []);
    } catch (error) {
      console.error('Error fetching contributions:', error);
      toast.error("Failed to load contribution history");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Contribution History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contributions.length === 0 ? (
            <p className="text-center text-gray-500">No contributions yet</p>
          ) : (
            contributions.map((contribution) => (
              <div
                key={contribution.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    £{contribution.amount}
                    {contribution.is_recurring && " (Monthly)"}
                  </p>
                  {contribution.charities && (
                    <p className="text-sm text-gray-500">
                      To: {contribution.charities.name}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    {new Date(contribution.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    contribution.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {contribution.status}
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionHistory;