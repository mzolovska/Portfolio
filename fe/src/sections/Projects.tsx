import { useEffect, useState } from "react";
import { useProjectsApi, ProjectResponseModel, ProjectRequestModel } from "../api/useProjectsApi";
import { AdminControls } from "./AdminControls";
import "./Projects.css";

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
      console.log("Modified project:", updated); // Debugging

      setProjectList((prev) =>
        prev.map((proj) => 
          proj.projectId === updated.projectId ? { ...updated} : proj)
      );
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleAdd = async (newData: ProjectRequestModel) => {
    try {
      const created = await createProject(newData);
      setProjectList((prev) => [...prev, created]); // Add new project to the list
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      console.log("Deleting project ID:", projectId); // Debugging log
      await deleteProject(projectId);
      setProjectList((prev) => prev.filter((proj) => proj.projectId !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      <h2>Projects</h2>

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
        isSection={true} // Ensures it's a general add button for projects
      />

      {/* List of Projects */}
      {projectList.length > 0 ? (
        projectList.map((projectData) => (
          <div key={projectData.projectId} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p><strong>{projectData.title}</strong></p>
            <p>{projectData.description}</p>
            <p>{projectData.technologies}</p>
            <p>{projectData.link}</p>

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
  );
};

export default Projects;
