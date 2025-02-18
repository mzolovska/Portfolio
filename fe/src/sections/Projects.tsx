import { useEffect, useState } from "react";
import { useProjectsApi, ProjectResponseModel, ProjectRequestModel } from "../api/useProjectsApi";
import { AdminControls } from "./AdminControls";
import "./Projects.css";
import Section from "../Section";

const Projects = () => {
  const { fetchAllProjects, createProject, updateProject, deleteProject } = useProjectsApi();
  const [projectList, setProjectList] = useState<ProjectResponseModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await fetchAllProjects();
        setProjectList(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, []);

  const handleModify = async (updatedProject: ProjectResponseModel) => {
    try {
      const updated = await updateProject(updatedProject.projectId, updatedProject);
      console.log("Modified project:", updated); // Debugging log

      setProjectList((prev) =>
        prev.map((proj) => (proj.projectId === updated.projectId ? updated : proj))
      );
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleAdd = async (newData: ProjectRequestModel) => {
    try {
      const created = await createProject(newData);
      setProjectList((prev) => [...prev, created]);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      console.log("Deleting project ID:", projectId);
      await deleteProject(projectId);
      setProjectList((prev) => prev.filter((proj) => proj.projectId !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="projects-page">
      <Section id="projects" title="Projects">

      {/* Global Add Button for Projects section */}
      <AdminControls
        entityType="Project"
        fields={[
          { key: "title", label: "Project Name" },
          { key: "description", label: "Description" },
          { key: "technologies", label: "Technologies" },
          { key: "link", label: "Link" },
        ]}
        onAdd={handleAdd}
                onModify={handleModify}
                onDelete={handleDelete}
        isSection
      />

      {/* List of Projects */}
      <div className="projects-container">
        {projectList.length > 0 ? (
          projectList.map((projectData) => (
            <div key={projectData.projectId} className="project-card">
              <p><strong>{projectData.title}</strong></p>
              <p>{projectData.description}</p>
              <p><strong>Tech:</strong> {projectData.technologies}</p>
              {projectData.link && (
                <p>
                  <a href={projectData.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Project
                  </a>
                </p>
              )}

              {/* Admin Controls for Modify/Delete */}
              <AdminControls
                entity={projectData}
                entityType="Project"
                fields={[
                  { key: "title", label: "Project Name" },
                  { key: "description", label: "Description" },
                  { key: "technologies", label: "Technologies" },
                  { key: "link", label: "Link" },
                ]}
                onAdd={handleAdd}
                onModify={handleModify}
                onDelete={handleDelete}
              />
            </div>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </div>
      </Section>
    </div>
  );
};

export default Projects;
