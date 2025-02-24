import React from 'react';
import { ReactTyped } from 'react-typed';
import './CoverPage.css'; // Add your CSS for the cover page
import { useTranslation } from "react-i18next";


const CoverPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="cover-page">
      <div className="cover-content">
        <h1>
          <ReactTyped
            strings={[t("coverPage.greeting")]}
            typeSpeed={50}
            backSpeed={30}
            showCursor={false}
          />
        </h1>
        <p>{t("coverPage.scroll")}</p>
        <div className="scroll-indicator">↓</div>
      </div>
    </section>
  );
};

export default CoverPage;
