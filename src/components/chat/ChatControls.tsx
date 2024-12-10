import { Button } from "@/components/ui/button";
import { Users, Image } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatControlsProps {
  isGroupChat: boolean;
  onToggleGroupChat: () => void;
  onChangeBackground: (background: string) => void;
}

const backgrounds = [
  { name: "None", value: "none" },
  { name: "Futuristic City", value: "/lovable-uploads/6fd19bc5-2400-4d1d-ac86-b28dca510751.png" },
  { name: "Futuristic Bar", value: "/lovable-uploads/36f22ffc-c4da-4934-b926-5d968e146e8b.png" },
  { name: "Futuristic Park", value: "/lovable-uploads/16497daf-435f-46cf-a10b-8645efd2cd9f.png" },
  { name: "Gradient", value: "gradient" },
];

export const ChatControls = ({
  isGroupChat,
  onToggleGroupChat,
  onChangeBackground,
}: ChatControlsProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        onClick={onToggleGroupChat}
        variant={isGroupChat ? "default" : "outline"}
        className="flex items-center gap-2"
      >
        <Users className="w-4 h-4" />
        <span className="hidden sm:inline">
          {isGroupChat ? "Exit Group Chat" : "Start Group Chat"}
        </span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Change Background</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {backgrounds.map((bg) => (
            <DropdownMenuItem
              key={bg.value}
              onClick={() => onChangeBackground(bg.value)}
            >
              {bg.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};