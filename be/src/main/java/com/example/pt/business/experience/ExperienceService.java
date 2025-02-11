package com.example.pt.business.experience;

import com.example.pt.data.experience.Experience;
import com.example.pt.presentation.experience.ExperienceRequestModel;
import com.example.pt.presentation.experience.ExperienceResponseModel;

import java.util.List;

public interface ExperienceService {
    ExperienceResponseModel addExperience(Experience experience);
    List<ExperienceResponseModel> getAllExperience();
    ExperienceResponseModel getExperienceByExperienceId(String experienceId);
    ExperienceResponseModel updateExperience(String experienceId, ExperienceRequestModel experienceRequestModel);
    void deleteExperience(String experienceId);
}
