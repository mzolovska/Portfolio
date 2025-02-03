package business.projects;

import presentation.projects.ProjectsRequestModel;
import presentation.projects.ProjectsResponseModel;

import java.util.List;

public interface ProjectsService {
    ProjectsResponseModel addProject(ProjectsRequestModel request);
    List<ProjectsResponseModel> getAllProjects();
}
