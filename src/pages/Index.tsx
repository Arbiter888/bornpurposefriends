import Hero from "@/components/Hero";
import CharacterGrid from "@/components/CharacterGrid";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { HomeBackgroundSelector } from "@/components/home/HomeBackgroundSelector";

const Index = () => {
  const navigate = useNavigate();
  const session = useSession();
  const [background, setBackground] = useState("");

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut({ scope: 'local' });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackgroundChange = (newBackground: string) => {
    setBackground(newBackground);
    toast({
      title: "Background Updated",
      description: "Home background has been changed successfully",
    });
  };

  if (!session) {
    return null;
  }

  return (
    <div 
      className="min-h-screen text-foreground relative"
      style={{
        backgroundImage: background ? `url(${background})` : undefined,
        backgroundColor: background ? undefined : "#FDF4F5",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      <div className="relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <HomeBackgroundSelector onSelect={handleBackgroundChange} />
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
      </div>
    </div>
  );
};

export default Index;