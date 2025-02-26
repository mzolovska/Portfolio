package utils;

import com.example.pt.data.about.About;
import com.example.pt.data.about.AboutRepository;
import com.example.pt.data.comments.Comment;
import com.example.pt.data.comments.CommentRepository;
import com.example.pt.data.contact.Contact;
import com.example.pt.data.contact.ContactRepository;
import com.example.pt.data.education.Education;
import com.example.pt.data.education.EducationRepository;
import com.example.pt.data.experience.Experience;
import com.example.pt.data.experience.ExperienceRepository;
import com.example.pt.data.projects.Projects;
import com.example.pt.data.projects.ProjectsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DatabaseLoader {

    private final AboutRepository aboutRepository;
    private final ContactRepository contactRepository;
    private final EducationRepository educationRepository;
    private final ExperienceRepository experienceRepository;
    private final ProjectsRepository projectsRepository;
    private final CommentRepository commentRepository;

    @PostConstruct
    public void loadData() {
        Mono<Void> aboutMono = aboutRepository.deleteAll()
                .thenMany(aboutRepository.saveAll(List.of(
                        About.builder()
                                .id(null)
                                .aboutId("91c940b1-24e8-463f-96ef-f54f7e4aaf1d")
                                .name("About Me")
                                .description("I am a software engineer.")
                                .build()
                )))
                .doOnNext(about -> log.info("Preloaded about section: {}", about))
                .then();



       /* Mono<Void> educationMono = educationRepository.deleteAll()
                .thenMany(educationRepository.saveAll(List.of(
                        Education.builder()
                                .id(null)
                                .educationId("91c940b1-24e8-463f-96ef-f54f7e4aaf3p")
                                .institution("University of Lagos")
                                .degree("BSc")
                                .fieldOfStudy("Computer Science")
                                .startYear(2015)
                                .endYear(2019)
                                .build()
                )))
                .doOnNext(education -> log.info("Preloaded education section: {}", education))
                .then();*/

        /*Mono<Void> commentMono = commentRepository.deleteAll()
                .thenMany(commentRepository.saveAll(List.of(
                        Comment.builder()
                                .id(null)
                                .commentId("91c940b1-24e8-463f-96ef-f54f7e4aaf2b")
                                .title("Comment 1")
                                .comment("This is a comment")
                                .build()
                )))
                .doOnNext(comment -> log.info("Preloaded comment section: {}", comment))
                .then();
*/

        /*Mono<Void> experienceMono = experienceRepository.deleteAll()
                .thenMany(experienceRepository.saveAll(List.of(
                        Experience.builder()
                                .id(null)
                                .experienceId("91c940b1-24e8-463f-96ef-f54f7e4aaf0u")
                                .company("Google")
                                .role("Software Engineer")
                                .startYear(2010)
                                .endYear(2012)
                                .build()
                )))
                .doOnNext(experience -> log.info("Preloaded experience section: {}", experience))
                .then();*/

       /* Mono<Void> projectsMono = projectsRepository.deleteAll()
                .thenMany(projectsRepository.saveAll(List.of(
                        Projects.builder()
                                .id(null)
                                .projectId("91c940b1-24e8-463f-96ef-f54f7e4aaf1e") // Changed project ID to avoid duplicate
                                .title("Project 1")
                                .description("This is a project")
                                .build()
                )))
                .doOnNext(projects -> log.info("Preloaded projects section: {}", projects))
                .then();*/

        // Combine all Monos and subscribe once
        Mono.when(aboutMono)
                .subscribe(
                        success -> log.info("Database preload completed successfully"),
                        error -> log.error("Error preloading database: {}", error.getMessage())
                );
    }
}
