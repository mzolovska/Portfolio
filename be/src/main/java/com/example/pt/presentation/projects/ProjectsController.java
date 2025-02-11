package com.example.pt.presentation.projects;

import com.example.pt.business.projects.ProjectsService;
import com.example.pt.data.projects.Projects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.pt.utils.EntityModelUtil;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("http://localhost:3000")

public class ProjectsController {

    private final ProjectsService projectsService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProjectsResponseModel>> getAllProjects() {
        List<ProjectsResponseModel> projects = projectsService.getAllProjects();
        log.info("Fetched all projects: {}", projects.size());
        return ResponseEntity.ok(projects);
    }

    @GetMapping(value = "/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjectsResponseModel> getProjectByProjectId(@PathVariable String projectId) {
        ProjectsResponseModel project = projectsService.getProjectByProjectId(projectId);
        log.info("Fetched Project: {}", project);
        return ResponseEntity.ok(project);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjectsResponseModel> addProject(@RequestBody ProjectsRequestModel projectsRequestModel) {
        log.info("Adding new Project: {}", projectsRequestModel.getTitle());
        Projects projectEntity = EntityModelUtil.toProjectsEntity(projectsRequestModel);
        ProjectsResponseModel savedProject = projectsService.addProject(projectEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
    }

    @PutMapping(value = "/{projectId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjectsResponseModel> updateProject(
            @PathVariable String projectId,
            @RequestBody ProjectsRequestModel projectsRequestModel) {
        log.info("Updating project with id: {}", projectId);
        ProjectsResponseModel updatedProject = projectsService.updateProject(projectId, projectsRequestModel);
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping(value = "/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteProject(@PathVariable String projectId) {
        log.info("Deleting project with id: {}", projectId);
        projectsService.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }
}
