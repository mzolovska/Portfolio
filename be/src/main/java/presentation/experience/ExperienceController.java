package presentation.experience;

import business.experience.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExperienceController {

    private final ExperienceService experienceService;

    @PostMapping
    public ResponseEntity<ExperienceResponseModel> addExperience(@RequestBody ExperienceRequestModel request) {
        return ResponseEntity.ok(experienceService.addExperience(request));
    }

    @GetMapping
    public ResponseEntity<List<ExperienceResponseModel>> getAllExperience() {
        return ResponseEntity.ok(experienceService.getAllExperience());
    }
}