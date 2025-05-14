import React, { useEffect, useState } from "react";
import {
  useExperienceApi, ExperienceResponseModel, ExperienceRequestModel
} from "../api/useExperienceApi";
import {
  useEducationApi, EducationResponseModel, EducationRequestModel
} from "../api/useEducationApi";
import { AdminControls } from "./AdminControls";
import "./EducationExperience.css";
import Section from "../Section";

const EducationExperience = () => {
  const { fetchAllExperiences, createExperience, updateExperience, deleteExperience } = useExperienceApi();
  const { fetchAllEducation, createEducation, updateEducation, deleteEducation } = useEducationApi();

  const [experiences, setExperiences] = useState<ExperienceResponseModel[]>([]);
  const [education, setEducation] = useState<EducationResponseModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const educationData = await fetchAllEducation();
        const experienceData = await fetchAllExperiences();
        setEducation(educationData);
        setExperiences(experienceData);
      } catch (error) {
        console.error("Error fetching Education & Experience:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddExperience = async (data: ExperienceRequestModel) => {
    if (new Date(data.startDate) > new Date(data.endDate)) {
      alert("End date must be after start date.");
      return;
    }
    try {
      const created = await createExperience(data);
      setExperiences(prev => [...prev, created]);
    } catch (err) {
      console.error("Error adding experience:", err);
    }
  };

  const handleModifyExperience = async (data: ExperienceResponseModel) => {
    if (new Date(data.startDate) > new Date(data.endDate)) {
      alert("End date must be after start date.");
      return;
    }
    try {
      await updateExperience(data.experienceId, data);
      setExperiences(prev =>
        prev.map(exp => (exp.experienceId === data.experienceId ? data : exp))
      );
    } catch (err) {
      console.error("Error updating experience:", err);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    try {
      await deleteExperience(id);
      setExperiences(prev => prev.filter(exp => exp.experienceId !== id));
    } catch (err) {
      console.error("Error deleting experience:", err);
    }
  };

  const handleAddEducation = async (data: EducationRequestModel) => {
    if (new Date(data.startDate) > new Date(data.endDate)) {
      alert("End date must be after start date.");
      return;
    }
    try {
      const created = await createEducation(data);
      setEducation(prev => [...prev, created]);
    } catch (err) {
      console.error("Error adding education:", err);
    }
  };

  const handleModifyEducation = async (data: EducationResponseModel) => {
    if (new Date(data.startDate) > new Date(data.endDate)) {
      alert("End date must be after start date.");
      return;
    }
    try {
      await updateEducation(data.educationId, data);
      setEducation(prev =>
        prev.map(edu => (edu.educationId === data.educationId ? data : edu))
      );
    } catch (err) {
      console.error("Error updating education:", err);
    }
  };

  const handleDeleteEducation = async (id: string) => {
    try {
      await deleteEducation(id);
      setEducation(prev => prev.filter(edu => edu.educationId !== id));
    } catch (err) {
      console.error("Error deleting education:", err);
    }
  };

  return (
    <div className="education-experience-section">
      <Section id="education-experience" title="">
        {/* 🎓 Education Section */}
        <div className="section-box">
          <div className="section-inner">
            <div className="section-label">Education</div>
            <div className="section-content">
              {education
                .sort((a, b) => new Date(b.endDate || "").getTime() - new Date(a.endDate || "").getTime())
                .map((edu) => (
                  <div key={edu.educationId} className="entry-box">
                    <h3>{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p>{edu.institution}</p>
                    <span>{edu.startDate} - {edu.endDate}</span>
                    <AdminControls
                      entity={edu}
                      entityType="Education"
                      fields={[
                        { key: "degree", label: "Degree" },
                        { key: "fieldOfStudy", label: "Field of Study" },
                        { key: "institution", label: "Institution" },
                        { key: "startDate", label: "Start Date", type: "date" },
                        { key: "endDate", label: "End Date", type: "date" }
                      ]}
                      onModify={handleModifyEducation}
                      onDelete={() => handleDeleteEducation(edu.educationId)}
                    />
                  </div>
                ))}
              <AdminControls
                entityType="Education"
                fields={[
                  { key: "degree", label: "Degree" },
                  { key: "fieldOfStudy", label: "Field of Study" },
                  { key: "institution", label: "Institution" },
                  { key: "startDate", label: "Start Date", type: "date" },
                  { key: "endDate", label: "End Date", type: "date" }
                ]}
                onAdd={handleAddEducation}
                isSection
              />
            </div>
          </div>
        </div>

        {/* 💼 Experience Section */}
        <div className="section-box">
          <div className="section-inner">
            <div className="section-label">Experience</div>
            <div className="section-content">
              {experiences
                .sort((a, b) =>
                  new Date(b.endDate || new Date().toISOString()).getTime() -
                  new Date(a.endDate || new Date().toISOString()).getTime()
                )
                .map((exp) => (
                  <div key={exp.experienceId} className="entry-box">
                    <h3>{exp.role} at {exp.company}</h3>
                    <p>{exp.description}</p>
                    <span>{exp.startDate} - {exp.endDate}</span>
                    <AdminControls
                      entity={exp}
                      entityType="Experience"
                      fields={[
                        { key: "role", label: "Role" },
                        { key: "company", label: "Company" },
                        { key: "description", label: "Description" },
                        { key: "startDate", label: "Start Date", type: "date" },
                        { key: "endDate", label: "End Date", type: "date" }
                      ]}
                      onModify={handleModifyExperience}
                      onDelete={() => handleDeleteExperience(exp.experienceId)}
                    />
                  </div>
                ))}
              <AdminControls
                entityType="Experience"
                fields={[
                  { key: "role", label: "Role" },
                  { key: "company", label: "Company" },
                  { key: "description", label: "Description" },
                  { key: "startDate", label: "Start Date", type: "date" },
                  { key: "endDate", label: "End Date", type: "date" }
                ]}
                onAdd={handleAddExperience}
                isSection
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default EducationExperience;
