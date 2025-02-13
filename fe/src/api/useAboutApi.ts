import { useState } from "react";
import axiosInstance from "../shared/useAxiosInstance";

// Define types
export interface AboutResponseModel {
  aboutId: string;
  name: string;
  description: string;
}

export interface AboutRequestModel {
  name: string;
  description: string;
}

export const useAboutApi = () => {
  // Fetch All About Data (SSE Stream)
  const fetchAllAbouts = async (): Promise<AboutResponseModel[]> => {
    const abouts: AboutResponseModel[] = [];

    const response = await axiosInstance.get("/about", {
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
          const about = JSON.parse(trimmedLine.substring(5).trim());
          abouts.push(about);
        } catch (error) {
          console.error("Error parsing SSE event:", trimmedLine, error);
        }
      }
    }

    return abouts;
  };

  // Fetch About by ID
  const fetchAboutById = async (aboutId: string): Promise<AboutResponseModel> => {
    const response = await axiosInstance.get<AboutResponseModel>(`/about/${aboutId}`);
    return response.data;
  };

  // Create About
  const createAbout = async (about: AboutRequestModel): Promise<AboutResponseModel> => {
    const response = await axiosInstance.post<AboutResponseModel>("/about", about);
    return response.data;
  };

  // Update About
  const updateAbout = async (aboutId: string, about: AboutRequestModel): Promise<AboutResponseModel> => {
    const response = await axiosInstance.put<AboutResponseModel>(`/about/${aboutId}`, about);
    return response.data;
  };

  // Delete About
  const deleteAbout = async (aboutId: string): Promise<void> => {
    await axiosInstance.delete(`/about/${aboutId}`);
  };

  return {
    fetchAllAbouts,
    fetchAboutById,
    createAbout,
    updateAbout,
    deleteAbout,
  };
};
