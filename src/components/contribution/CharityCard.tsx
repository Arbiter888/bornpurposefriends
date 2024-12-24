import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CharityCardProps {
  name: string;
  description: string;
  onDonate: () => void;
}

const CharityCard = ({ name, description, onDonate }: CharityCardProps) => {
  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm text-center">
      <h4 className="text-xl font-semibold mb-2">{name}</h4>
      <p className="text-gray-600 mb-6">{description}</p>
      <Button 
        variant="outline"
        className="w-full"
        onClick={onDonate}
      >
        <Gift className="mr-2 h-4 w-4" />
        Donate Now
      </Button>
    </Card>
  );
};

export default CharityCard;