
import Hero from "@/components/Hero";
import CharacterGrid from "@/components/CharacterGrid";
import PartnerChurchSection from "@/components/PartnerChurchSection";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { HomeBackgroundSelector } from "@/components/home/HomeBackgroundSelector";
import SectionToggle from "@/components/home/SectionToggle";

const Index = () => {
  const navigate = useNavigate();
  const session = useSession();
  const [background, setBackground] = useState("/lovable-uploads/e5022c69-9adb-495b-bb18-b9710c0567c6.png");
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("bornpurpose");

  useEffect(() => {
    const checkSession = async () => {
      if (!session) {
        navigate("/login");
        return;
      }
      setIsLoading(false);
    };

    checkSession();
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div 
      className="min-h-screen text-foreground relative"
      style={{
        backgroundImage: activeSection === "bornpurpose" && background ? `url(${background})` : undefined,
        backgroundColor: activeSection === "bornpurpose" && !background ? "#FDF4F5" : 
                         activeSection === "htb" ? "#f5f7fa" : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {activeSection === "bornpurpose" && <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />}
      <div className="relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {activeSection === "bornpurpose" && (
              <HomeBackgroundSelector onSelect={handleBackgroundChange} />
            )}
            {activeSection === "htb" && <div />}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        <SectionToggle activeSection={activeSection} onSectionChange={setActiveSection} />
        
        {activeSection === "bornpurpose" ? (
          <>
            <Hero />
            <CharacterGrid />
          </>
        ) : (
          <PartnerChurchSection />
        )}
      </div>
    </div>
  );
};

export default Index;
