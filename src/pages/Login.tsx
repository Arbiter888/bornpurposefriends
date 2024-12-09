import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import SubscriptionButton from "@/components/SubscriptionButton";
import { characters } from "@/lib/characters";
import { motion } from "framer-motion";
import { Lock, Sparkle, Star, Crown } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2A2F3C] overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch relative">
          {/* Character Preview Section */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-8 h-8 text-[#FFD700]" />
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                  Featured Companions
                </h1>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Sparkle className="w-5 h-5 text-[#FFA500]" />
                <p className="text-lg text-gray-300">
                  Experience personalized growth through advanced neural-linked conversations
                </p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              {characters.slice(0, 4).map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="aspect-square relative overflow-hidden rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    {character.id !== 'atlas' && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
                        <Lock className="w-8 h-8 mb-2 text-[#FFD700]" />
                        <span className="text-sm font-semibold">Premium Only</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#FFD700]" />
                        <h3 className="text-xl font-bold">{character.name}</h3>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{character.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Auth & Subscription Section */}
          <div className="h-full flex flex-col justify-between font-['Tomorrow']">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-xl"
            >
              <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-white">Welcome to BornPurpose</h2>
                <p className="text-gray-400 mt-2">Sign in to access your AI companions</p>
              </div>
              
              <Auth 
                supabaseClient={supabase}
                appearance={{ 
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#FFD700',
                        brandAccent: '#FFA500',
                        brandButtonText: '#1A1F2C',
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
                theme="dark"
                providers={[]}
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-xl mt-8"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Crown className="w-6 h-6 text-[#FFD700]" />
                  <h3 className="text-xl font-semibold text-white">Premium Access</h3>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Unlock unlimited conversations with all AI companions and experience personalized growth through advanced neural-linked interactions
                </p>
                <div className="space-y-4 mb-6">
                  <div className="text-sm">
                    <h4 className="font-semibold mb-2 text-white">What's included:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-center gap-2 text-gray-300">
                        <Star className="w-4 h-4 text-[#FFD700]" /> Unlimited character interactions
                      </li>
                      <li className="flex items-center justify-center gap-2 text-gray-300">
                        <Star className="w-4 h-4 text-[#FFD700]" /> Premium character access
                      </li>
                      <li className="flex items-center justify-center gap-2 text-gray-300">
                        <Star className="w-4 h-4 text-[#FFD700]" /> Priority support
                      </li>
                      <li className="flex items-center justify-center gap-2 text-gray-300">
                        <Star className="w-4 h-4 text-[#FFD700]" /> Advanced conversation features
                      </li>
                      <li className="flex items-center justify-center gap-2 text-gray-300">
                        <Star className="w-4 h-4 text-[#FFD700]" /> Customizable AI responses
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-400 italic">
                    Join our premium members and unlock the full potential of AI companionship
                  </p>
                </div>
                <SubscriptionButton />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;