package com.example.pt.business.about;

import com.example.pt.data.about.About;
import com.example.pt.presentation.about.AboutRequestModel;
import com.example.pt.presentation.about.AboutResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface AboutService {
    Mono<AboutResponseModel> createAbout(About about);
    Mono<AboutResponseModel> getAboutByAboutId(String aboutId);
    Flux<AboutResponseModel> getAllAbouts();
    Mono<AboutResponseModel> updateAbout(String aboutId, Mono<AboutRequestModel> aboutRequestModel);
    Mono<Void> deleteAbout(String aboutId);
}
