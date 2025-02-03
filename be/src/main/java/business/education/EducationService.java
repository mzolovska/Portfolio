package business.education;

import presentation.education.EducationRequestModel;
import presentation.education.EducationResponseModel;

import java.util.List;

public interface EducationService {
    EducationResponseModel addEducation(EducationRequestModel request);
    List<EducationResponseModel> getAllEducation();
}