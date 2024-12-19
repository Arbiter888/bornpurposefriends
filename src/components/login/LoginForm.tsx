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

  // Clear any existing session on component mount
  useEffect(() => {
    const clearExistingSession = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Error clearing session:', error);
    };
    clearExistingSession();
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
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="bg-gray-50"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <Input
          type="password"
          placeholder="Choose a password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="bg-gray-50"
          minLength={6}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0EA5E9] text-white py-2 rounded-md hover:bg-[#0284C7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (isSignUp ? 'Creating account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign in')}
      </button>
      {!isSignUp && (
        <a href="#" className="text-sm text-gray-600 hover:underline block text-center">
          Forgot your password?
        </a>
      )}
    </form>
  );

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome to BornPurpose</CardTitle>
        <CardDescription>Join our spiritual community</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Create Account</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            {renderForm(false)}
          </TabsContent>
          <TabsContent value="signup">
            <div className="mb-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
              <p>New to BornPurpose? Create your account by:</p>
              <ol className="list-decimal ml-4 mt-2">
                <li>Enter your email address</li>
                <li>Choose a secure password (minimum 6 characters)</li>
                <li>Click "Create Account" to register</li>
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