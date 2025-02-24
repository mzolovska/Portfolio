import React, { useState } from "react";
import { useContactApi } from "../api/useContactApi"; // ✅ Use API Hook
import "./Contact.css"; // Styling for the form
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa"; // Icons
import { useTranslation } from "react-i18next";


const Contact: React.FC = () => {
  const { t } = useTranslation();

  const { sendMessage } = useContactApi(); // ✅ Use API function
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await sendMessage(formData); // ✅ Use API function
      setStatus("Email sent successfully! ✅");
      setFormData({ email: "", subject: "", message: "" }); // Clear form
    } catch (error) {
      setStatus("Error sending email ❌");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
      <h2>{t("contact.title")}</h2>
      <p>{t("contact.description")}</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder={t("contact.emailPlaceholder")}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="subject"
              placeholder={t("contact.subjectPlaceholder")}
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <textarea
              name="message"
              placeholder={t("contact.messagePlaceholder")}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="send-button">
          <FaPaperPlane className="send-icon" /> {t("contact.sendButton")}
          </button>
        </form>

        {status && <p className="status-message">{t(status)}</p>}
        </div>
    </section>
  );
};

export default Contact;
