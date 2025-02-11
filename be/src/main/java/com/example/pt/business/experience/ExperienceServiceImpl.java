package com.example.pt.business.experience;

import com.example.pt.data.experience.Experience;
import com.example.pt.data.experience.ExperienceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.example.pt.presentation.experience.ExperienceRequestModel;
import com.example.pt.presentation.experience.ExperienceResponseModel;
import com.example.pt.utils.EntityModelUtil;
import com.example.pt.utils.exceptions.NotFoundException;

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
    public ExperienceResponseModel addExperience(Experience experience) {
        Experience savedExperience = experienceRepository.save(experience);
        log.info("Added new experience: {}", savedExperience);
        return EntityModelUtil.toExperienceResponseModel(savedExperience);
    }

    @Override
    public List<ExperienceResponseModel> getAllExperience() {
        return experienceRepository.findAll().stream()
                .map(EntityModelUtil::toExperienceResponseModel)
                .collect(Collectors.toList());
    }

    @Override
    public ExperienceResponseModel getExperienceByExperienceId(String experienceId) {
        Experience experience = experienceRepository.findExperienceByExperienceId(experienceId)
                .orElseThrow(() -> new NotFoundException("Experience Id not found: " + experienceId));
        return EntityModelUtil.toExperienceResponseModel(experience);
    }

    @Override
    public ExperienceResponseModel updateExperience(String experienceId, ExperienceRequestModel experienceRequestModel) {
        Experience existingExperience = experienceRepository.findExperienceByExperienceId(experienceId)
                .orElseThrow(() -> new NotFoundException("Experience Id not found: " + experienceId));

        existingExperience.setCompany(experienceRequestModel.getCompany());
        existingExperience.setRole(experienceRequestModel.getRole());

        Experience updatedExperience = experienceRepository.save(existingExperience);
        log.info("Updated Experience: {}", updatedExperience);

        return EntityModelUtil.toExperienceResponseModel(updatedExperience);
    }

    @Override
    public void deleteExperience(String experienceId) {
        Experience experience = experienceRepository.findExperienceByExperienceId(experienceId)
                .orElseThrow(() -> new NotFoundException("Experience Id not found: " + experienceId));

        experienceRepository.delete(experience);
        log.info("Deleted Experience: {}", experience);
    }
}
