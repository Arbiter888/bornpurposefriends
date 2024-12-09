import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import SubscriptionButton from "@/components/SubscriptionButton";
import { characters } from "@/lib/characters";
import { motion } from "framer-motion";

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
        {/* Hero Section with Character Previews */}
        <div className="text-center mb-16 relative">
          <div className="flex justify-center gap-4 mb-8">
            {characters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#FF0000] transform transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap"
                >
                  {character.name}
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#8B0000] to-[#FF0000] bg-clip-text text-transparent">
            Meet Your AI Companions
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Step into 2040 where AI companions enhance every aspect of your life. Connect with unique personalities designed to inspire, support, and grow with you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Character Preview */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8B0000] to-[#FF0000] rounded-lg blur opacity-25"></div>
              <div className="relative bg-black p-6 rounded-lg space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Featured Companions</h2>
                <div className="grid grid-cols-2 gap-4">
                  {characters.slice(0, 4).map((character) => (
                    <motion.div
                      key={character.id}
                      className="relative group cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75 rounded-lg"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="font-semibold">{character.name}</p>
                        <p className="text-sm text-gray-300">{character.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#FF0000]"></div>
                    <p>Advanced neural-linked conversations</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#FF0000]"></div>
                    <p>Personalized growth & learning</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#FF0000]"></div>
                    <p>Multi-language support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Auth & Subscription Section */}
          <div className="space-y-8">
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