
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Language map with language code to name mapping
export const LANGUAGES = {
  en: "English",
  ar: "العربية", // Arabic
  bg: "Български", // Bulgarian
  zh: "中文", // Chinese
  hr: "Hrvatski", // Croatian
  cs: "Čeština", // Czech
  da: "Dansk", // Danish
  nl: "Nederlands", // Dutch
  fi: "Suomi", // Finnish
  fr: "Français", // French
  de: "Deutsch", // German
  el: "Ελληνικά", // Greek
  hi: "हिन्दी", // Hindi
  hu: "Magyar", // Hungarian
  id: "Bahasa Indonesia", // Indonesian
  it: "Italiano", // Italian
  ja: "日本語", // Japanese
  ko: "한국어", // Korean
  ms: "Bahasa Melayu", // Malay
  no: "Norsk", // Norwegian
  pl: "Polski", // Polish
  pt: "Português", // Portuguese
  "pt-BR": "Português (Brasil)", // Portuguese-Brazilian
  ro: "Română", // Romanian
  ru: "Русский", // Russian
  sk: "Slovenčina", // Slovak
  es: "Español", // Spanish
  sv: "Svenska", // Swedish
  ta: "தமிழ்", // Tamil
  tr: "Türkçe", // Turkish
  uk: "Українська", // Ukrainian
  vi: "Tiếng Việt", // Vietnamese
};

// RTL languages
export const RTL_LANGUAGES = ["ar", "he"];

type LanguageContextType = {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  setCurrentLanguage: () => {},
  isRTL: false,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem("preferredLanguage") || "en";
  });
  
  const isRTL = RTL_LANGUAGES.includes(currentLanguage);

  useEffect(() => {
    localStorage.setItem("preferredLanguage", currentLanguage);
    // Set RTL direction based on language
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [currentLanguage, isRTL]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
