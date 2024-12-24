import Hero from "@/components/Hero";
import CharacterGrid from "@/components/CharacterGrid";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { HomeBackgroundSelector } from "@/components/home/HomeBackgroundSelector";
import ContributionTiers from "@/components/contribution/ContributionTiers";
import PartnerChurchSection from "@/components/PartnerChurchSection";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const session = useSession();
  const [background, setBackground] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!session) {
    return null;
  }

  return (
    <ScrollArea className="h-screen">
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
          <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <HomeBackgroundSelector onSelect={handleBackgroundChange} />
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.header>

          <main className="space-y-16 pb-16">
            <Hero />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CharacterGrid />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <PartnerChurchSection />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ContributionTiers />
            </motion.div>
          </main>

          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp className="h-6 w-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Index;