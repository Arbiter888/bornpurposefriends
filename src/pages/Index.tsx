import Hero from "@/components/Hero";
import CharacterGrid from "@/components/CharacterGrid";
import CharacterGenerator from "@/components/CharacterGenerator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <CharacterGrid />
      
      <div className="container mx-auto px-4 py-8">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full"
        >
          <CollapsibleTrigger className="w-full bg-card hover:bg-card/80 p-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <span className="text-lg font-semibold">
              {isOpen ? "Hide Character Generator Demo" : "Generate Character Demo"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <CharacterGenerator />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default Index;