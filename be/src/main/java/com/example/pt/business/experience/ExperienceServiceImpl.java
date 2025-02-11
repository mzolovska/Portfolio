package com.example.pt.business.experience;

import com.example.pt.data.experience.Experience;
import com.example.pt.data.experience.ExperienceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.example.pt.presentation.experience.ExperienceRequestModel;
import com.example.pt.presentation.experience.ExperienceResponseModel;
import org.springframework.web.bind.annotation.PathVariable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;
import utils.exceptions.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceServiceImpl(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }


    @Override
    public Mono<ExperienceResponseModel> addExperience(Experience experience) {
        return experienceRepository.save(experience)
                .doOnSuccess(savedExperience -> log.info("Added new experience: {}", savedExperience))
                .map(EntityModelUtil::toExperienceResponseModel);
    }

    @Override
    public Flux<ExperienceResponseModel> getAllExperience() {
        return experienceRepository.findAll()
                .map(EntityModelUtil::toExperienceResponseModel);
    }

    @Override
    public Mono<ExperienceResponseModel> getExperienceByExperienceId(String experienceId) {
        return experienceRepository.findExperienceByExperienceId(experienceId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Experience Id not found: " + experienceId))))
                .map(EntityModelUtil::toExperienceResponseModel);
    }

    @Override
    public Mono<ExperienceResponseModel> updateExperience(@PathVariable String experienceId, Mono<ExperienceRequestModel> experienceRequestModel) {
        return experienceRepository.findExperienceByExperienceId(experienceId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Experience Id not found: " + experienceId))))
                .flatMap(existingExperience -> {
                    return experienceRequestModel.map(request -> {
                        existingExperience.setCompany(request.getCompany());
                        existingExperience.setRole(request.getRole());
                        return existingExperience;
                    });
                })
                .doOnSuccess(updatedExperience -> log.info("Updated Experience {}: ", updatedExperience))
                .map(EntityModelUtil::toExperienceResponseModel);
    }

    @Override
    public Mono<Void> deleteExperience(String experienceId) {
        return experienceRepository.findExperienceByExperienceId(experienceId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Experience Id not found: " + experienceId))))
                .flatMap(experienceRepository::delete)
                .doOnSuccess(deletedExperience -> log.info("Deleted Experience {}: ", deletedExperience));
    }
}