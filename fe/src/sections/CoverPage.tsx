import React from 'react';
import { ReactTyped } from 'react-typed';
import './CoverPage.css'; // Add your CSS for the cover page
import { useTranslation } from "react-i18next";
import profileImage from "../assets/profile.jpg";


const CoverPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="cover-page">
      <div className="cover-content">
        <h1>
        <div className="about-image">
            <img src={profileImage} alt="Profile" />
          </div>
          <ReactTyped
          
            strings={["Hey there, my name is Mariya, and I am a developer."]}
            typeSpeed={50}
            backSpeed={30}
            showCursor={false}
          />
        </h1>
        <p>Scroll down to learn more about me!</p>
        <div className="scroll-indicator">↓</div>
      </div>
    </section>
  );
};

export default CoverPage;
