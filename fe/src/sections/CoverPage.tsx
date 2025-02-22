import React from 'react';
import { ReactTyped } from 'react-typed';
import './CoverPage.css'; // Add your CSS for the cover page

const CoverPage: React.FC = () => {
  return (
    <section id="home" className="cover-page">
      <div className="cover-content">
        <h1>
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
