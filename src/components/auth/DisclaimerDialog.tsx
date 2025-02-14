
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

export const DisclaimerDialog = () => {
  const [open, setOpen] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    const checkAcceptance = async () => {
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('disclaimer_accepted')
        .eq('id', user.id)
        .single();

      if (profile?.disclaimer_accepted) {
        setOpen(false);
      }
    };

    checkAcceptance();
  }, [user]);

  const handleAccept = async () => {
    if (!user || !accepted) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          disclaimer_accepted: true,
          disclaimer_accepted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setOpen(false);
      toast.success("Welcome to BornPurpose!");
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error saving disclaimer acceptance:', error);
      toast.error("There was an error. Please try again.");
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-center mb-4">
            📢 Important Disclaimer – Please Read Before Proceeding
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-6 text-base">
            <p className="font-medium text-center">
              Welcome to BornPurpose! Before accessing our platform, we want to ensure transparency about our services and your experience.
            </p>
            
            <div className="bg-secondary/10 p-6 rounded-lg space-y-4">
              <p className="font-semibold">✅ By using this platform, you acknowledge and agree that:</p>
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-primary">🔹</span>
                  Our guidance is faith-based and should not be considered financial, legal, medical, or professional advice.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">🔹</span>
                  Calls and interactions may be monitored and recorded for safeguarding purposes to ensure a safe and positive experience.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">🔹</span>
                  You are responsible for any decisions made based on faith-based encouragement and teachings provided on this platform.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">🔹</span>
                  BornPurpose is a community-driven faith initiative and does not guarantee specific financial, health, or personal outcomes.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">🔹</span>
                  If you require professional advice, we encourage you to consult a licensed financial advisor, medical professional, or legal expert.
                </li>
              </ul>
            </div>

            <div className="flex items-center space-x-2 justify-center">
              <Checkbox 
                id="terms" 
                checked={accepted}
                onCheckedChange={(checked) => setAccepted(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <Button
            className="w-full sm:w-auto min-w-[200px]"
            size="lg"
            onClick={handleAccept}
            disabled={!accepted}
          >
            Accept & Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
