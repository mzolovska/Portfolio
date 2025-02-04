package business.experience;

import data.experience.Experience;
import presentation.experience.ExperienceRequestModel;
import presentation.experience.ExperienceResponseModel;
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
