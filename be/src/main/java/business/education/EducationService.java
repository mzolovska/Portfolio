package business.education;

import data.education.Education;
import presentation.education.EducationRequestModel;
import presentation.education.EducationResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface EducationService {
    Mono<EducationResponseModel> addEducation(Education education);
    Flux<EducationResponseModel> getAllEducation();
    Mono<EducationResponseModel> getEducationByEducationId(String educationId);
    Mono<EducationResponseModel> updateEducation(String educationId, Mono<EducationRequestModel> educationRequestModel);
    Mono<Void> deleteEducation(String educationId);
}