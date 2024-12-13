import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquare } from "lucide-react";
import { useParams } from "react-router-dom";
import { characters } from "@/lib/characters";

interface TemplateQuestionsProps {
  onSelect: (question: string) => void;
}

export const TemplateQuestions = ({ onSelect }: TemplateQuestionsProps) => {
  const { characterId } = useParams();
  const character = characters.find((c) => c.id === characterId);

  // Default questions that work for any character
  const defaultQuestions = [
    `What's your perspective on artificial intelligence and its impact on society?`,
    `How do you approach problem-solving in your area of expertise?`,
    `What are your thoughts on the future of human-AI collaboration?`,
    `Can you share some insights about your field of specialization?`,
    `How do you handle ethical dilemmas in your work?`,
  ];

  // Character-specific questions (if character is Atlas, use the original questions)
  const questions = character?.id === "atlas" ? [
    "Can you help me refine my pitch for investors?",
    "What are the key trends in venture capital right now?",
    "How should I approach scaling my startup?",
    "What metrics should I focus on for my next funding round?",
    "Can you help me develop a market entry strategy?",
  ] : defaultQuestions;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto flex items-center gap-2 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white border-0 hover:opacity-90"
        >
          <MessageSquare className="w-4 h-4" />
          Template Questions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[280px] sm:w-[300px] bg-gradient-to-b from-[#F1F0FB] to-[#E5DEFF] backdrop-blur-sm border-0"
      >
        {questions.map((question) => (
          <DropdownMenuItem
            key={question}
            onClick={() => onSelect(question)}
            className="cursor-pointer hover:bg-white/20 transition-colors duration-200"
          >
            {question}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};