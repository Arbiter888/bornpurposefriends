import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SubscriptionButton from "@/components/SubscriptionButton";
import { characters } from "@/lib/characters";
import { motion } from "framer-motion";
import { Lock, Star } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Featured Companions */}
          <div className="space-y-8">
            <div>
              <h1 className="text-6xl font-bold text-[#990000] mb-4">
                Featured Companions
              </h1>
              <p className="text-lg text-gray-700">
                Experience personalized growth through advanced neural-linked conversations with our AI companions. Connect across multiple languages and cultures for meaningful interactions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {characters.slice(0, 4).map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    {character.id !== 'atlas' && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center">
                        <Lock className="w-8 h-8 mb-2 text-white" />
                        <span className="text-sm font-semibold text-white">Premium Only</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold">{character.name}</h3>
                      <p className="text-sm text-gray-300">{character.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Section - Login & Premium */}
          <div className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome to BornPurpose</CardTitle>
                <CardDescription>Sign in to access your AI companions</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email address</label>
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Password</label>
                    <Input
                      type="password"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#990000] text-white py-2 rounded-md hover:bg-[#800000] transition-colors"
                  >
                    Sign in
                  </button>
                  <div className="text-center space-y-2 text-sm">
                    <a href="#" className="text-gray-600 hover:underline block">
                      Forgot your password?
                    </a>
                    <a href="#" className="text-gray-600 hover:underline block">
                      Don't have an account? Sign up
                    </a>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <CardTitle>Premium Access</CardTitle>
                <CardDescription>
                  Unlock unlimited conversations with all AI companions and experience personalized growth through advanced neural-linked interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-center">What's included:</h4>
                    <ul className="space-y-2">
                      {[
                        "Unlimited character interactions",
                        "Premium character access",
                        "Priority support",
                        "Advanced conversation features",
                        "Customizable AI responses"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center justify-center gap-2 text-gray-600">
                          <Star className="w-4 h-4 text-[#990000]" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500 italic text-center">
                    Join our premium members and unlock the full potential of AI companionship
                  </p>
                  <SubscriptionButton />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;