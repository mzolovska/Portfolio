package com.example.pt.business.about;

import com.example.pt.data.about.About;
import com.example.pt.data.about.AboutRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.example.pt.presentation.about.AboutRequestModel;
import com.example.pt.presentation.about.AboutResponseModel;

import org.springframework.web.bind.annotation.PathVariable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;
import utils.exceptions.NotFoundException;


@Service
@Slf4j
public class AboutServiceImpl implements AboutService {

    private AboutRepository aboutRepository;

    @Override
    public Flux<AboutResponseModel> getAllAbouts() {
        return aboutRepository.findAll()
                .map(EntityModelUtil::toAboutResponseModel);
    }


    @Override
    public Mono<AboutResponseModel> getAboutByAboutId(String aboutId) {
        return aboutRepository.findAboutByAboutId(aboutId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("About Id not found: " + aboutId))))
                .map(EntityModelUtil::toAboutResponseModel);
    }


    @Override
    public Mono<AboutResponseModel> createAbout(About about) {
        return aboutRepository.save(about)
                .doOnNext(savedAbout -> log.info("Added new about: {}", savedAbout))
                .map(EntityModelUtil::toAboutResponseModel);
    }




    @Override
    public Mono<AboutResponseModel> updateAbout(@PathVariable String aboutId, Mono<AboutRequestModel> aboutRequestModel) {
        return aboutRepository.findAboutByAboutId(aboutId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("About Id not found: " + aboutId))))
                .flatMap(existingAbout -> {
                    return aboutRequestModel.map(request -> {
                        existingAbout.setName(request.getName());
                        existingAbout.setDescription(request.getDescription());
                        return existingAbout;
                    });
                })
                .flatMap(aboutRepository::save)
                .doOnSuccess(updatedAbout -> log.info("Updated About {}: ", updatedAbout))
                .map(EntityModelUtil::toAboutResponseModel);
    }



    @Override
    public Mono<Void> deleteAbout(String aboutId) {
        return aboutRepository.findAboutByAboutId(aboutId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("About Id not found: " + aboutId))))
                .flatMap(aboutRepository::delete)
                .doOnSuccess(unused -> log.info("Deleted about with id {}: ", aboutId));
    }
}