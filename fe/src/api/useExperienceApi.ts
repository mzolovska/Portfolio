import axiosInstance from "../shared/useAxiosInstance"; // ✅ Import axios instance correctly

// Define types
export interface ExperienceResponseModel {
  experienceId: string;
  company: string;
  role: string;
  startDate: string; // LocalDate format (YYYY-MM-DD)
  endDate: string;
  description: string;
}

export interface ExperienceRequestModel {
  company: string;
  role: string;
  startDate: string; // LocalDate format (YYYY-MM-DD)
  endDate: string;
  description: string;
}

// Custom hook for Experience API calls
export const useExperienceApi = () => {
  // Fetch All Experience Data (SSE Stream)
  const fetchAllExperiences = async (): Promise<ExperienceResponseModel[]> => {
    const experiences: ExperienceResponseModel[] = [];

    const response = await axiosInstance.get("/experience", {
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
          const experience = JSON.parse(trimmedLine.substring(5).trim());
          experiences.push(experience);
        } catch (error) {
          console.error("Error parsing SSE event:", trimmedLine, error);
        }
      }
    }

    return experiences;
  };

  // Fetch Experience by ID
  const fetchExperienceById = async (experienceId: string): Promise<ExperienceResponseModel> => {
    const response = await axiosInstance.get<ExperienceResponseModel>(`/experience/${experienceId}`);
    return response.data;
  };

  // Create Experience
  const createExperience = async (experience: ExperienceRequestModel): Promise<ExperienceResponseModel> => {
    const response = await axiosInstance.post<ExperienceResponseModel>("/experience", experience);
    return response.data;
  };

  // Update Experience
  const updateExperience = async (experienceId: string, experience: ExperienceRequestModel): Promise<ExperienceResponseModel> => {
    const response = await axiosInstance.put<ExperienceResponseModel>(`/experience/${experienceId}`, experience);
    return response.data;
  };

  // Delete Experience
  const deleteExperience = async (experienceId: string): Promise<void> => {
    await axiosInstance.delete(`/experience/${experienceId}`);
  };

  return {
    fetchAllExperiences,
    fetchExperienceById,
    createExperience,
    updateExperience,
    deleteExperience,
  };
};
