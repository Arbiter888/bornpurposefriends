
import { useState } from "react";
import HTBProfile from "@/components/church/HTBProfile";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";

const HTB = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50">
      <div className="container mx-auto px-4 py-4">
        <WorkspaceHeader showHTB={false} />
        <HTBProfile />
      </div>
    </div>
  );
};

export default HTB;
