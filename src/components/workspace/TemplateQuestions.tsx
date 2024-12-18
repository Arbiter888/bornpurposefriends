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
    "What does the Bible say about finding peace in difficult times?",
    "How can I apply biblical wisdom to my current situation?",
    "What scriptures can help me understand God's purpose for my life?",
    "Can you help me understand what the Bible teaches about relationships?",
    "What does the Bible say about making important life decisions?",
    "How can I grow stronger in my faith according to scripture?",
    "What verses can help me overcome fear and anxiety?",
    "How does the Bible guide us in showing love to others?",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto flex items-center gap-2 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white border-0 hover:opacity-90"
        >
          <MessageSquare className="w-4 h-4" />
          Bible Study Questions
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