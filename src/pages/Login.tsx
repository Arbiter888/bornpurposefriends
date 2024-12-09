import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import SubscriptionButton from "@/components/SubscriptionButton";

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-card p-8 rounded-xl shadow-lg space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome to BornPurpose</h2>
            <p className="text-muted-foreground mt-2">Sign in to access premium characters</p>
          </div>
          
          <Auth 
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
          />
        </div>

        <div className="bg-card p-8 rounded-xl shadow-lg space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Premium Access</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get unlimited access to all AI characters and premium features
            </p>
            <ul className="text-sm space-y-2 mb-6">
              <li className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span> Unlimited character interactions
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span> Premium character access
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span> Priority support
              </li>
            </ul>
            <SubscriptionButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;