package com.example.pt.presentation.projects;

import com.example.pt.business.projects.ProjectsService;
import com.example.pt.data.projects.Projects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@Slf4j
public class ProjectsController {
    private final ProjectsService projectsService;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ProjectsResponseModel> getAllProjects() {
        return projectsService.getAllProjects()
                .doOnNext(project -> log.info("Project: {}", project));
    }

    @GetMapping(value = "/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ProjectsResponseModel>> getProjectByProjectId(@PathVariable String projectId) {
        return projectsService.getProjectByProjectId(projectId)
                .doOnNext(project -> log.info("Fetched Project: {}", project))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<ProjectsResponseModel> addProject(@RequestBody ProjectsRequestModel projectsRequestModel) {
        log.info("Added new Project: {}", projectsRequestModel.getTitle());
        return projectsService.addProject(EntityModelUtil.toProjectsEntity(projectsRequestModel));
    }

    @PutMapping(value = {"/{projectId}"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ProjectsResponseModel>> updateProject(
            @PathVariable String projectId,
            @RequestBody ProjectsRequestModel projectsRequestModel) {
        log.info("Updating project with id: {}", projectId);

        Projects updatedProject = EntityModelUtil.toProjectsEntity(projectsRequestModel);
        updatedProject.setProjectId(projectId);

        return projectsService.updateProject(projectId, Mono.just(projectsRequestModel))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping(value = {"/{projectId}"}, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteProject(@PathVariable String projectId) {
        log.info("Deleting project with id: {}", projectId);
        return projectsService.deleteProject(projectId);
    }
}