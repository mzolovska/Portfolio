import React, { useEffect, useState } from "react";
import { useProjectsApi, ProjectResponseModel } from "../api/useProjectsApi";
import ProjectCard from "./ProjectCard";
import "./Projects.css";
import Section from "../Section";
import { useTranslation } from "react-i18next";

const Projects: React.FC = () => {
  const { t } = useTranslation();

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
      <Section id="projects" title={t("projects.title")}>
        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.projectId} project={project} />
            ))
          ) : (
            <p>{t("projects.noProjects")}</p>
          )}
        </div>
      </Section>
    </section>
  );
};

export default Projects;
