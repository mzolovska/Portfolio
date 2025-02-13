import React from 'react';
import Section from '../Section';
import './Experience.css';
import { useEffect, useState } from "react";
import { useExperienceApi, ExperienceResponseModel } from '../api/useExperienceApi';


const Experience = () => {
  const { fetchAllExperiences } = useExperienceApi();
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

  return (
    <Section id="experience" title="Experience">
      {experienceData.length > 0 ? (
        <ul>
          {experienceData.map((exp) => (
            <li key={exp.experienceId}>
              {exp.company} - {exp.position} - {exp.description} ({exp.startDate} - {exp.endDate})
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