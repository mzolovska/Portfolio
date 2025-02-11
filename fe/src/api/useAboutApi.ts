import { useEffect, useState } from "react";
import axiosInstance from '../shared/useAxiosInstance';

// Define types
export interface AboutResponseModel {
  aboutId: string;
  name: string;
  description: string;
  // Add other properties if needed
}

export interface AboutRequestModel {
  name: string;
  description: string;
}

// Custom hook for About API calls
export const useAboutApi = () => {
  const [aboutData, setAboutData] = useState<AboutResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all about details (handles SSE stream)
  const fetchAllAbouts = () => {
    setLoading(true);
    setError(null);
    setAboutData([]);

    const eventSource = new EventSource(`${axiosInstance.defaults.baseURL}/about`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      try {
        const about: AboutResponseModel = JSON.parse(event.data);
        setAboutData((prev) => [...prev, about]);
      } catch (error) {
        console.error("Error parsing SSE event:", error);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE Error:", err);
      setError("Failed to fetch data.");
      eventSource.close();
      setLoading(false);
    };

    return () => eventSource.close();
  };

  // Fetch About by ID
  const fetchAboutById = async (aboutId: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<AboutResponseModel>(`/about/${aboutId}`);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching About:", error);
      throw error;
    }
  };

  // Add About
  const createAbout = async (about: AboutRequestModel) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post<AboutResponseModel>("/about", about);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error("Error adding About:", error);
      throw error;
    }
  };

  // Update About
  const updateAbout = async (aboutId: string, about: AboutRequestModel) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put<AboutResponseModel>(`/about/${aboutId}`, about);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error("Error updating About:", error);
      throw error;
    }
  };

  // Delete About
  const deleteAbout = async (aboutId: string) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/about/${aboutId}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error deleting About:", error);
      throw error;
    }
  };

  return {
    aboutData,
    fetchAllAbouts,
    fetchAboutById,
    createAbout,
    updateAbout,
    deleteAbout,
    loading,
    error,
  };
};
