import React, { useEffect, useState } from "react";
import { useProjectsApi, ProjectResponseModel, ProjectRequestModel } from "../api/useProjectsApi";
import ProjectCard from "./ProjectCard";
import Section from "../Section";
import { AdminControls } from "./AdminControls";
import "./Projects.css";

const Projects: React.FC = () => {
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
    console.log("Adding new project:", newProject);
    
    const formattedProject = {
      ...newProject,
      technologies: newProject.technologies,
    };
  
    try {
      const addedProject = await addProject(formattedProject);
      console.log("Project successfully added:", addedProject);
      
      if (!addedProject) {
        console.error("Error adding project!");
        return;
      }
  
      setProjects((prevProjects) => [...prevProjects, addedProject]); 
    } catch (error) {
      console.error("Error adding project!", error);
    }
  };

  const handleModifyProject = async (updatedProject: ProjectResponseModel) => {
    try {
      await updateProject(updatedProject.projectId, updatedProject);
      setProjects((prev) =>
        prev.map((p) => (p.projectId === updatedProject.projectId ? updatedProject : p))
      );
    } catch (error) {
      console.error("Error modifying project!", error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p.projectId !== projectId));
    } catch (error) {
      console.error("Error deleting project!", error);
    }
  };

  return (
    <section className="projects-section">
      <Section id="projects" title={"Projects"}>
        {/* Admin Add Button */}
        <AdminControls
          entityType={"Project"}
          fields={[
            { key: "title", label: "Projects" },
            { key: "description", label: "Description" },
            { key: "githubLink", label: "GitHub Link" },
            { key: "imageUrl", label: "Image URL" },
            { key: "projectLink", label: "Project Link" }
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
                  entityType={"Project"}
                  fields={[
                    { key: "title", label: "Projects" },
                    { key: "description", label: "Description" },
                    { key: "githubLink", label: "GitHub Link" },
                    { key: "imageUrl", label: "Image URL" },
                    { key: "projectLink", label: "Project Link" }
                  ]}
                  onAdd={handleAddProject}
                  onModify={handleModifyProject}
                  onDelete={() => handleDeleteProject(project.projectId)}
                />
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </Section>
    </section>
  );
};

export default Projects;
