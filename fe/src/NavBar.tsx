import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom"; // Import from React Router
import "./Navbar.css";
import { FaSignInAlt, FaSignOutAlt, FaGlobe } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the menu button
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";




const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0(); // ✅ Get Auth0 user info


    // const toggleLanguage = () => {
    //   const newLang = i18n.language === "en" ? "fr" : "en";
    //   i18n.changeLanguage(newLang);
    //   localStorage.setItem("language", newLang); // ✅ Save selection
    // };

    const toggleLanguage = () => {
      const currentLang = document.documentElement.lang || "en"; // Get current language
      const newLang = currentLang === "en" ? "fr" : "en";
  
      const googleTranslateFrame = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (googleTranslateFrame) {
        googleTranslateFrame.value = newLang;
        googleTranslateFrame.dispatchEvent(new Event("change"));
      }
  
      document.documentElement.lang = newLang; // Update HTML lang attribute
      localStorage.setItem("language", newLang); // Save language preference
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
        <li><a href="#about">About</a></li>

          <li><a href="#education-experience">Experience&Education</a></li>

          <li><a href="#projects">Projects</a></li>

          <li><a href="#contact">Contact</a></li>

          <li><a href="#comments">Comments</a></li>
        </ul>

        {/* Right Side - Login & Translation */}
        <div className="nav-icons">
        {isAuthenticated ? (
            <>
              <span className="user-name">{user?.name}</span>
              <button
                className="nav-btn"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                <FaSignOutAlt size={20} /> Logout
              </button>
            </>
          ) : (
            <button className="nav-btn" onClick={() => loginWithRedirect()}>
              <FaSignInAlt size={20} /> Login
            </button>
          )}
          </div>

          {/* Translation Icon */}
          <button className="nav-btn" onClick={toggleLanguage}>
          <FaGlobe size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
