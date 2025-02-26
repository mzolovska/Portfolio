import React, { useEffect, useState } from "react";
import { useExperienceApi, ExperienceResponseModel, ExperienceRequestModel } from "../api/useExperienceApi";
import { useEducationApi, EducationResponseModel, EducationRequestModel } from "../api/useEducationApi";
import { AdminControls } from "./AdminControls"; // ✅ Import Admin Controls
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
    if (new Date(updatedData.startDate) > new Date(updatedData.endDate)) {
      alert("End date must be after start date.");
      return; // ⛔ Stop execution
    }
  
    try {
      await updateExperience(updatedData.experienceId, { ...updatedData });
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.experienceId === updatedData.experienceId ? updatedData : exp
        )
      );

  
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.experienceId === updatedData.experienceId ? updatedData : exp
        )
      );
    } catch (error) {
      console.error("Error updating Experience:", error);
    }
  };
  
  

  const handleAddExperience = async (newData: ExperienceRequestModel) => {
    if (new Date(newData.startDate) > new Date(newData.endDate)) {
      alert("End date must be after start date.");
      return; // ⛔ Stop execution
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
      return; // ⛔ Stop execution
    }
  
    try {
      await updateEducation(updatedData.educationId, { ...updatedData });
        setEducation((prev) =>
          prev.map((edu) =>
            edu.educationId === updatedData.educationId ? updatedData : edu
          )
        );

  
      setEducation((prev) =>
        prev.map((edu) =>
          edu.educationId === updatedData.educationId ? updatedData : edu
        )
      );
    } catch (error) {
      console.error("Error updating Education:", error);
    }
  };
  

  
  const handleAddEducation = async (newData: EducationRequestModel) => {
    if (new Date(newData.startDate) > new Date(newData.endDate)) {
      alert("End date must be after start date.");
      return; // ⛔ Stop execution
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
    <div className="sect">
      <Section id="education-experience" title={"Education & Experience"}>
        <div className="edu-exp-container">
          
          {/* 🎓 Education */}
          <div className="education">
            <h2>Education</h2>
            {/* Admin Add Button for Education */}
            <AdminControls
              entityType={"Education"}
              fields={[
                { key: "degree", label: "Degree"},
                { key: "fieldOfStudy", label: "Field of Study" },
                { key: "institution", label: "Institution" },
                { key: "startDate", label: "Start Date", type: "date" },
                { key: "endDate", label: "End Date", type: "date" },
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
                    entityType={"Education"}
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
              ))
            ) : (
              <p>No education records available.</p>
            )}
          </div>

          {/* 💼 Experience */}
          <div className="experience">
            <h2>Experience</h2>
            {/* Admin Add Button for Experience */}
            <AdminControls
              entityType={"Experience"}
              fields={[
                { key: "role", label:"Role" },
                { key: "company", label: "Company"},
                { key: "description", label: "Description" },
                { key: "startDate", label: "Start Date", type: "date" },
                { key: "endDate", label: "End Date", type: "date" },
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
                    entityType={"Experience"}
                    fields={[
                      { key: "role", label:"Role" },
                      { key: "company", label: "Company"},
                      { key: "description", label: "Description" },
                      { key: "startDate", label: "Start Date", type: "date" },
                      { key: "endDate", label: "End Date", type: "date" },
                    ]}
                    onAdd={handleAddExperience}
                    onModify={handleModifyExperience}
                    onDelete={handleDeleteExperience}
                  />
                </div>
              ))
            ) : (
              <p>No experience records available.</p>
            )}
          </div>

        </div>
      </Section>
    </div>
  );
};

export default EducationExperience;
