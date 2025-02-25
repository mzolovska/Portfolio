import React, { useEffect, useState } from "react";
import { useExperienceApi, ExperienceResponseModel, ExperienceRequestModel } from "../api/useExperienceApi";
import { useEducationApi, EducationResponseModel, EducationRequestModel } from "../api/useEducatoinApi";
import { AdminControls } from "./AdminControls"; // ✅ Import Admin Controls
import "./EducationExperience.css";
import Section from "../Section";
import { useTranslation } from "react-i18next";

const EducationExperience = () => {
  const { t } = useTranslation();

  const { fetchAllExperiences, createExperience, updateExperience, deleteExperience } = useExperienceApi();
  const { fetchAllEducation, createEducation, updateEducation, deleteEducation } = useEducationApi();

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

  // ✅ Handlers for Experience
  const handleModifyExperience = async (updatedData: ExperienceResponseModel) => {
    try {
      const updated = await updateExperience(updatedData.experienceId, {
        role: updatedData.role,
        company: updatedData.company,
        description: updatedData.description,
        startDate: updatedData.startDate,
        endDate: updatedData.endDate,
      });

      setExperiences((prev) =>
        prev.map((exp) => (exp.experienceId === updated.experienceId ? updated : exp))
      );
    } catch (error) {
      console.error("Error updating Experience:", error);
    }
  };

  const handleAddExperience = async (newData: ExperienceRequestModel) => {
    try {
      const created = await createExperience(newData);
      setExperiences((prev) => [...prev, created]);
    } catch (error) {
      console.error("Error adding Experience:", error);
    }
  };

  const handleDeleteExperience = async (experienceId: string) => {
    try {
      await deleteExperience(experienceId);
      setExperiences((prev) => prev.filter((exp) => exp.experienceId !== experienceId));
    } catch (error) {
      console.error("Error deleting Experience:", error);
    }
  };

  // ✅ Handlers for Education
  const handleModifyEducation = async (updatedData: EducationResponseModel) => {
    try {
      const updated = await updateEducation(updatedData.educationId, {
        degree: updatedData.degree,
        fieldOfStudy: updatedData.fieldOfStudy,
        institution: updatedData.institution,
        startDate: updatedData.startDate,
        endDate: updatedData.endDate,
      });

      setEducation((prev) =>
        prev.map((edu) => (edu.educationId === updated.educationId ? updated : edu))
      );
    } catch (error) {
      console.error("Error updating Education:", error);
    }
  };

  const handleAddEducation = async (newData: EducationRequestModel) => {
    try {
      const created = await createEducation(newData);
      setEducation((prev) => [...prev, created]);
    } catch (error) {
      console.error("Error adding Education:", error);
    }
  };

  const handleDeleteEducation = async (educationId: string) => {
    try {
      await deleteEducation(educationId);
      setEducation((prev) => prev.filter((edu) => edu.educationId !== educationId));
    } catch (error) {
      console.error("Error deleting Education:", error);
    }
  };

  return (
    <div className="sect">
      <Section id="education-experience" title={t("educationExperience.title")}>
        <div className="edu-exp-container">
          
          {/* 🎓 Education */}
          <div className="education">
            <h2>{t("educationExperience.education")}</h2>
            {/* Admin Add Button for Education */}
            <AdminControls
              entityType={t("educationExperience.education")}
              fields={[
                { key: "degree", label: t("educationExperience.adminControls.degree") },
                { key: "fieldOfStudy", label: t("educationExperience.adminControls.fieldOfStudy") },
                { key: "institution", label: t("educationExperience.adminControls.institution") },
                { key: "startDate", label: t("educationExperience.adminControls.startDate"), type: "date" },
                { key: "endDate", label: t("educationExperience.adminControls.endDate"), type: "date" },
              ]}
              onAdd={handleAddEducation}
              onModify={handleModifyEducation}
              onDelete={handleDeleteEducation}
              isSection
            />

            {education.length > 0 ? (
              education.map((edu) => (
                <div key={edu.educationId} className="edu-exp-card">
                  <h3>{edu.degree} {edu.fieldOfStudy}</h3>
                  <p>{edu.institution}</p>
                  <p>{edu.startDate} - {edu.endDate}</p>
                  
                  {/* Admin Controls for Each Education Item */}
                  <AdminControls
                    entity={edu}
                    entityType={t("educationExperience.education")}
                    fields={[
                      { key: "degree", label: t("educationExperience.adminControls.degree") },
                      { key: "fieldOfStudy", label: t("educationExperience.adminControls.fieldOfStudy") },
                      { key: "institution", label: t("educationExperience.adminControls.institution") },
                      { key: "startDate", label: t("educationExperience.adminControls.startDate"), type: "date" },
                      { key: "endDate", label: t("educationExperience.adminControls.endDate"), type: "date" },
                    ]}
                    onAdd={handleAddEducation}
                    onModify={handleModifyEducation}
                    onDelete={handleDeleteEducation}
                  />
                </div>
              ))
            ) : (
              <p>{t("educationExperience.noEducation")}</p>
            )}
          </div>

          {/* 💼 Experience */}
          <div className="experience">
            <h2>{t("educationExperience.experience")}</h2>
            {/* Admin Add Button for Experience */}
            <AdminControls
              entityType={t("educationExperience.experience")}
              fields={[
                { key: "role", label: t("educationExperience.adminControls.role") },
                { key: "company", label: t("educationExperience.adminControls.company") },
                { key: "description", label: t("educationExperience.adminControls.description") },
                { key: "startDate", label: t("educationExperience.adminControls.startDate"), type: "date" },
                { key: "endDate", label: t("educationExperience.adminControls.endDate"), type: "date" },
              ]}
              onAdd={handleAddExperience}
              onModify={handleModifyExperience}
              onDelete={handleDeleteExperience}
              isSection
            />

            {experiences.length > 0 ? (
              experiences.map((exp) => (
                <div key={exp.experienceId} className="edu-exp-card">
                  <h3>{exp.role} at {exp.company}</h3>
                  <p>{exp.description}</p>
                  <p>{exp.startDate} - {exp.endDate}</p>

                  {/* Admin Controls for Each Experience Item */}
                  <AdminControls
                    entity={exp}
                    entityType={t("educationExperience.experience")}
                    fields={[
                      { key: "role", label: t("educationExperience.adminControls.role") },
                      { key: "company", label: t("educationExperience.adminControls.company") },
                      { key: "description", label: t("educationExperience.adminControls.description") },
                      { key: "startDate", label: t("educationExperience.adminControls.startDate"), type: "date" },
                      { key: "endDate", label: t("educationExperience.adminControls.endDate"), type: "date" },
                    ]}
                    onAdd={handleAddExperience}
                    onModify={handleModifyExperience}
                    onDelete={handleDeleteExperience}
                  />
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
