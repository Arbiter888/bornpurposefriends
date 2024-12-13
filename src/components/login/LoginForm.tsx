import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const clearExistingSession = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Error clearing session:', error);
    };
    clearExistingSession();
  }, []);

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

  const handleSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists. Please sign in instead.');
          setIsSignUp(false);
        } else {
          toast.error(error.message);
        }
      } else if (data.user) {
        toast.success('Sign up successful! Please check your email for verification.');
        setIsSignUp(false);
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.log('Login error:', error); // For debugging
        if (error.message.includes('Email not confirmed')) {
          toast.error('Please verify your email address before logging in.');
        } else if (error.message === 'Invalid login credentials') {
          toast.error('Invalid email or password. Please check your credentials or sign up if you don\'t have an account.');
        } else {
          toast.error(error.message);
        }
        await supabase.auth.signOut();
      } else if (data.user) {
        toast.success('Successfully logged in!');
      }
    } catch (error: any) {
      console.error('Login error:', error); // For debugging
      toast.error('An unexpected error occurred. Please try again.');
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome to BornPurpose</CardTitle>
        <CardDescription>
          {isSignUp ? 'Create an account to get started' : 'Sign in to access your AI companions'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email address</label>
            <Input
              type="email"
              placeholder="name@example.com"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="bg-gray-50"
              minLength={6}
            />
          </div>
          {isSignUp ? (
            <Button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="w-full bg-[#990000] text-white hover:bg-[#800000]"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#990000] text-white hover:bg-[#800000]"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          )}
          <div className="text-center space-y-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;