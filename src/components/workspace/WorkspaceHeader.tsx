
import { Church, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface WorkspaceHeaderProps {
  showHTB?: boolean;
}

export const WorkspaceHeader = ({ showHTB = true }: WorkspaceHeaderProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex justify-end gap-2 mb-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/")}
        className="hover:bg-secondary/10"
      >
        <Home className="h-5 w-5" />
      </Button>
      
      {showHTB && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/htb")}
          className="hover:bg-secondary/10"
        >
          <Church className="h-5 w-5" />
        </Button>
      )}
      
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSignOut}
        className="hover:bg-secondary/10"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
};
