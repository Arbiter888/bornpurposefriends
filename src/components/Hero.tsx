import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const Hero = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

  const getContent = () => {
    if (currentLanguage === "ko") {
      return {
        status: "사역팀 온라인",
        description: "기도와 성경 공부를 위한 디지털 성소에 오신 것을 환영합니다. 성경에 대한 더 깊은 이해, 기도 지원, 그리고 그리스도와 함께하는 여정에서의 안내를 위해 우리 사역팀과 연결하세요."
      };
    }
    return {
      status: "Ministry Team Online",
      description: "Welcome to your digital sanctuary for prayer and Bible study. Connect with our ministry team for deeper understanding of Scripture, prayer support, and guidance in your walk with Christ."
    };
  };

  const content = getContent();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-16 relative overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      
      <motion.div 
        className="flex items-center gap-2 mb-8 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
        whileHover={{ scale: 1.02 }}
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm font-medium text-gray-700">{content.status}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <Globe className="h-4 w-4" />
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem onClick={() => setCurrentLanguage("en")}>
              🇺🇸 English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentLanguage("ko")}>
              🇰🇷 한국어
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <motion.h1 
        className="text-5xl md:text-7xl font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ 
          fontFamily: 'Tomorrow',
          background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        bornpurpose
      </motion.h1>

      <motion.p 
        className="text-lg md:text-xl text-gray-800 max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ 
          fontFamily: 'Tomorrow',
          lineHeight: '1.8'
        }}
      >
        {content.description}
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          size="lg"
          className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity"
        >
          Start Your Journey
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          className="border-2 hover:bg-primary/5"
        >
          Learn More
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Hero;