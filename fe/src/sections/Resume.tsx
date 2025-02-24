import React from 'react';
import Section from '../Section';
import { useTranslation } from "react-i18next";

const Resume: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
        <ul>
        <li>
          <h2>{t("resume.title")}</h2>
          {t("resume.download")}{" "}
          <a href="/ResumeMariyaZolovska.pdf" download="My_Resume.pdf">
            {t("resume.here")}
          </a>
          !
        </li>
        </ul>
    </div>
  );
};

export default Resume;
