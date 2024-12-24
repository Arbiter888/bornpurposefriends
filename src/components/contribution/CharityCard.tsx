import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CharityCardProps {
  name: string;
  description: string;
  link: string;
  onDonate: (charity: string, link: string) => void;
}

const CharityCard = ({ name, description, link, onDonate }: CharityCardProps) => {
  return (
    <Card className="text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="w-full bg-secondary hover:bg-secondary/90 transition-colors"
          onClick={() => onDonate(name, link)}
        >
          <Gift className="mr-2 h-4 w-4" />
          Donate Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CharityCard;