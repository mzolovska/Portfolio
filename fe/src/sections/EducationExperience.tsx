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

  return (
    <div className="education-experience-section">
      <Section id="education-experience" title="">

        {/* 🎓 Education */}
      <div className="section-box">
      <div className="section-inner">
        <div className="section-label">Education</div>
        <div className="section-content">
          {education
          .sort((a, b) => {
            const dateA = a.endDate?.toLowerCase() === "present" || !a.endDate
              ? new Date()
              : new Date(a.endDate);
            const dateB = b.endDate?.toLowerCase() === "present" || !b.endDate
              ? new Date()
              : new Date(b.endDate);
            return dateB.getTime() - dateA.getTime();
          })
          .map((edu) => (
            <div key={edu.educationId} className="entry-box">
              <h3>{edu.degree} in {edu.fieldOfStudy}</h3>
              <p>{edu.institution}</p>
              <span>{edu.startDate} - {edu.endDate}</span>
              <AdminControls
                entity={edu}
                entityType="Education"
                fields={[/* ... */]}
                onAdd={() => {}}
                onModify={async (data) => await updateEducation(edu.educationId, data)}
                onDelete={async () => await deleteEducation(edu.educationId)}
              />
            </div>
          ))}
          <AdminControls
            entityType="Education"
            fields={[/* ... */]}
            onAdd={async (newData) => {
              const created = await createEducation(newData);
              setEducation(prev => [...prev, created]);
            }}
            onModify={() => {}}
            onDelete={() => {}}
            isSection
          />
        </div>
        </div>
      </div>


        {/* 💼 Experience */}
        <div className="section-box">
        <div className="section-inner">

          <div className="section-label">Experience</div>
          <div className="section-content">
            {experiences
            .sort((a, b) => {
              const dateA = a.endDate?.toLowerCase() === "present" || !a.endDate
                ? new Date()
                : new Date(a.endDate);
              const dateB = b.endDate?.toLowerCase() === "present" || !b.endDate
                ? new Date()
                : new Date(b.endDate);
              return dateB.getTime() - dateA.getTime();
            })
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
                    { key: "endDate", label: "End Date", type: "date" },
                  ]}
                  onAdd={() => {}}
                  onModify={async (data) => await updateExperience(exp.experienceId, data)}
                  onDelete={async () => await deleteExperience(exp.experienceId)}
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
                { key: "endDate", label: "End Date", type: "date" },
              ]}
              onAdd={async (newData) => {
                const created = await createExperience(newData);
                setExperiences(prev => [...prev, created]);
              }}
              onModify={() => {}}
              onDelete={() => {}}
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
