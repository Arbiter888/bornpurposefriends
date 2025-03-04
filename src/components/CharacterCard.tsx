import { Character } from "@/lib/characters";
import { useEffect, useRef, useState } from "react";
import { Phone, MessageSquare, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGUAGES } from "@/contexts/LanguageContext";

interface CharacterCardProps {
  character: Character;
  onWidgetOpen: () => void;
  isWidgetActive: boolean;
}

const CharacterCard = ({ character, onWidgetOpen, isWidgetActive }: CharacterCardProps) => {
  const [showWidget, setShowWidget] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const navigate = useNavigate();
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  // Load widget script
  useEffect(() => {
    const loadScript = () => {
      const existingScript = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
      
      if (existingScript) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log("Script loaded successfully");
        setScriptLoaded(true);
      };

      script.onerror = (error) => {
        console.error("Script loading error:", error);
        setScriptLoaded(false);
      };
      
      document.head.appendChild(script);
    };

    loadScript();
  }, []);

  useEffect(() => {
    if (!isWidgetActive) {
      setShowWidget(false);
    }
  }, [isWidgetActive]);

  const handlePrayerRequest = () => {
    if (scriptLoaded) {
      console.log("Opening widget for character:", character.name);
      onWidgetOpen();
      setShowWidget(true);
    } else {
      console.warn("Widget script not loaded yet");
    }
  };

  const handleBibleStudy = () => {
    navigate(`/workspace/${character.id}`);
  };

  // Get character name in current language (with fallback to English)
  const getCurrentName = () => {
    if (character.translations?.[currentLanguage]?.name) {
      return character.translations[currentLanguage].name;
    }
    return character.name;
  };

  // Get character role in current language (with fallback to English)
  const getCurrentRole = () => {
    if (character.translations?.[currentLanguage]?.role) {
      return character.translations[currentLanguage].role;
    }
    return character.role;
  };

  // Get character description in current language (with fallback to English)
  const getCurrentDescription = () => {
    if (character.translations?.[currentLanguage]?.description) {
      return character.translations[currentLanguage].description;
    }
    return character.description;
  };

  // Get widget ID in current language (with fallback to English)
  const getCurrentWidgetId = () => {
    if (character.translations?.[currentLanguage]?.widgetId) {
      return character.translations[currentLanguage].widgetId;
    }
    return character.widgetId;
  };

  // Localized button text for Call and Chat
  const getLocalizedCallText = () => {
    const name = getCurrentName();
    
    // These are examples, in a real app these would come from a translation file
    const callPhrases: Record<string, string> = {
      en: `Call ${name}`,
      ar: `اتصل بـ ${name}`,
      bg: `Обадете се на ${name}`,
      zh: `呼叫 ${name}`,
      hr: `Nazovi ${name}`,
      cs: `Zavolat ${name}`,
      da: `Ring til ${name}`,
      nl: `Bel ${name}`,
      fi: `Soita ${name}`,
      fr: `Appeler ${name}`,
      de: `Rufe ${name} an`,
      el: `Κλήση ${name}`,
      hi: `${name} को कॉल करें`,
      hu: `Hívás ${name}`,
      id: `Panggil ${name}`,
      it: `Chiama ${name}`,
      ja: `${name}に電話する`,
      ko: `${name}에게 전화`,
      ms: `Panggil ${name}`,
      no: `Ring ${name}`,
      pl: `Zadzwoń do ${name}`,
      pt: `Ligar para ${name}`,
      "pt-BR": `Ligar para ${name}`,
      ro: `Sună pe ${name}`,
      ru: `Позвонить ${name}`,
      sk: `Zavolať ${name}`,
      es: `Llamar a ${name}`,
      sv: `Ring ${name}`,
      ta: `${name}ஐ அழைக்க`,
      tr: `${name}'i ara`,
      uk: `Зателефонувати ${name}`,
      vi: `Gọi cho ${name}`
    };

    return callPhrases[currentLanguage] || callPhrases.en;
  };

  const getLocalizedChatText = () => {
    const name = getCurrentName();
    
    // These are examples, in a real app these would come from a translation file
    const chatPhrases: Record<string, string> = {
      en: `Chat with ${name}`,
      ar: `الدردشة مع ${name}`,
      bg: `Чат с ${name}`,
      zh: `与 ${name} 聊天`,
      hr: `Razgovaraj s ${name}`,
      cs: `Chatovat s ${name}`,
      da: `Chat med ${name}`,
      nl: `Chat met ${name}`,
      fi: `Keskustele ${name} kanssa`,
      fr: `Discuter avec ${name}`,
      de: `Mit ${name} chatten`,
      el: `Συνομιλία με ${name}`,
      hi: `${name} के साथ चैट करें`,
      hu: `Csevegés ${name} személlyel`,
      id: `Mengobrol dengan ${name}`,
      it: `Chatta con ${name}`,
      ja: `${name}とチャット`,
      ko: `${name}와 채팅`,
      ms: `Berbual dengan ${name}`,
      no: `Chat med ${name}`,
      pl: `Czatuj z ${name}`,
      pt: `Conversar com ${name}`,
      "pt-BR": `Conversar com ${name}`,
      ro: `Chat cu ${name}`,
      ru: `Чат с ${name}`,
      sk: `Chatovať s ${name}`,
      es: `Chatear con ${name}`,
      sv: `Chatta med ${name}`,
      ta: `${name} உடன் அரட்டை`,
      tr: `${name} ile sohbet et`,
      uk: `Чат з ${name}`,
      vi: `Trò chuyện với ${name}`
    };

    return chatPhrases[currentLanguage] || chatPhrases.en;
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="relative group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl rounded-2xl"
        style={{
          height: 'auto',
          fontFamily: 'Tomorrow'
        }}
      >
        <div className="relative">
          <img
            src={character.image}
            alt={getCurrentName()}
            className="w-full h-full object-contain rounded-2xl"
            loading="lazy"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-bold text-white">{getCurrentName()}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <DropdownMenuItem 
                      key={code} 
                      onClick={() => setCurrentLanguage(code)}
                      className={currentLanguage === code ? "bg-blue-50 text-blue-600 font-medium" : ""}
                    >
                      {name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400">{getCurrentRole()}</span>
            </div>
            <p className="text-gray-300 text-sm">{getCurrentDescription()}</p>
          </div>

          <div className="flex gap-2 w-full">
            <Button
              onClick={handlePrayerRequest}
              className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-xl px-2 text-xs sm:text-sm whitespace-normal h-auto py-2"
            >
              <Phone className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {getLocalizedCallText()}
              </span>
            </Button>
            <Button
              onClick={handleBibleStudy}
              className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-xl px-2 text-xs sm:text-sm whitespace-normal h-auto py-2"
            >
              <MessageSquare className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {getLocalizedChatText()}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {showWidget && scriptLoaded && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div 
            className="relative bg-black rounded-lg p-4 shadow-2xl"
            style={{ width: '300px' }}
          >
            <button 
              onClick={() => setShowWidget(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
            >
              ×
            </button>
            <div 
              dangerouslySetInnerHTML={{
                __html: `<elevenlabs-convai agent-id="${getCurrentWidgetId()}"></elevenlabs-convai>`
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterCard;
