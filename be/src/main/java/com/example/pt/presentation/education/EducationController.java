package com.example.pt.presentation.education;

import com.example.pt.business.education.EducationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.pt.utils.EntityModelUtil;

import java.util.List;

@RestController
@RequestMapping("/api/v1/education")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("http://localhost:3000")

public class EducationController {

    private final EducationService educationService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EducationResponseModel>> getAllEducations() {
        List<EducationResponseModel> educations = educationService.getAllEducation();
        log.info("Fetched all educations: {}", educations);
        return ResponseEntity.ok(educations);
    }

    @GetMapping("/{educationId}")
    public ResponseEntity<EducationResponseModel> getEducationByEducationId(@PathVariable String educationId) {
        EducationResponseModel education = educationService.getEducationByEducationId(educationId);
        log.info("Fetched Education: {}", education);
        return ResponseEntity.ok(education);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<EducationResponseModel> addEducation(@RequestBody EducationRequestModel educationRequestModel) {
        log.info("Adding new Education: {}", educationRequestModel.getInstitution());
        EducationResponseModel savedEducation = educationService.addEducation(EntityModelUtil.toEducationEntity(educationRequestModel));
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEducation);
    }

    @PutMapping("/{educationId}")
    public ResponseEntity<EducationResponseModel> updateEducation(
            @PathVariable String educationId,
            @RequestBody EducationRequestModel educationRequestModel) {
        log.info("Updating education with id: {}", educationId);
        EducationResponseModel updatedEducation = educationService.updateEducation(educationId, educationRequestModel);
        return ResponseEntity.ok(updatedEducation);
    }

    @DeleteMapping("/{educationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEducation(@PathVariable String educationId) {
        log.info("Deleting education with id: {}", educationId);
        educationService.deleteEducation(educationId);
    }
}
