package com.example.pt.presentation.experience;

import com.example.pt.business.experience.ExperienceService;
import com.example.pt.data.experience.Experience;
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
@RequestMapping("/api/v1/experience")
@RequiredArgsConstructor
@Slf4j public class ExperienceController {

    private final ExperienceService experienceService;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ExperienceResponseModel> getAllExperiences() {
        return experienceService.getAllExperience()
                .doOnNext(experience -> log.info("Experience: {}", experience));
    }

    @GetMapping(value = "/{experienceId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ExperienceResponseModel>> getExperienceByExperienceId(@PathVariable String experienceId) {
        return experienceService.getExperienceByExperienceId(experienceId)
                .doOnNext(experience -> log.info("Fetched Experience: {}", experience))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<ExperienceResponseModel> addExperience(@RequestBody ExperienceRequestModel experienceRequestModel) {
        log.info("Added new Experience: {}", experienceRequestModel.getCompany());
        return experienceService.addExperience(EntityModelUtil.toExperienceEntity(experienceRequestModel));
    }


    @PutMapping(value = {"/{experienceId}"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ExperienceResponseModel>> updateExperience(
            @PathVariable String experienceId,
            @RequestBody ExperienceRequestModel experienceRequestModel) {
        log.info("Updating experience with id: {}", experienceId);

        Experience updatedExperience = EntityModelUtil.toExperienceEntity(experienceRequestModel);
        updatedExperience.setExperienceId(experienceId);

        return experienceService.updateExperience(experienceId, Mono.just(experienceRequestModel))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @DeleteMapping(value = {"/{experienceId}"}, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteExperience(@PathVariable String experienceId) {
        log.info("Deleting experience with id: {}", experienceId);
        return experienceService.deleteExperience(experienceId);
    }
}