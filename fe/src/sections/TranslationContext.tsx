import React, { createContext, useContext, useState, useEffect } from "react";

// 🌍 Supported languages
const LANGUAGES = { EN: "en", FR: "fr" };

// 🎯 Create context
const TranslationContext = createContext({
  language: LANGUAGES.EN,
  toggleLanguage: () => {},
});

// 🎡 Provider Component
export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(localStorage.getItem("language") || LANGUAGES.EN);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // 🌍 Toggle between English and French
  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLanguage = prev === LANGUAGES.EN ? LANGUAGES.FR : LANGUAGES.EN;
      console.log("Language switched to:", newLanguage); // ✅ Check if it's toggling
      return newLanguage;
    });
  };
  

  return (
    <TranslationContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

// 🌍 Custom Hook
export const useTranslation = () => useContext(TranslationContext);
