package presentation.about;

import business.about.AboutService;
import data.about.About;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;

import java.util.List;

@RestController
@RequestMapping("/api/v1/about")
@Slf4j
@RequiredArgsConstructor
public class AboutController {

    private AboutService aboutService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<AboutResponseModel> createAbout(@RequestBody AboutRequestModel request) {
        log.info("Added new About: {}", request.getName());
        return aboutService.createAbout(EntityModelUtil.toAboutEntity(request));
    }

    @GetMapping(value = "/{aboutId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<AboutResponseModel>> getAboutById(@PathVariable String aboutId) {
        return aboutService.getAboutByAboutId(aboutId)
                .doOnNext(about -> log.info("About: {}", about))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<AboutResponseModel> getAllAbouts() {
        return aboutService.getAllAbouts()
                .doOnNext(about -> log.info("About: {}", about));
    }

    @PutMapping(value={"/{aboutId}"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<AboutResponseModel>> updateAbout(@PathVariable String aboutId, @Valid @RequestBody AboutRequestModel request) {
        log.info("Updating about with id: {}", aboutId);
        About updatedAbout = EntityModelUtil.toAboutEntity(request);
        updatedAbout.setAboutId(aboutId);

        return aboutService.updateAbout(aboutId, Mono.just(request))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping(value={"/{aboutId}"}, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteAbout(@PathVariable String aboutId) {
        log.info("Deleting about with id: {}", aboutId);
        return aboutService.deleteAbout(aboutId);
    }
}