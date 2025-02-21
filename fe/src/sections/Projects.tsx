import React, { useEffect, useState } from "react";
import { useProjectsApi, ProjectResponseModel } from "../api/useProjectsApi";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

const Projects: React.FC = () => {
  const { fetchAllProjects } = useProjectsApi();
  const [projects, setProjects] = useState<ProjectResponseModel[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchAllProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    loadProjects();
  }, []);

  return (
    <section className="projects-section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.projectId} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
