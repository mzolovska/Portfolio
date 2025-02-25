import axiosInstance  from "../shared/useAxiosInstance"; // ✅ Import axios instance
import { useTranslation } from "../../src/sections/TranslationContext";

export const useTranslateApi = () => {
  const { language } = useTranslation();

  // 📌 Function to translate text
  const translateText = async (text: string): Promise<string> => {
    try {
      if (language === "en") return text; // No need to translate if English

      const response = await axiosInstance.post("/translate", {
        text,
        targetLanguage: language,
      });

      return response.data.translatedText;
    } catch (error) {
      console.error("Translation failed:", error);
      return text;
    }
  };

  return { translateText };
};
