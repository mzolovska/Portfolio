package com.example.pt.business.education;

import com.example.pt.data.education.Education;
import com.example.pt.data.education.EducationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.example.pt.presentation.education.EducationRequestModel;
import com.example.pt.presentation.education.EducationResponseModel;
import com.example.pt.utils.EntityModelUtil;
import com.example.pt.utils.exceptions.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class EducationServiceImpl implements EducationService {

    private final EducationRepository educationRepository;

    public EducationServiceImpl(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @Override
    public EducationResponseModel addEducation(Education education) {
        Education savedEducation = educationRepository.save(education);
        log.info("Added new education: {}", savedEducation);
        return EntityModelUtil.toEducationResponseModel(savedEducation);
    }

    @Override
    public List<EducationResponseModel> getAllEducation() {
        return educationRepository.findAll().stream()
                .map(EntityModelUtil::toEducationResponseModel)
                .collect(Collectors.toList());
    }

    @Override
    public EducationResponseModel getEducationByEducationId(String educationId) {
        Education education = educationRepository.findEducationByEducationId(educationId)
                .orElseThrow(() -> new NotFoundException("Education Id not found: " + educationId));

        return EntityModelUtil.toEducationResponseModel(education);
    }

    @Override
    public EducationResponseModel updateEducation(String educationId, EducationRequestModel educationRequestModel) {
        Education existingEducation = educationRepository.findEducationByEducationId(educationId)
                .orElseThrow(() -> new NotFoundException("Education Id not found: " + educationId));

        existingEducation.setInstitution(educationRequestModel.getInstitution());
        existingEducation.setFieldOfStudy(educationRequestModel.getFieldOfStudy());

        Education updatedEducation = educationRepository.save(existingEducation);
        log.info("Updated Education: {}", updatedEducation);

        return EntityModelUtil.toEducationResponseModel(updatedEducation);
    }

    @Override
    public void deleteEducation(String educationId) {
        Education education = educationRepository.findEducationByEducationId(educationId)
                .orElseThrow(() -> new NotFoundException("Education Id not found: " + educationId));

        educationRepository.delete(education);
        log.info("Deleted Education: {}", education);
    }
}
