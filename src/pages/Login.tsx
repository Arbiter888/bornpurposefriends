import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import SubscriptionButton from "@/components/SubscriptionButton";
import { characters } from "@/lib/characters";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Character Preview Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#8B0000] to-[#FF0000] bg-clip-text text-transparent">
                Featured Companions
              </h1>
            </div>

            <p className="text-lg text-left mb-8 leading-relaxed">
              Experience personalized growth through advanced neural-linked conversations with our AI companions. Connect across multiple languages and cultures for meaningful interactions.
            </p>
            
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              {characters.slice(0, 4).map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="aspect-square relative overflow-hidden rounded-lg bg-black">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    {character.id !== 'atlas' && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                        <Lock className="w-8 h-8 mb-2 text-[#FF0000]" />
                        <span className="text-sm font-semibold">Premium Only</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{character.name}</h3>
                      <p className="text-sm text-gray-300">{character.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Auth & Subscription Section */}
          <div className="space-y-8 font-['Tomorrow']">
            <div className="bg-card p-8 rounded-xl shadow-lg space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">Welcome to BornPurpose</h2>
                <p className="text-muted-foreground mt-2">Sign in to access your AI companions</p>
              </div>
              
              <Auth 
                supabaseClient={supabase}
                appearance={{ 
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#8B0000',
                        brandAccent: '#FF0000',
                      },
                      fonts: {
                        bodyFontFamily: 'Tomorrow, sans-serif',
                        buttonFontFamily: 'Tomorrow, sans-serif',
                        inputFontFamily: 'Tomorrow, sans-serif',
                        labelFontFamily: 'Tomorrow, sans-serif',
                      },
                    },
                  },
                }}
                theme="light"
                providers={[]}
              />
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Premium Access</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Unlock unlimited conversations with all AI companions
                </p>
                <ul className="text-sm space-y-2 mb-6">
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-[#FF0000]">✓</span> Unlimited character interactions
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-[#FF0000]">✓</span> Premium character access
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-[#FF0000]">✓</span> Priority support
                  </li>
                </ul>
                <SubscriptionButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;