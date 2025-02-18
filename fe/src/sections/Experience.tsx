import React, { useEffect, useState } from "react";
import Section from "../Section";
import "./Experience.css";
import { useExperienceApi, ExperienceResponseModel } from "../api/useExperienceApi";
import { AdminControls } from "./AdminControls";

const Experience = () => {
  const { fetchAllExperiences, createExperience, updateExperience, deleteExperience } = useExperienceApi();
  const [experienceData, setExperienceData] = useState<ExperienceResponseModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllExperiences();
        setExperienceData(data);
      } catch (error) {
        console.error("Error fetching Experience data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (newExperience: ExperienceResponseModel) => {
    const addedExperience = await createExperience(newExperience);
    setExperienceData((prev) => [...prev, addedExperience]);
  };

  const handleModify = async (updatedExperience: ExperienceResponseModel) => {
  try {
    const modifiedExperience = await updateExperience(updatedExperience.experienceId, updatedExperience);
    console.log("Modified experience:", modifiedExperience); // Debugging

    setExperienceData((prev) =>
      prev.map((exp) =>
        exp.experienceId === modifiedExperience.experienceId ? { ...modifiedExperience } : exp
      )
    );
  } catch (error) {
    console.error("Error updating experience:", error);
  }
};


  const handleDelete = async (id: string) => {
    await deleteExperience(id);
    setExperienceData((prev) => prev.filter((exp) => exp.experienceId !== id));
  };

  return (
    <Section id="experience" title="Experience">
      <AdminControls
        entityType="Experience"
        fields={[
          { key: "company", label: "Company" },
          { key: "role", label: "Role" },
          { key: "description", label: "Description" },
          { key: "startYear", label: "Start Year", type: "number" },
          { key: "startYear", label: "End Year", type: "number" },
        ]}
        onModify={handleModify}
        onAdd={handleAdd}
        onDelete={handleDelete}
        isSection
      />

      {experienceData.length > 0 ? (
        <ul>
          {experienceData.map((exp) => (
            <li key={exp.experienceId}>
              {exp.company} - {exp.role} - {exp.description} ({exp.startYear} - {exp.endYear})
              <AdminControls
                entity={exp}
                entityType="Experience"
                fields={[
                  { key: "company", label: "Company" },
                  { key: "role", label: "Role" },
                  { key: "description", label: "Description" },
                  { key: "startYear", label: "Start Year", type: "number" },
                  { key: "endYear", label: "End Year", type: "number" },
                ]}
                onModify={handleModify}
                onAdd={handleAdd}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </Section>
  );
};

export default Experience;
