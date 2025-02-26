import { FaLinkedin, FaGithub } from "react-icons/fa";
import "./Footer.css";
import { useTranslation } from "react-i18next";


const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/mariya-zolovska-8b1271329/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} />
        </a>
        <a href="https://github.com/mzolovska" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} />
        </a>
      </div>
      <p>© 2025 Mariya Zolovska. All Rights Reserved.</p>

    </footer>
  );
};

export default Footer;
