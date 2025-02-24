import React, { useEffect, useState } from "react";
import { useExperienceApi, ExperienceResponseModel } from "../api/useExperienceApi";
import { useEducationApi, EducationResponseModel } from "../api/useEducatoinApi";
import "./EducationExperience.css";
import Section from "../Section";
import { useTranslation } from "react-i18next";


const EducationExperience = () => {
  const { t } = useTranslation();

  const { fetchAllExperiences } = useExperienceApi();
  const { fetchAllEducation } = useEducationApi();

  const [experiences, setExperiences] = useState<ExperienceResponseModel[]>([]);
  const [education, setEducation] = useState<EducationResponseModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expData = await fetchAllExperiences();
        const eduData = await fetchAllEducation();
        setExperiences(expData);
        setEducation(eduData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="sect">
    <Section id="education-experience" title={t("educationExperience.title")}>
    <div className="edu-exp-container">
        {/* Education */}
        <div className="education">
        <h2>{t("educationExperience.education")}</h2>
        {education.length > 0 ? (
            education.map((edu, index) => (
              <div key={index} className="edu-exp-card">
                <h3>{edu.degree} {edu.fieldOfStudy}</h3>
                <p>{edu.institution}</p>
                <p>{edu.startDate} - {edu.endDate}</p>
              </div>
            ))
          ) : (
            <p>{t("educationExperience.noEducation")}</p>
          )}
        </div>

        {/* Experience */}
        <div className="experience">
        <h2>{t("educationExperience.experience")}</h2>
        {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={index} className="edu-exp-card">
                <h3>{exp.role} at {exp.company}</h3>
                <p>{exp.description}</p>
                <p>{exp.startDate} - {exp.endDate}</p>
              </div>
            ))
          ) : (
            <p>{t("educationExperience.noExperience")}</p>
          )}
        </div>
      </div>
    </Section>
    </div>
  );
};

export default EducationExperience;
