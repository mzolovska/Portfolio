import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        about: "About",
        experience: "Experience",
        education: "Education",
        projects: "Projects",
        contact: "Contact",
        resume: "Resume",
        comments: "Comments",
        title: "About Me",
        copyright: "© 2025 Mariya Zolovska. All Rights Reserved.",

      },
      coverPage: {
        greeting: "Hey there, my name is Mariya, and I am a developer.",
        scroll: "Scroll down to learn more about me!"
      },
      aboutMe: {
        title: "About Me",
        noData: "No About Me data available.",
        skills: "Skills",
        adminControls: {
          name: "Name",
          description: "Description"
        }
      },
      comments: {
        title: "Comments",
        add: "Add a Comment",
        placeholderTitle: "Title",
        placeholderComment: "Your comment...",
        submit: "Submit",
        cancel: "Cancel",
        noComments: "No comments yet."
      },
      contact: {
        title: "Contact Me",
        description: "Have a question or just want to say hi? Send me a message! 📩",
        emailPlaceholder: "Your Email",
        subjectPlaceholder: "Subject",
        messagePlaceholder: "Your Message",
        sendButton: "Send Message",
        sending: "Sending...",
        success: "Email sent successfully! ✅",
        error: "Error sending email ❌"
      },
      educationExperience: {
        title: "Education & Experience",
        education: "Education",
        experience: "Experience",
        noEducation: "No education data available.",
        noExperience: "No experience data available."
      },
      projects: {
        title: "Projects",
        noProjects: "No projects available."
      },
      resume: {
        title: "Resume",
        download: "You can download my resume by clicking",
        here: "here"
      }
    }
  },
  fr: {
    translation: {

      navbar: {
        about: "À Propos",
        experience: "Expérience",
        education: "Éducation",
        projects: "Projets",
        contact: "Contact",
        resume: "CV",
        comments: "Commentaires",
        title: "À Propos de Moi",
        copyright: "© 2025 Mariya Zolovska. Tous droits réservés.",

      },
      coverPage: {
        greeting: "Salut, je m'appelle Mariya et je suis développeuse.",
        scroll: "Faites défiler vers le bas pour en savoir plus sur moi !"
      },
      aboutMe: {
        title: "À propos de moi",
        noData: "Aucune donnée disponible.",
        skills: "Compétences",
        adminControls: {
          name: "Nom",
          description: "Description"
        }
      },
      comments: {
        title: "Commentaires",
        add: "Ajouter un commentaire",
        placeholderTitle: "Titre",
        placeholderComment: "Votre commentaire...",
        submit: "Envoyer",
        cancel: "Annuler",
        noComments: "Aucun commentaire pour le moment."
      },
      contact: {
        title: "Me Contacter",
        description: "Une question ou juste envie de dire bonjour ? Envoyez-moi un message ! 📩",
        emailPlaceholder: "Votre Email",
        subjectPlaceholder: "Sujet",
        messagePlaceholder: "Votre Message",
        sendButton: "Envoyer le message",
        sending: "Envoi en cours...",
        success: "Email envoyé avec succès ! ✅",
        error: "Erreur lors de l'envoi de l'email ❌"
      },
      educationExperience: {
        title: "Éducation & Expérience",
        education: "Éducation",
        experience: "Expérience",
        noEducation: "Aucune donnée sur l'éducation disponible.",
        noExperience: "Aucune donnée sur l'expérience disponible."
      },
      projects: {
        title: "Projets",
        noProjects: "Aucun projet disponible."
      },
      resume: {
        title: "CV",
        download: "Vous pouvez télécharger mon CV en cliquant",
        here: "ici"
      }
    }
  }
};

// ✅ Initialize i18next properly
i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // Fallback if translation is missing
  interpolation: { escapeValue: false }
});

export default i18n;






