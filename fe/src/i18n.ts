import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "commentSent": "Your comment has been sent for approval!",
    "commentDeleted": "Comment deleted successfully!",
    "commentApproved": "Comment approved!"
    }
  },
  fr: {
    translation: {
    "commentSent": "Votre commentaire a été envoyé pour approbation !",
        "commentDeleted": "Commentaire supprimé avec succès !",
        "commentApproved": "Commentaire approuvé !"
    }
  },
      
};

// ✅ Initialize i18next properly
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en", // Fallback if translation is missing
  interpolation: { escapeValue: false }
});

export default i18n;






