import React from 'react';
import Section from '../Section';
import { useTranslation } from "react-i18next";

const Resume: React.FC = () => {
  const { t } = useTranslation();

  return (
   <div>
      <h2>Resume</h2>
      <p>
        You can download my resume by clicking{" "}
        <a href="/ResumeMariyaZolovska.pdf" download="My_Resume.pdf">
          here
        </a>
        !
      </p>
    </div>


  );
};

export default Resume;
