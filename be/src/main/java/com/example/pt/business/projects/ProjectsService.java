package com.example.pt.business.projects;

import com.example.pt.data.projects.Projects;
import com.example.pt.presentation.projects.ProjectsRequestModel;
import com.example.pt.presentation.projects.ProjectsResponseModel;

import java.util.List;

public interface ProjectsService {
    ProjectsResponseModel addProject(Projects project);
    List<ProjectsResponseModel> getAllProjects();
    ProjectsResponseModel getProjectByProjectId(String projectId);
    ProjectsResponseModel updateProject(String projectId, ProjectsRequestModel projectsRequestModel);
    void deleteProject(String projectId);
}
