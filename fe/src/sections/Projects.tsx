import React, { useEffect, useState } from "react";
import { useProjectsApi, ProjectResponseModel, ProjectRequestModel } from "../api/useProjectsApi";
import ProjectCard from "./ProjectCard";
import Section from "../Section";
import { useTranslation } from "react-i18next";
import { AdminControls } from "./AdminControls";
import "./Projects.css";

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { fetchAllProjects, createProject, updateProject, deleteProject } = useProjectsApi();
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
    console.log("Adding new project:", newProject);
    try {
      const addedProject = await createProject(newProject);
      console.log("Project successfully added:", addedProject);
      
      if (!addedProject) {
        console.error("No project returned from API!");
        return;
      }
  
      setProjects((prevProjects) => [...prevProjects, addedProject]); 
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  

  const handleModifyProject = async (updatedProject: ProjectResponseModel) => {
    try {
      await updateProject(updatedProject.projectId, updatedProject);
      setProjects((prev) =>
        prev.map((p) => (p.projectId === updatedProject.projectId ? updatedProject : p))
      );
    } catch (error) {
      console.error("Error modifying project:", error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p.projectId !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <section className="projects-section">
      <Section id="projects" title={t("projects.title")}>
        {/* Admin Add Button */}
        <AdminControls
          entityType="Project"
          fields={[
            { key: "title", label: "Title" },
            { key: "description", label: "Description" },
            { key: "technologies", label: "Technologies (comma-separated)" },
            { key: "githubLink", label: "GitHub Link" },
            { key: "imageUrl", label: "Image URL" }
          ]}
          onAdd={handleAddProject}
          onModify={handleModifyProject}
          onDelete={handleDeleteProject}
          isSection = {true}
        />

        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.projectId} className="project-card-container">
                <ProjectCard project={project} />
                {/* Admin Modify & Delete Controls */}
                <AdminControls
                  entity={project}
                  entityType="Project"
                  fields={[
                    { key: "title", label: "Title" },
                    { key: "description", label: "Description" },
                    { key: "technologies", label: "Technologies (comma-separated)" },
                    { key: "githubLink", label: "GitHub Link" },
                    { key: "imageUrl", label: "Image URL" }
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