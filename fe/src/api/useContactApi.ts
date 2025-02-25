import axiosInstance  from "../shared/useAxiosInstance";

export interface ContactRequestModel {
  email: string;
  subject: string;
  message: string;
}

// Custom hook for Contact API calls
export const useContactApi = () => {

  // Send Contact Message
  const sendMessage = async (contact: ContactRequestModel): Promise<string> => {
    const response = await axiosInstance.post<string>("/contact", contact);
    return response.data; // "Message sent successfully!"
  };

  return { sendMessage };
};
