import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle smooth scrolling
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close the menu after clicking a link
    }
  };

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <button className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`overlay ${isOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li><a href="/home" onClick={() => handleScroll("home")}>Home</a></li>
          <li><a href="#about" onClick={() => handleScroll("about")}>About Me</a></li>
          <li><a href="#experience" onClick={() => handleScroll("experience")}>Experience</a></li>
          <li><a href="#education" onClick={() => handleScroll("education")}>Education</a></li>
          <li><a href="#projects" onClick={() => handleScroll("projects")}>Projects</a></li>
          <li><a href="#contact" onClick={() => handleScroll("contact")}>Contact & Resume</a></li>
          <li><a href="#comments" onClick={() => handleScroll("comments")}>Comments</a></li>
          <li>
            {isAuthenticated ? (
              <button className="logout-button" onClick={() => logout({ returnTo: window.location.origin })}>
                Log Out
              </button>
            ) : (
              <button className="login-button" onClick={() => loginWithRedirect()}>
                Log In
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
