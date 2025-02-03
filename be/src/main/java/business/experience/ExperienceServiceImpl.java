package business.experience;

import data.experience.Experience;
import data.experience.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import presentation.experience.ExperienceRequestModel;
import presentation.experience.ExperienceResponseModel;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository experienceRepository;

    @Override
    public ExperienceResponseModel addExperience(ExperienceRequestModel request) {
        Experience experience = Experience.builder()
                .company(request.getCompany())
                .role(request.getRole())
                .description(request.getDescription())
                .startYear(request.getStartYear())
                .endYear(request.getEndYear())
                .build();

        experience = experienceRepository.save(experience);
        return new ExperienceResponseModel(experience.getId(), experience.getCompany(),
                experience.getRole(), experience.getDescription(),
                experience.getStartYear(), experience.getEndYear());
    }

    @Override
    public List<ExperienceResponseModel> getAllExperience() {
        return experienceRepository.findAll().stream()
                .map(experience -> new ExperienceResponseModel(experience.getId(), experience.getCompany(),
                        experience.getRole(), experience.getDescription(),
                        experience.getStartYear(), experience.getEndYear()))
                .collect(Collectors.toList());
    }
}