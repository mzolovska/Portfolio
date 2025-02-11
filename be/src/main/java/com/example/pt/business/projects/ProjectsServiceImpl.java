package com.example.pt.business.projects;

import com.example.pt.data.projects.Projects;
import com.example.pt.data.projects.ProjectsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.example.pt.presentation.projects.ProjectsRequestModel;
import com.example.pt.presentation.projects.ProjectsResponseModel;
import com.example.pt.utils.EntityModelUtil;
import com.example.pt.utils.exceptions.NotFoundException;

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
    public ProjectsResponseModel addProject(Projects project) {
        Projects savedProject = projectsRepository.save(project);
        log.info("Added new project: {}", savedProject);
        return EntityModelUtil.toProjectsResponseModel(savedProject);
    }

    @Override
    public List<ProjectsResponseModel> getAllProjects() {
        return projectsRepository.findAll().stream()
                .map(EntityModelUtil::toProjectsResponseModel)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectsResponseModel getProjectByProjectId(String projectId) {
        Projects project = projectsRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project Id not found: " + projectId));
        return EntityModelUtil.toProjectsResponseModel(project);
    }

    @Override
    public ProjectsResponseModel updateProject(String projectId, ProjectsRequestModel projectsRequestModel) {
        Projects existingProject = projectsRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project Id not found: " + projectId));

        existingProject.setTitle(projectsRequestModel.getTitle());
        existingProject.setDescription(projectsRequestModel.getDescription());

        Projects updatedProject = projectsRepository.save(existingProject);
        log.info("Updated Project: {}", updatedProject);
        return EntityModelUtil.toProjectsResponseModel(updatedProject);
    }

    @Override
    public void deleteProject(String projectId) {
        Projects project = projectsRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project Id not found: " + projectId));

        projectsRepository.delete(project);
        log.info("Deleted Project: {}", project);
    }
}
