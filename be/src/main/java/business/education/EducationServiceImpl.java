package business.education;

import data.education.Education;
import data.education.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import presentation.education.EducationRequestModel;
import presentation.education.EducationResponseModel;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EducationServiceImpl implements EducationService {

    private final EducationRepository educationRepository;

    @Override
    public EducationResponseModel addEducation(EducationRequestModel request) {
        Education education = Education.builder()
                .institution(request.getInstitution())
                .degree(request.getDegree())
                .fieldOfStudy(request.getFieldOfStudy())
                .startYear(request.getStartYear())
                .endYear(request.getEndYear())
                .build();

        education = educationRepository.save(education);
        return new EducationResponseModel(education.getId(), education.getInstitution(),
                education.getDegree(), education.getFieldOfStudy(),
                education.getStartYear(), education.getEndYear());
    }

    @Override
    public List<EducationResponseModel> getAllEducation() {
        return educationRepository.findAll().stream()
                .map(education -> new EducationResponseModel(education.getId(), education.getInstitution(),
                        education.getDegree(), education.getFieldOfStudy(),
                        education.getStartYear(), education.getEndYear()))
                .collect(Collectors.toList());
    }
}