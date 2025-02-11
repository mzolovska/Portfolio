package com.example.pt.presentation.experience;

import com.example.pt.business.experience.ExperienceService;
import com.example.pt.data.experience.Experience;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.pt.utils.EntityModelUtil;

import java.util.List;

@RestController
@RequestMapping("/api/v1/experience")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("http://localhost:3000")

public class ExperienceController {

    private final ExperienceService experienceService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ExperienceResponseModel>> getAllExperiences() {
        List<ExperienceResponseModel> experiences = experienceService.getAllExperience();
        log.info("Fetched {} experiences", experiences.size());
        return ResponseEntity.ok(experiences);
    }

    @GetMapping(value = "/{experienceId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExperienceResponseModel> getExperienceByExperienceId(@PathVariable String experienceId) {
        ExperienceResponseModel experience = experienceService.getExperienceByExperienceId(experienceId);
        log.info("Fetched Experience: {}", experience);
        return ResponseEntity.ok(experience);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExperienceResponseModel> addExperience(@RequestBody ExperienceRequestModel experienceRequestModel) {
        log.info("Adding new experience: {}", experienceRequestModel.getCompany());
        Experience newExperience = EntityModelUtil.toExperienceEntity(experienceRequestModel);
        ExperienceResponseModel savedExperience = experienceService.addExperience(newExperience);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExperience);
    }

    @PutMapping(value = "/{experienceId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExperienceResponseModel> updateExperience(
            @PathVariable String experienceId,
            @RequestBody ExperienceRequestModel experienceRequestModel) {
        log.info("Updating experience with ID: {}", experienceId);
        ExperienceResponseModel updatedExperience = experienceService.updateExperience(experienceId, experienceRequestModel);
        return ResponseEntity.ok(updatedExperience);
    }

    @DeleteMapping(value = "/{experienceId}")
    public ResponseEntity<Void> deleteExperience(@PathVariable String experienceId) {
        log.info("Deleting experience with ID: {}", experienceId);
        experienceService.deleteExperience(experienceId);
        return ResponseEntity.noContent().build();
    }
}
