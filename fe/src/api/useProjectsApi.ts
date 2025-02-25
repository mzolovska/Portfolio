import axiosInstance from "../shared/useAxiosInstance"; // ✅ Import axios instance correctly

// Define types
export interface ProjectResponseModel {
  projectId: string;
  title: string;
  description: string;
  technologies: string[]; // ✅ Change from string to string[]
  githubLink: string;
  imageUrl: string; // ✅ Added field
}

export interface ProjectRequestModel {
  title: string;
  description: string;
  technologies: string[]; // ✅ Change from string to string[]
  githubLink: string;
  imageUrl: string; // ✅ Added field
}



// Custom hook for Project API calls
export const useProjectsApi = () => {
  // Fetch All Projects (SSE Stream)
  const fetchAllProjects = async (): Promise<ProjectResponseModel[]> => {
    const projects: ProjectResponseModel[] = [];

    const response = await axiosInstance.get("/projects", {
      responseType: "text",
      headers: {
        Accept: "text/event-stream",
      },
    });

    // Parse SSE Stream
    const lines = response.data.split("\n");
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("data:")) {
        try {
          const project = JSON.parse(trimmedLine.substring(5).trim());
          projects.push(project);
        } catch (error) {
          console.error("Error parsing SSE event:", trimmedLine, error);
        }
      }
    }

    return projects;
  };

  // Fetch Project by ID
  const fetchProjectById = async (projectId: string): Promise<ProjectResponseModel> => {
    const response = await axiosInstance.get<ProjectResponseModel>(`/projects/${projectId}`);
    return response.data;
  };

  // Create Project
  const addProject = async (project: ProjectRequestModel): Promise<ProjectResponseModel> => {
    const response = await axiosInstance.post<ProjectResponseModel>("/projects", project);
    return response.data;
  };
  

  // Update Project
  const updateProject = async (projectId: string, project: ProjectRequestModel): Promise<ProjectResponseModel> => {
    const response = await axiosInstance.put<ProjectResponseModel>(`/projects/${projectId}`, project);
    return response.data;
  };

  // Delete Project
  const deleteProject = async (projectId: string): Promise<void> => {
    await axiosInstance.delete(`/projects/${projectId}`);
  };

  return {
    fetchAllProjects,
    fetchProjectById,
    addProject,
    updateProject,
    deleteProject,
  };
};
