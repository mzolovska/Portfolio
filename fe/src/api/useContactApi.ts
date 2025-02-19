import {useAxiosInstance} from "../shared/useAxiosInstance"; // ✅ Import axios instance correctly

// Define types
export interface ContactResponseModel {
  contactId: string;
  name: string;
  email: string;
  message: string;
}

export interface ContactRequestModel {
  name: string;
  email: string;
  message: string;
}

// Custom hook for Contact API calls
export const useContactApi = () => {
  const axiosInstance = useAxiosInstance();
  // Fetch All Contacts (SSE Stream)
  const fetchAllContacts = async (): Promise<ContactResponseModel[]> => {
    const contacts: ContactResponseModel[] = [];

    const response = await axiosInstance.get("/contact", {
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
          const contact = JSON.parse(trimmedLine.substring(5).trim());
          contacts.push(contact);
        } catch (error) {
          console.error("Error parsing SSE event:", trimmedLine, error);
        }
      }
    }

    return contacts;
  };

  // Fetch Contact by ID
  const fetchContactById = async (contactId: string): Promise<ContactResponseModel> => {
    const response = await axiosInstance.get<ContactResponseModel>(`/contact/${contactId}`);
    return response.data;
  };

  // Create Contact
  const createContact = async (contact: ContactRequestModel): Promise<ContactResponseModel> => {
    const response = await axiosInstance.post<ContactResponseModel>("/contact", contact);
    return response.data;
  };

  // Update Contact
  const updateContact = async (contactId: string, updatedData: ContactRequestModel) => {
    const response = await axiosInstance.get<ContactResponseModel>(`/contact/${contactId}`);
    return response.data;  };
  

  // Delete Contact
  const deleteContact = async (contactId: string): Promise<void> => {
    await axiosInstance.delete(`/contact/${contactId}`);
  };

  return {
    fetchAllContacts,
    fetchContactById,
    createContact,
    updateContact,
    deleteContact,
  };
};
