import axiosInstance from "../shared/useAxiosInstance"; // ✅ Import axios instance correctly

// Define types
export interface EducationResponseModel {
  educationId: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string; // LocalDate format (YYYY-MM-DD)
  endDate: string;
}

export interface EducationRequestModel {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string; // LocalDate format (YYYY-MM-DD)
  endDate: string;
}

// Custom hook for Education API calls
export const useEducationApi = () => {
  // Fetch All Education Data (SSE Stream)
  const fetchAllEducation = async (): Promise<EducationResponseModel[]> => {
    const educationList: EducationResponseModel[] = [];

    const response = await axiosInstance.get("/education", {
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
          const education = JSON.parse(trimmedLine.substring(5).trim());
          educationList.push(education);
        } catch (error) {
          console.error("Error parsing SSE event:", trimmedLine, error);
        }
      }
    }

    return educationList;
  };

  // Fetch Education by ID
  const fetchEducationById = async (educationId: string): Promise<EducationResponseModel> => {
    const response = await axiosInstance.get<EducationResponseModel>(`/education/${educationId}`);
    return response.data;
  };

  // Create Education
  const createEducation = async (education: EducationRequestModel): Promise<EducationResponseModel> => {
    const response = await axiosInstance.post<EducationResponseModel>("/education", education);
    return response.data;
  };

  // Update Education
  const updateEducation = async (educationId: string, education: EducationRequestModel): Promise<EducationResponseModel> => {
    const response = await axiosInstance.put<EducationResponseModel>(`/education/${educationId}`, education);
    return response.data;
  };

  // Delete Education
  const deleteEducation = async (educationId: string): Promise<void> => {
    await axiosInstance.delete(`/education/${educationId}`);
  };

  return {
    fetchAllEducation,
    fetchEducationById,
    createEducation,
    updateEducation,
    deleteEducation,
  };
};
