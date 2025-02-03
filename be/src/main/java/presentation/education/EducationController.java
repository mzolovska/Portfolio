package presentation.education;

import business.education.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EducationController {

    private final EducationService educationService;

    @PostMapping
    public ResponseEntity<EducationResponseModel> addEducation(@RequestBody EducationRequestModel request) {
        return ResponseEntity.ok(educationService.addEducation(request));
    }

    @GetMapping
    public ResponseEntity<List<EducationResponseModel>> getAllEducation() {
        return ResponseEntity.ok(educationService.getAllEducation());
    }
}