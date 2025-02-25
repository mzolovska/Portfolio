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
        name: "Name",
        description: "Description",
        noData: "No information available.",
        skills: "Skills & Technologies",
        adminControls: {
          add: "Add About Me Section",
          edit: "Edit About Me",
          delete: "Delete About Me",
          name: "Enter Name",
          description: "Enter Description",
        },
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
        degree: "Degree",
        fieldOfStudy: "Field of Study",
        institution: "Institution",
        startDate: "Start Date",
        endDate: "End Date",
        role: "Role",
        company: "Company",
        description: "Description",
        noEducation: "No education records available.",
        noExperience: "No experience records available."
      },
      projects: {
        title: "Projects",
        entity: "Project",
        titleLabel: "Title",
        descriptionLabel: "Description",
        technologiesLabel: "Technologies",
        githubLabel: "GitHub Link",
        imageLabel: "Image URL",
        noProjects: "No projects available.",
        addingProject: "Adding new project:",
        addSuccess: "Project successfully added:",
        addError: "Error adding project!",
        modifyError: "Error modifying project!",
        deleteError: "Error deleting project!"
      },
      resume: {
        title: "Resume",
        download: "You can download my resume by clicking",
        here: "here"
      },
      adminControls: {
        add: "Add {{entity}}",
        edit: "Edit {{entity}}",
        delete: "Delete {{entity}}",
        addTitle: "Add New {{entity}}",
        modifyTitle: "Modify {{entity}}",
        confirmDeleteTitle: "Confirm Delete",
        confirmDeleteMessage: "Are you sure you want to delete this {{entity}}?",
        addButton: "Add",
        saveButton: "Save",
        deleteButton: "Delete",
        cancel: "Cancel"
      },
      
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
        name: "Nom",
        description: "Description",
        noData: "Aucune information disponible.",
        skills: "Compétences et Technologies",
        adminControls: {
          add: "Ajouter une section À propos de moi",
          edit: "Modifier À propos de moi",
          delete: "Supprimer À propos de moi",
          name: "Entrez le nom",
          description: "Entrez la description",
        },
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
        degree: "Diplôme",
        fieldOfStudy: "Domaine d'étude",
        institution: "Établissement",
        startDate: "Date de début",
        endDate: "Date de fin",
        role: "Poste",
        company: "Entreprise",
        description: "Description",
        noEducation: "Aucun enregistrement d'éducation disponible.",
        noExperience: "Aucune expérience disponible."
      },
      projects: {
        title: "Projets",
        entity: "Projet",
        titleLabel: "Titre",
        descriptionLabel: "Description",
        technologiesLabel: "Technologies",
        githubLabel: "Lien GitHub",
        imageLabel: "URL de l'image",
        noProjects: "Aucun projet disponible.",
        addingProject: "Ajout d'un nouveau projet :",
        addSuccess: "Projet ajouté avec succès :",
        addError: "Erreur lors de l'ajout du projet !",
        modifyError: "Erreur lors de la modification du projet !",
        deleteError: "Erreur lors de la suppression du projet !"
      },
      resume: {
        title: "CV",
        download: "Vous pouvez télécharger mon CV en cliquant",
        here: "ici"
      },
      adminControls: {
        add: "Ajouter {{entity}}",
        edit: "Modifier {{entity}}",
        delete: "Supprimer {{entity}}",
        addTitle: "Ajouter un(e) nouveau(elle) {{entity}}",
        modifyTitle: "Modifier {{entity}}",
        confirmDeleteTitle: "Confirmer la suppression",
        confirmDeleteMessage: "Êtes-vous sûr de vouloir supprimer ce(tte) {{entity}} ?",
        addButton: "Ajouter",
        saveButton: "Enregistrer",
        deleteButton: "Supprimer",
        cancel: "Annuler"
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






