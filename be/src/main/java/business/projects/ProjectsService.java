package business.projects;

import data.projects.Projects;
import presentation.projects.ProjectsRequestModel;
import presentation.projects.ProjectsResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ProjectsService {
    Mono<ProjectsResponseModel> addProject(Projects projects);
    Flux<ProjectsResponseModel> getAllProjects();
    Mono<ProjectsResponseModel> getProjectByProjectId(String projectId);
    Mono<ProjectsResponseModel> updateProject(String projectId, Mono<ProjectsRequestModel> projectsRequestModel);
    Mono<Void> deleteProject(String projectId);
}
