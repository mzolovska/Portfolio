package com.example.pt.business.education;

import com.example.pt.data.education.Education;
import com.example.pt.presentation.education.EducationRequestModel;
import com.example.pt.presentation.education.EducationResponseModel;

import java.util.List;

public interface EducationService {
    EducationResponseModel addEducation(Education education);
    List<EducationResponseModel> getAllEducation();
    EducationResponseModel getEducationByEducationId(String educationId);
    EducationResponseModel updateEducation(String educationId, EducationRequestModel educationRequestModel);
    void deleteEducation(String educationId);
}
