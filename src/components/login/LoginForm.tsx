import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Only clear session if there is one
  useEffect(() => {
    const checkAndClearSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error clearing session:', error);
      }
    };
    checkAndClearSession();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message);
      } else if (data.user) {
        toast.success('Account created successfully! Please check your email to verify your account.');
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. If you haven\'t created an account yet, please sign up first.');
        } else {
          toast.error(error.message);
        }
      } else if (data.user) {
        toast.success('Successfully logged in!');
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (isSignUp: boolean) => (
    <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Email address</label>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="bg-white border-2 border-gray-200"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <Input
          type="password"
          placeholder={isSignUp ? "Create a password (min. 6 characters)" : "Enter your password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="bg-white border-2 border-gray-200"
          minLength={6}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium
          bg-[#4BA3F5] hover:bg-[#4BA3F5]/90`}
      >
        {loading 
          ? (isSignUp ? 'Creating account...' : 'Signing in...') 
          : (isSignUp ? 'Create New Account' : 'Sign In')}
      </button>
      {!isSignUp && (
        <button 
          type="button" 
          className="text-sm text-gray-600 hover:text-gray-800 block text-center w-full mt-2"
        >
          Forgot your password?
        </button>
      )}
    </form>
  );

  return (
    <Card className="bg-white shadow-lg border-2">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-[#4BA3F5]">Welcome to BornPurpose</CardTitle>
        <CardDescription className="text-base">Join our spiritual community</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100">
            <TabsTrigger 
              value="login"
              className="data-[state=active]:bg-[#4BA3F5] data-[state=active]:text-white"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="data-[state=active]:bg-[#4BA3F5] data-[state=active]:text-white"
            >
              Create Account
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            {renderForm(false)}
          </TabsContent>
          <TabsContent value="signup">
            <div className="mb-6 text-sm bg-blue-50 p-4 rounded-md border border-blue-200">
              <p className="font-medium text-blue-800 mb-2">New to BornPurpose?</p>
              <ol className="list-decimal ml-4 text-blue-700 space-y-1">
                <li>Enter your email address</li>
                <li>Create a secure password (minimum 6 characters)</li>
                <li>Click "Create New Account" to join</li>
              </ol>
            </div>
            {renderForm(true)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
