import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle smooth scrolling
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <button className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`overlay ${isOpen ? 'open' : ''}`}>
      <ul className="nav-links">
            <li><a href="#cover" onClick={() => handleScroll('cover')}>Home</a></li>
            <li><a href="#about" onClick={() => handleScroll('about')}>About Me</a></li>
            <li><a href="#experience" onClick={() => handleScroll('experience')}>Experience</a></li>
            <li><a href="#education" onClick={() => handleScroll('education')}>Education</a></li>
            <li><a href="#projects" onClick={() => handleScroll('projects')}>Projects</a></li>
            <li><a href="#resume" onClick={() => handleScroll('resume')}>Resume</a></li>
            <li><a href="#contact" onClick={() => handleScroll('contact')}>Contact</a></li>
            <li>
              <button className="login-button">Log In</button>
            </li>
          </ul>
      </div>
    </nav>
  );
};

export default Navbar;