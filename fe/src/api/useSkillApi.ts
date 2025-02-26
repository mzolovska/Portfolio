import axiosInstance from "../shared/useAxiosInstance";

export interface SkillsResponseModel {
  skillsId: string;
  name: string;
  icon: string;
}

export interface SkillsRequestModel {
  name: string;
  icon: string;
}

export const useSkillApi = () => {
  
  const fetchAllSkills = async (): Promise<SkillsResponseModel[]> => {
    const skillsList: SkillsResponseModel[] = [];

    const response = await axiosInstance.get("/skills", {
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
          const skills = JSON.parse(trimmedLine.substring(5).trim());
          skillsList.push(skills);
        } catch (error) {
          console.error("Error parsing SSE event:", trimmedLine, error);
        }
      }
    }

    return skillsList;
  };

  const createSkill = async (skill: SkillsRequestModel): Promise<SkillsResponseModel> => {
    const response = await axiosInstance.post("/skills", skill);
    return response.data;
  };

  const updateSkill = async (skillsId: string, skill: SkillsRequestModel): Promise<SkillsResponseModel> => {
    const response = await axiosInstance.put(`/skills/${skillsId}`, skill);
    return response.data;
  };

  const deleteSkill = async (skillsId: string): Promise<void> => {
    await axiosInstance.delete(`/skills/${skillsId}`);
  };

  return {
    fetchAllSkills,
    createSkill,
    updateSkill,
    deleteSkill,
  };
};
