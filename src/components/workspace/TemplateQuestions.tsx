import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquare } from "lucide-react";

interface TemplateQuestionsProps {
  onSelect: (question: string) => void;
}

export const TemplateQuestions = ({ onSelect }: TemplateQuestionsProps) => {
  const questions = [
    "Can you help me refine my pitch for investors?",
    "What are the key trends in venture capital right now?",
    "How should I approach scaling my startup?",
    "What metrics should I focus on for my next funding round?",
    "Can you help me develop a market entry strategy?",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Template Questions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        {questions.map((question) => (
          <DropdownMenuItem
            key={question}
            onClick={() => onSelect(question)}
            className="cursor-pointer"
          >
            {question}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};