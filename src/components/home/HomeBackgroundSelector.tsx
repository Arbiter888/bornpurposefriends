import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HomeBackgroundSelectorProps {
  onSelect: (background: string) => void;
}

export const HomeBackgroundSelector = ({ onSelect }: HomeBackgroundSelectorProps) => {
  const backgrounds = [
    {
      name: "Church Interior",
      url: "/lovable-uploads/e5022c69-9adb-495b-bb18-b9710c0567c6.png",
    },
    {
      name: "Clean White",
      url: "",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/80 hover:bg-white/90 transition-colors"
        >
          <Image className="w-4 h-4 mr-2" />
          Change Background
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[280px] bg-white/90 backdrop-blur-sm"
      >
        {backgrounds.map((bg) => (
          <DropdownMenuItem
            key={bg.url}
            onClick={() => onSelect(bg.url)}
            className="cursor-pointer hover:bg-black/5 transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              {bg.url && (
                <div
                  className="w-8 h-8 rounded bg-cover bg-center"
                  style={{ backgroundImage: `url(${bg.url})` }}
                />
              )}
              {bg.name}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};