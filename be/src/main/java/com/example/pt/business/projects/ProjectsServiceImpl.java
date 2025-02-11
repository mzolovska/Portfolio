package com.example.pt.business.projects;

import com.example.pt.data.projects.Projects;
import com.example.pt.data.projects.ProjectsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.example.pt.presentation.projects.ProjectsRequestModel;
import com.example.pt.presentation.projects.ProjectsResponseModel;
import org.springframework.web.bind.annotation.PathVariable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;
import utils.exceptions.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProjectsServiceImpl implements ProjectsService {

    private final ProjectsRepository projectsRepository;

    public ProjectsServiceImpl(ProjectsRepository projectsRepository) {
        this.projectsRepository = projectsRepository;
    }


    @Override
    public Mono<ProjectsResponseModel> addProject(Projects projects) {
        return projectsRepository.save(projects)
                .doOnSuccess(savedProjects -> log.info("Added new projects: {}", savedProjects))
                .map(EntityModelUtil::toProjectsResponseModel);
    }

    @Override
    public Flux<ProjectsResponseModel> getAllProjects() {
        return projectsRepository.findAll()
                .map(EntityModelUtil::toProjectsResponseModel);
    }

    @Override
    public Mono<ProjectsResponseModel> getProjectByProjectId(String projectId) {
        return projectsRepository.findProjectsByProjectId(projectId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Project Id not found: " + projectId))))
                .map(EntityModelUtil::toProjectsResponseModel);
    }

    @Override
    public Mono<ProjectsResponseModel> updateProject(@PathVariable String projectId, Mono<ProjectsRequestModel> projectsRequestModel) {
        return projectsRepository.findProjectsByProjectId(projectId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Project Id not found: " + projectId))))
                .flatMap(existingProjects -> {
                    return projectsRequestModel.map(request -> {
                        existingProjects.setTitle(request.getTitle());
                        existingProjects.setDescription(request.getDescription());
                        return existingProjects;
                    });
                })
                .doOnSuccess(updatedProjects -> log.info("Updated Projects {}: ", updatedProjects))
                .map(EntityModelUtil::toProjectsResponseModel);
    }

    @Override
    public Mono<Void> deleteProject(String projectId) {
        return projectsRepository.findProjectsByProjectId(projectId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Project Id not found: " + projectId))))
                .flatMap(projectsRepository::delete)
                .doOnSuccess(deletedProjects -> log.info("Deleted Projects {}: ", deletedProjects));
    }
}