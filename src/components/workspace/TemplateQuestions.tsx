
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TemplateQuestionsProps {
  onSelect: (question: string) => void;
  characterId?: string;
}

export const TemplateQuestions = ({ onSelect, characterId = "atlas" }: TemplateQuestionsProps) => {
  const { currentLanguage } = useLanguage();

  // Multi-language question templates
  const questionsMap = {
    "atlas": {
      en: [
        "How can I step into God's vision for my life?",
        "What does the Bible say about leadership and success?",
        "How do I activate faith to walk in prosperity?",
        "What scriptures teach about vision and purpose?",
        "How can I overcome obstacles that block my blessings?",
      ],
      zh: [
        "我如何实现上帝对我生命的愿景？",
        "圣经关于领导力和成功说了什么？",
        "我如何激活信仰，行走在繁荣中？",
        "哪些经文教导关于愿景和目标？",
        "我如何克服阻碍我祝福的障碍？",
      ],
      es: [
        "¿Cómo puedo entrar en la visión de Dios para mi vida?",
        "¿Qué dice la Biblia sobre el liderazgo y el éxito?",
        "¿Cómo activo la fe para caminar en prosperidad?",
        "¿Qué escrituras enseñan sobre la visión y el propósito?",
        "¿Cómo puedo superar los obstáculos que bloquean mis bendiciones?",
      ],
      fr: [
        "Comment puis-je entrer dans la vision de Dieu pour ma vie?",
        "Que dit la Bible à propos du leadership et du succès?",
        "Comment activer la foi pour marcher dans la prospérité?",
        "Quelles écritures enseignent sur la vision et le but?",
        "Comment surmonter les obstacles qui bloquent mes bénédictions?",
      ],
      de: [
        "Wie kann ich in Gottes Vision für mein Leben eintreten?",
        "Was sagt die Bibel über Führung und Erfolg?",
        "Wie aktiviere ich Glauben, um in Wohlstand zu wandeln?",
        "Welche Schriften lehren über Vision und Zweck?",
        "Wie kann ich Hindernisse überwinden, die meine Segnungen blockieren?",
      ]
    },
    "echo": {
      en: [
        "How can I pray for financial breakthrough?",
        "What scriptures can I declare for healing and prosperity?",
        "How do I strengthen my prayer life for success?",
        "Can prayer help me find my purpose?",
        "What does the Bible say about faith and miracles?",
      ],
      zh: [
        "我如何为财务突破祷告？",
        "我可以宣告哪些经文来获得治愈和繁荣？",
        "我如何加强祷告生活以获得成功？",
        "祷告能帮助我找到我的目标吗？",
        "圣经对信仰和奇迹有何教导？",
      ],
      es: [
        "¿Cómo puedo orar por un avance financiero?",
        "¿Qué escrituras puedo declarar para sanidad y prosperidad?",
        "¿Cómo fortalezco mi vida de oración para el éxito?",
        "¿Puede la oración ayudarme a encontrar mi propósito?",
        "¿Qué dice la Biblia sobre la fe y los milagros?",
      ],
      fr: [
        "Comment puis-je prier pour une percée financière?",
        "Quelles écritures puis-je déclarer pour la guérison et la prospérité?",
        "Comment renforcer ma vie de prière pour le succès?",
        "La prière peut-elle m'aider à trouver mon but?",
        "Que dit la Bible sur la foi et les miracles?",
      ],
      de: [
        "Wie kann ich für finanziellen Durchbruch beten?",
        "Welche Schriften kann ich für Heilung und Wohlstand erklären?",
        "Wie stärke ich mein Gebetsleben für Erfolg?",
        "Kann Gebet mir helfen, meinen Zweck zu finden?",
        "Was sagt die Bibel über Glauben und Wunder?",
      ]
    },
    "pace": {
      en: [
        "How do I know God's purpose for my career?",
        "What does the Bible say about achieving success at a young age?",
        "How can I build wealth and honor God?",
        "How do I balance faith and ambition?",
        "What scriptures teach about perseverance and discipline?",
      ],
      zh: [
        "我如何知道上帝对我职业的计划？",
        "圣经关于年轻时取得成功有何教导？",
        "我如何积累财富并荣耀上帝？",
        "我如何平衡信仰和抱负？",
        "哪些经文教导关于毅力和自律？",
      ],
      es: [
        "¿Cómo sé el propósito de Dios para mi carrera?",
        "¿Qué dice la Biblia sobre lograr el éxito a una edad temprana?",
        "¿Cómo puedo generar riqueza y honrar a Dios?",
        "¿Cómo equilibro la fe y la ambición?",
        "¿Qué escrituras enseñan sobre perseverancia y disciplina?",
      ],
      fr: [
        "Comment connaître le but de Dieu pour ma carrière?",
        "Que dit la Bible sur la réussite à un jeune âge?",
        "Comment puis-je bâtir la richesse et honorer Dieu?",
        "Comment équilibrer la foi et l'ambition?",
        "Quelles écritures enseignent sur la persévérance et la discipline?",
      ],
      de: [
        "Wie erkenne ich Gottes Zweck für meine Karriere?",
        "Was sagt die Bibel über Erfolg in jungen Jahren?",
        "Wie kann ich Reichtum aufbauen und Gott ehren?",
        "Wie balanciere ich Glauben und Ambition?",
        "Welche Schriften lehren über Ausdauer und Disziplin?",
      ]
    },
    "aria": {
      en: [
        "How can I develop stronger faith?",
        "What does the Bible say about trusting God in hard times?",
        "How do I recognize and follow God's plan for my life?",
        "How can I break free from fear and doubt?",
        "What scriptures talk about spiritual prosperity?",
      ],
      zh: [
        "我如何发展更坚强的信心？",
        "圣经关于在艰难时期信靠上帝有何教导？",
        "我如何识别并跟随上帝对我生命的计划？",
        "我如何摆脱恐惧和怀疑？",
        "哪些经文谈论灵性繁荣？",
      ],
      es: [
        "¿Cómo puedo desarrollar una fe más fuerte?",
        "¿Qué dice la Biblia sobre confiar en Dios en tiempos difíciles?",
        "¿Cómo reconozco y sigo el plan de Dios para mi vida?",
        "¿Cómo puedo liberarme del miedo y la duda?",
        "¿Qué escrituras hablan sobre la prosperidad espiritual?",
      ],
      fr: [
        "Comment puis-je développer une foi plus forte?",
        "Que dit la Bible sur la confiance en Dieu dans les moments difficiles?",
        "Comment reconnaître et suivre le plan de Dieu pour ma vie?",
        "Comment me libérer de la peur et du doute?",
        "Quelles écritures parlent de la prospérité spirituelle?",
      ],
      de: [
        "Wie kann ich einen stärkeren Glauben entwickeln?",
        "Was sagt die Bibel über das Vertrauen auf Gott in schweren Zeiten?",
        "Wie erkenne und folge ich Gottes Plan für mein Leben?",
        "Wie kann ich mich von Angst und Zweifel befreien?",
        "Welche Schriften sprechen über geistigen Wohlstand?",
      ]
    },
    "gabriel": {
      en: [
        "What does the Bible say about health and healing?",
        "How can faith help me overcome stress and anxiety?",
        "What are biblical principles for physical wellness?",
        "How can I pray for healing in my body?",
        "What scriptures declare God's promise for health?",
      ],
      zh: [
        "圣经关于健康和愈合有何教导？",
        "信仰如何帮助我克服压力和焦虑？",
        "身体健康的圣经原则是什么？",
        "我如何为身体的愈合祷告？",
        "哪些经文宣告上帝对健康的应许？",
      ],
      es: [
        "¿Qué dice la Biblia sobre la salud y la sanación?",
        "¿Cómo puede la fe ayudarme a superar el estrés y la ansiedad?",
        "¿Cuáles son los principios bíblicos para el bienestar físico?",
        "¿Cómo puedo orar por la sanación en mi cuerpo?",
        "¿Qué escrituras declaran la promesa de Dios para la salud?",
      ],
      fr: [
        "Que dit la Bible sur la santé et la guérison?",
        "Comment la foi peut-elle m'aider à surmonter le stress et l'anxiété?",
        "Quels sont les principes bibliques pour le bien-être physique?",
        "Comment puis-je prier pour la guérison dans mon corps?",
        "Quelles écritures déclarent la promesse de Dieu pour la santé?",
      ],
      de: [
        "Was sagt die Bibel über Gesundheit und Heilung?",
        "Wie kann Glaube mir helfen, Stress und Angst zu überwinden?",
        "Was sind biblische Prinzipien für körperliches Wohlbefinden?",
        "Wie kann ich für Heilung in meinem Körper beten?",
        "Welche Schriften erklären Gottes Versprechen für Gesundheit?",
      ]
    },
    "mary": {
      en: [
        "How can I attract financial blessings through faith?",
        "What does the Bible teach about wealth and prosperity?",
        "How can I break free from financial struggles?",
        "What are biblical principles for managing money?",
        "What scriptures can I declare for financial increase?",
      ],
      zh: [
        "我如何通过信仰吸引财务祝福？",
        "圣经关于财富和繁荣有何教导？",
        "我如何摆脱财务困境？",
        "管理金钱的圣经原则是什么？",
        "我可以宣告哪些经文来增加财务？",
      ],
      es: [
        "¿Cómo puedo atraer bendiciones financieras a través de la fe?",
        "¿Qué enseña la Biblia sobre la riqueza y la prosperidad?",
        "¿Cómo puedo liberarme de las luchas financieras?",
        "¿Cuáles son los principios bíblicos para administrar el dinero?",
        "¿Qué escrituras puedo declarar para el aumento financiero?",
      ],
      fr: [
        "Comment puis-je attirer les bénédictions financières par la foi?",
        "Qu'enseigne la Bible sur la richesse et la prospérité?",
        "Comment puis-je me libérer des difficultés financières?",
        "Quels sont les principes bibliques pour gérer l'argent?",
        "Quelles écritures puis-je déclarer pour l'augmentation financière?",
      ],
      de: [
        "Wie kann ich finanzielle Segnungen durch Glauben anziehen?",
        "Was lehrt die Bibel über Reichtum und Wohlstand?",
        "Wie kann ich mich von finanziellen Kämpfen befreien?",
        "Was sind biblische Prinzipien für Geldmanagement?",
        "Welche Schriften kann ich für finanzielle Zunahme erklären?",
      ]
    },
  };

  // Get button text translation
  const getButtonText = () => {
    const texts = {
      en: "Bible Study Questions",
      zh: "圣经学习问题",
      es: "Preguntas de Estudio Bíblico",
      fr: "Questions d'Étude Biblique",
      de: "Bibelstudiumsfragen",
    };
    return texts[currentLanguage as keyof typeof texts] || texts.en;
  };

  // Get the questions for the current character and language
  const getQuestions = () => {
    const characterQuestions = questionsMap[characterId as keyof typeof questionsMap] || questionsMap.atlas;
    return characterQuestions[currentLanguage as keyof typeof characterQuestions] || characterQuestions.en;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto flex items-center gap-2 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white border-0 hover:opacity-90"
        >
          <MessageSquare className="w-4 h-4" />
          {getButtonText()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[280px] sm:w-[300px] bg-gradient-to-b from-[#F1F0FB] to-[#E5DEFF] backdrop-blur-sm border-0"
      >
        {getQuestions().map((question) => (
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
