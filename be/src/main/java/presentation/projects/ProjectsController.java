package presentation.projects;

import business.projects.ProjectsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProjectsController {
    private final ProjectsService projectsService;

    @PostMapping
    public ResponseEntity<ProjectsResponseModel> addProject(@RequestBody ProjectsRequestModel request) {
        return ResponseEntity.ok(projectsService.addProject(request));
    }

    @GetMapping
    public ResponseEntity<List<ProjectsResponseModel>> getAllProjects() {
        return ResponseEntity.ok(projectsService.getAllProjects());
    }
}
