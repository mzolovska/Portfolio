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
    const modifiedExperience = await updateExperience(updatedExperience.experienceId, updatedExperience);
    setExperienceData((prev) => prev.map((exp) => (exp.experienceId === modifiedExperience.experienceId ? modifiedExperience : exp)));
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
          { key: "position", label: "Position" },
          { key: "description", label: "Description" },
          { key: "startDate", label: "Start Date", type: "date" },
          { key: "endDate", label: "End Date", type: "date" },
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
              {exp.company} - {exp.position} - {exp.description} ({exp.startDate} - {exp.endDate})
              <AdminControls
                entity={exp}
                entityType="Experience"
                fields={[
                  { key: "company", label: "Company" },
                  { key: "position", label: "Position" },
                  { key: "description", label: "Description" },
                  { key: "startDate", label: "Start Date", type: "date" },
                  { key: "endDate", label: "End Date", type: "date" },
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
