import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom"; // Import from React Router
import "./Navbar.css";
import { FaSignInAlt, FaGlobe } from "react-icons/fa";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the menu button
import { useTranslation } from "react-i18next";


const Navbar = () => {
  const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleLanguage = () => {
      const newLang = i18n.language === "en" ? "fr" : "en";
      i18n.changeLanguage(newLang);
      localStorage.setItem("language", newLang); // ✅ Save selection
    };


  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left Side - Logo */}
        <div className="nav-logo">
            Mariya Zolovska
        </div>

        {/* Hamburger Menu Button */}
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>


        {/* Center - Navigation Links */}
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><a href="#about">{t("navbar.about")}</a></li>

          <li><a href="#education-experience">{t("navbar.experience")}</a></li>

          <li><a href="#projects">{t("navbar.projects")}</a></li>

          <li><a href="#contact">{t("navbar.contact")}</a></li>

          <li><a href="#comments">{t("navbar.comments")}</a></li>
        </ul>

        {/* Right Side - Login & Translation */}
        <div className="nav-icons">
          {/* ✅ Fix: Use `Link` instead of `useNavigate()` */}
          <Link to="/login" className="nav-btn">
            <FaSignInAlt size={20} />
          </Link>

          {/* Translation Icon */}
          <button className="nav-btn" onClick={toggleLanguage}>
            <FaGlobe size={20} /> {i18n.language.toUpperCase()}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
