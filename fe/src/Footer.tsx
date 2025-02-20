import { FaLinkedin, FaGithub } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
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
      <p>© {new Date().getFullYear()} Mariya Zolovska. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
