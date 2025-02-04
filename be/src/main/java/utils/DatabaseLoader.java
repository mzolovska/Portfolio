package utils;

import data.about.About;
import data.about.AboutRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DatabaseLoader {

    private final AboutRepository aboutRepository;

    @PostConstruct
    public void loadAbout() {
        List<About> sampleAbout = List.of(
                About.builder()
                        .aboutId("91c940b1-24e8-463f-96ef-f54f7e4aaf1d")
                        .name("About Me")
                        .description("I am a software engineer.")
                        .build()
        );

        // Clear existing data and insert new data
        aboutRepository.deleteAll()
                .thenMany(aboutRepository.saveAll(sampleAbout))
                .doOnNext(about -> log.info("Preloaded about section: {}", about))
                .subscribe(
                        success -> log.info("About Section preload successful"),
                        error -> log.error("Error loading About section: {}", error.getMessage())
                );
    }
}
