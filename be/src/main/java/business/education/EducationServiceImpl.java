package business.education;

import data.education.Education;
import data.education.EducationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import presentation.education.EducationRequestModel;
import presentation.education.EducationResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;
import utils.exceptions.NotFoundException;

@Service
@Slf4j
public class EducationServiceImpl implements EducationService {

    private final EducationRepository educationRepository;

    public EducationServiceImpl(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }


    @Override
    public Mono<EducationResponseModel> addEducation(Education education) {
        return educationRepository.save(education)
                .doOnSuccess(savedEducation -> log.info("Added new education: {}", savedEducation))
                .map(EntityModelUtil::toEducationResponseModel);
    }

    @Override
    public Flux<EducationResponseModel> getAllEducation() {
        return educationRepository.findAll()
                .map(EntityModelUtil::toEducationResponseModel);
    }

    @Override
    public Mono<EducationResponseModel> getEducationByEducationId(String educationId) {
        return educationRepository.findEducationByEducationId(educationId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Education Id not found: " + educationId))))
                .map(EntityModelUtil::toEducationResponseModel);
    }

    @Override
    public Mono<EducationResponseModel> updateEducation(String educationId, Mono<EducationRequestModel> educationRequestModel) {
        return educationRepository.findEducationByEducationId(educationId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Education Id not found: " + educationId))))
                .flatMap(existingEducation -> {
                    return educationRequestModel.map(request -> {
                        existingEducation.setInstitution(request.getInstitution());
                        existingEducation.setFieldOfStudy(request.getFieldOfStudy());
                        return existingEducation;
                    });
                })
                .doOnSuccess(updatedEducation -> log.info("Updated Education {}: ", updatedEducation))
                .map(EntityModelUtil::toEducationResponseModel);
    }

    @Override
    public Mono<Void> deleteEducation(String educationId) {
        return educationRepository.findEducationByEducationId(educationId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Education Id not found: " + educationId))))
                .flatMap(educationRepository::delete)
                .doOnSuccess(deletedEducation -> log.info("Deleted Education {}: ", deletedEducation));
    }
}