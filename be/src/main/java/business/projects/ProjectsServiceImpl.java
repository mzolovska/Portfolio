package business.projects;

import data.projects.Projects;
import data.projects.ProjectsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import presentation.projects.ProjectsRequestModel;
import presentation.projects.ProjectsResponseModel;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectsServiceImpl implements ProjectsService {

    private final ProjectsRepository projectsRepository;

    @Override
    public ProjectsResponseModel addProject(ProjectsRequestModel request) {
        Projects project = Projects.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .technologies(request.getTechnologies())
                .link(request.getLink())
                .build();

        project = projectsRepository.save(project);
        return new ProjectsResponseModel(project.getId(), project.getTitle(),
                project.getDescription(), project.getTechnologies(),
                project.getLink());
    }

    @Override
    public List<ProjectsResponseModel> getAllProjects() {
        return projectsRepository.findAll().stream()
                .map(project -> new ProjectsResponseModel(project.getId(), project.getTitle(),
                        project.getDescription(), project.getTechnologies(),
                        project.getLink()))
                .collect(Collectors.toList());
    }
}
