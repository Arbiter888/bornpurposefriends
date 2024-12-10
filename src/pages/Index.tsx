import Hero from "@/components/Hero";
import CharacterGrid from "@/components/CharacterGrid";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) {
        throw error;
      }
      toast({
        title: "Logged out successfully",
        duration: 2000,
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error logging out",
        description: "Please try again",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
      <Hero />
      <CharacterGrid />
      
      <div className="container mx-auto px-4 py-8">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full"
        >
          <CollapsibleTrigger className="w-full bg-card hover:bg-card/80 p-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <span className="text-lg font-semibold">
              {isOpen ? "Hide Character Generator Demo" : "Generate Character Demo"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            {/* Character Generator content removed as per revert */}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default Index;