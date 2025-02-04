package business.about;

import data.about.About;
import jakarta.validation.Valid;
import presentation.about.AboutRequestModel;
import presentation.about.AboutResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface AboutService {
    Mono<AboutResponseModel> createAbout(About about);
    Mono<AboutResponseModel> getAboutByAboutId(String aboutId);
    Flux<AboutResponseModel> getAllAbouts();
    Mono<AboutResponseModel> updateAbout(String aboutId, Mono<AboutRequestModel> aboutRequestModel);
    Mono<Void> deleteAbout(String aboutId);
}