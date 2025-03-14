package com.example.pt.business.experience;

import com.example.pt.data.experience.Experience;
import com.example.pt.presentation.experience.ExperienceRequestModel;
import com.example.pt.presentation.experience.ExperienceResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ExperienceService {
    Mono<ExperienceResponseModel> addExperience(Experience experience);
    Flux<ExperienceResponseModel> getAllExperience();
    Mono<ExperienceResponseModel> getExperienceByExperienceId(String experienceId);
    Mono<ExperienceResponseModel> updateExperience(String experienceId, Mono<ExperienceRequestModel> experienceRequestModel);
    Mono<Void> deleteExperience(String experienceId);
}