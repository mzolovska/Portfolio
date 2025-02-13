import React from 'react';
import Section from '../Section';
import './Projects.css';
import { useEffect, useState } from "react";
import { useProjectsApi, ProjectResponseModel } from '../api/useProjectsApi';


const Projects = () => {
  const { fetchAllProjects } = useProjectsApi();
  const [projectData, setProjectData] = useState<ProjectResponseModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllProjects();
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching Project data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Section id="projects" title="Projects">
      {projectData.length > 0 ? (
        <ul>
          {projectData.map((proj) => (
            <li key={proj.projectId}>
              {proj.name} - {proj.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </Section>
  );
};

export default Projects;