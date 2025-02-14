
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
  characterId?: string;
}

export const TemplateQuestions = ({ onSelect, characterId = "atlas" }: TemplateQuestionsProps) => {
  const questionsMap = {
    "atlas": [
      "How can I step into God's vision for my life?",
      "What does the Bible say about leadership and success?",
      "How do I activate faith to walk in prosperity?",
      "What scriptures teach about vision and purpose?",
      "How can I overcome obstacles that block my blessings?",
    ],
    "echo": [
      "How can I pray for financial breakthrough?",
      "What scriptures can I declare for healing and prosperity?",
      "How do I strengthen my prayer life for success?",
      "Can prayer help me find my purpose?",
      "What does the Bible say about faith and miracles?",
    ],
    "pace": [
      "How do I know God's purpose for my career?",
      "What does the Bible say about achieving success at a young age?",
      "How can I build wealth and honor God?",
      "How do I balance faith and ambition?",
      "What scriptures teach about perseverance and discipline?",
    ],
    "hope": [
      "How can I develop stronger faith?",
      "What does the Bible say about trusting God in hard times?",
      "How do I recognize and follow God's plan for my life?",
      "How can I break free from fear and doubt?",
      "What scriptures talk about spiritual prosperity?",
    ],
    "gabriel": [
      "What does the Bible say about health and healing?",
      "How can faith help me overcome stress and anxiety?",
      "What are biblical principles for physical wellness?",
      "How can I pray for healing in my body?",
      "What scriptures declare God's promise for health?",
    ],
    "mary": [
      "How can I attract financial blessings through faith?",
      "What does the Bible teach about wealth and prosperity?",
      "How can I break free from financial struggles?",
      "What are biblical principles for managing money?",
      "What scriptures can I declare for financial increase?",
    ],
  };

  const questions = questionsMap[characterId as keyof typeof questionsMap] || questionsMap.atlas;

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
