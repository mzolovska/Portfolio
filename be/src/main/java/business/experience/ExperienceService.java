package business.experience;

import presentation.experience.ExperienceRequestModel;
import presentation.experience.ExperienceResponseModel;

import java.util.List;

public interface ExperienceService {
    ExperienceResponseModel addExperience(ExperienceRequestModel request);
    List<ExperienceResponseModel> getAllExperience();
}
