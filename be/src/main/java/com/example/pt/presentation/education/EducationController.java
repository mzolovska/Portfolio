package com.example.pt.presentation.education;

import com.example.pt.business.education.EducationService;
import com.example.pt.data.education.Education;
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
@RequestMapping("/api/v1/education")
@RequiredArgsConstructor
@Slf4j public class EducationController {

    private final EducationService educationService;


    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<EducationResponseModel> getAllEducations() {
        return educationService.getAllEducation()
                .doOnNext(education -> log.info("Education: {}", education));
    }


    @GetMapping(value = "/{educationId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<EducationResponseModel>> getEducationByEducationId(@PathVariable String educationId) {
        return educationService.getEducationByEducationId(educationId)
                .doOnNext(education -> log.info("Fetched Education: {}", education))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<EducationResponseModel> addEducation(@RequestBody EducationRequestModel educationRequestModel) {
        log.info("Added new Education: {}", educationRequestModel.getInstitution());
        return educationService.addEducation(EntityModelUtil.toEducationEntity(educationRequestModel));
    }


    @PutMapping(value = {"/{educationId}"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<EducationResponseModel>> updateEducation(
            @PathVariable String educationId,
            @RequestBody EducationRequestModel educationRequestModel) {
        log.info("Updating education with id: {}", educationId);

        Education updatedEducation = EntityModelUtil.toEducationEntity(educationRequestModel);
        updatedEducation.setEducationId(educationId);

        return educationService.updateEducation(educationId, Mono.just(educationRequestModel))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping(value = {"/{educationId}"}, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteEducation(@PathVariable String educationId) {
        log.info("Deleting education with id: {}", educationId);
        return educationService.deleteEducation(educationId);
    }
}