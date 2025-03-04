
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Church, Home } from "lucide-react";
import { motion } from "framer-motion";

interface SectionToggleProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SectionToggle = ({ activeSection, onSectionChange }: SectionToggleProps) => {
  return (
    <motion.div 
      className="flex justify-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToggleGroup
        type="single"
        value={activeSection}
        onValueChange={(value) => {
          if (value) onSectionChange(value);
        }}
        className="bg-white/80 backdrop-blur-sm rounded-lg border shadow-sm"
      >
        <ToggleGroupItem value="bornpurpose" aria-label="Toggle BornPurpose section">
          <Home className="h-4 w-4 mr-2" />
          BornPurpose
        </ToggleGroupItem>
        <ToggleGroupItem value="htb" aria-label="Toggle HTB section">
          <Church className="h-4 w-4 mr-2" />
          HTB
        </ToggleGroupItem>
      </ToggleGroup>
    </motion.div>
  );
};

export default SectionToggle;
