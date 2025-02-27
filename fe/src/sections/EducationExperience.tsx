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
  }, []); // Add dependencies
  

  // ✅ Handlers for Experience
  const handleModifyExperience = async (updatedData: ExperienceResponseModel) => {
    if (new Date(updatedData.startDate) > new Date(updatedData.endDate)) {
      alert("End date must be after start date.");
      return;
    }
    try {
      await updateExperience(updatedData.experienceId, updatedData);
      setExperiences((prev) =>
        prev.map((exp) => (exp.experienceId === updatedData.experienceId ? updatedData : exp))
      );
    } catch (error) {
      console.error("Error updating Experience:", error);
    }
  };

  const handleAddExperience = async (newData: ExperienceRequestModel) => {
    if (new Date(newData.startDate) > new Date(newData.endDate)) {
      alert("End date must be after start date.");
      return;
    }
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
    if (new Date(updatedData.startDate) > new Date(updatedData.endDate)) {
      alert("End date must be after start date.");
      return;
    }
    try {
      await updateEducation(updatedData.educationId, updatedData);
      setEducation((prev) =>
        prev.map((edu) => (edu.educationId === updatedData.educationId ? updatedData : edu))
      );
    } catch (error) {
      console.error("Error updating Education:", error);
    }
  };

  const handleAddEducation = async (newData: EducationRequestModel) => {
    if (new Date(newData.startDate) > new Date(newData.endDate)) {
      alert("End date must be after start date.");
      return;
    }
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
    <div className="education-experience-section">
      <Section id="education-experience" title="">
        
        {/* 🎓 Education Section */}
        <h2>Education</h2>
        <AdminControls
          entityType="Education"
          fields={[
            { key: "degree", label: "Degree" },
            { key: "fieldOfStudy", label: "Field of Study" },
            { key: "institution", label: "Institution" },
            { key: "startDate", label: "Start Date", type: "date" },
            { key: "endDate", label: "End Date", type: "date" },
          ]}
          onAdd={handleAddEducation}  // ✅ Add New Education Entry
          onModify={handleModifyEducation}
          onDelete={handleDeleteEducation}
          isSection={true} // Enables the "+ Add" button
        />
        <div className="timeline">
          {education.map((edu, index) => (
            <div key={edu.educationId} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
              <div className="timeline-content">
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
                    { key: "endDate", label: "End Date", type: "date" },
                  ]}
                  onAdd={handleAddEducation}
                  onModify={handleModifyEducation}
                  onDelete={handleDeleteEducation}
                />
              </div>
            </div>
          ))}
        </div>
  
        {/* 💼 Experience Section */}
        <h2>Experience</h2>
        <AdminControls
          entityType="Experience"
          fields={[
            { key: "role", label: "Role" },
            { key: "company", label: "Company" },
            { key: "description", label: "Description" },
            { key: "startDate", label: "Start Date", type: "date" },
            { key: "endDate", label: "End Date", type: "date" },
          ]}
          onAdd={handleAddExperience}  // ✅ Add New Experience Entry
          onModify={handleModifyExperience}
          onDelete={handleDeleteExperience}
          isSection={true} // Enables the "+ Add" button
        />
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={exp.experienceId} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
              <div className="timeline-content">
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
                    { key: "endDate", label: "End Date", type: "date" },
                  ]}
                  onAdd={handleAddExperience}
                  onModify={handleModifyExperience}
                  onDelete={handleDeleteExperience}
                />
              </div>
            </div>
          ))}
        </div>
  
      </Section>
    </div>
  );
}  

export default EducationExperience;