import React, { useEffect, useState } from "react";
import { useProjectsApi, ProjectResponseModel, ProjectRequestModel } from "../api/useProjectsApi";
import ProjectCard from "./ProjectCard";
import Section from "../Section";
import { useTranslation } from "react-i18next";
import { AdminControls } from "./AdminControls";
import "./Projects.css";

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { fetchAllProjects, addProject, updateProject, deleteProject } = useProjectsApi();
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

  const handleAddProject = async (newProject: ProjectRequestModel) => {
    console.log(t("projects.addingProject"), newProject);
    
    const formattedProject = {
      ...newProject,
      technologies: newProject.technologies,
    };
  
    try {
      const addedProject = await addProject(formattedProject);
      console.log(t("projects.addSuccess"), addedProject);
      
      if (!addedProject) {
        console.error(t("projects.addError"));
        return;
      }
  
      setProjects((prevProjects) => [...prevProjects, addedProject]); 
    } catch (error) {
      console.error(t("projects.addError"), error);
    }
  };

  const handleModifyProject = async (updatedProject: ProjectResponseModel) => {
    try {
      await updateProject(updatedProject.projectId, updatedProject);
      setProjects((prev) =>
        prev.map((p) => (p.projectId === updatedProject.projectId ? updatedProject : p))
      );
    } catch (error) {
      console.error(t("projects.modifyError"), error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p.projectId !== projectId));
    } catch (error) {
      console.error(t("projects.deleteError"), error);
    }
  };

  return (
    <section className="projects-section">
      <Section id="projects" title={t("projects.title")}>
        {/* Admin Add Button */}
        <AdminControls
          entityType={t("projects.entity")}
          fields={[
            { key: "title", label: t("projects.titleLabel") },
            { key: "description", label: t("projects.descriptionLabel") },
            { key: "githubLink", label: t("projects.githubLabel") },
            { key: "imageUrl", label: t("projects.imageLabel") },
            { key: "projectLink", label: t("projects.projectLinkLabel") }
          ]}
          onAdd={handleAddProject}
          onModify={handleModifyProject}
          onDelete={handleDeleteProject}
          isSection={true}
        />

        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.projectId} className="project-card-container">
                <ProjectCard project={project} />
                {/* Admin Modify & Delete Controls */}
                <AdminControls
                  entity={project}
                  entityType={t("projects.entity")}
                  fields={[
                    { key: "title", label: t("projects.titleLabel") },
                    { key: "description", label: t("projects.descriptionLabel") },
                    { key: "technologies", label: t("projects.technologiesLabel") },
                    { key: "githubLink", label: t("projects.githubLabel") },
                    { key: "imageUrl", label: t("projects.imageLabel") },
                    { key: "projectLink", label: t("projects.projectLinkLabel") }

                  ]}
                  onAdd={handleAddProject}
                  onModify={handleModifyProject}
                  onDelete={() => handleDeleteProject(project.projectId)}
                />
              </div>
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
