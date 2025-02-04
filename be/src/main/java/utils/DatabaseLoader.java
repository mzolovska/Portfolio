package utils;

import data.about.About;
import data.about.AboutRepository;
import data.contact.Contact;
import data.contact.ContactRepository;
import data.education.Education;
import data.education.EducationRepository;
import data.experience.Experience;
import data.experience.ExperienceRepository;
import data.projects.Projects;
import data.projects.ProjectsRepository;
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

    private final ContactRepository contactRepository;

    @PostConstruct
    public void loadContact() {
        List<Contact> sampleContact = List.of(
                Contact.builder()
                        .contactId("91c940b1-24e8-463f-96ef-f54f7e4aaf2r")
                        .name("Contact Me")
                        .message("You can contact me at")
                        .email("fesfferf")
                        .build()
        );

        // Clear existing data and insert new data
        contactRepository.deleteAll()
                .thenMany(contactRepository.saveAll(sampleContact))
                .doOnNext(contact -> log.info("Preloaded contact section: {}", contact))
                .subscribe(
                        success -> log.info("Contact Section preload successful"),
                        error -> log.error("Error loading Contact section: {}", error.getMessage())
                );


    }

    private final EducationRepository educationRepository;
    @PostConstruct
    public void loadEducation() {
        List<Education> sampleEducation = List.of(
                Education.builder()
                        .educationId("91c940b1-24e8-463f-96ef-f54f7e4aaf3p")
                        .institution("University of Lagos")
                        .degree("BSc")
                        .fieldOfStudy("Computer Science")
                        .startYear(2015)
                        .endYear(2019)
                        .build()
        );

        // Clear existing data and insert new data
        educationRepository.deleteAll()
                .thenMany(educationRepository.saveAll(sampleEducation))
                .doOnNext(education -> log.info("Preloaded education section: {}", education))
                .subscribe(
                        success -> log.info("Education Section preload successful"),
                        error -> log.error("Error loading Education section: {}", error.getMessage())
                );
    }


    private final ExperienceRepository experienceRepository;


    @PostConstruct
    public void loadExperience() {
        List<Experience> sampleExperience = List.of(
                Experience.builder()
                        .experienceId("91c940b1-24e8-463f-96ef-f54f7e4aaf0u")
                        .company("Google")
                        .role("Software Engineer")
                        .startYear(2010)
                        .endYear(2012)
                        .build()
        );

        // Clear existing data and insert new data
        experienceRepository.deleteAll()
                .thenMany(experienceRepository.saveAll(sampleExperience))
                .doOnNext(experience -> log.info("Preloaded experience section: {}", experience))
                .subscribe(
                        success -> log.info("Experience Section preload successful"),
                        error -> log.error("Error loading Experience section: {}", error.getMessage())
                );
    }


    private final ProjectsRepository projectsRepository;


    @PostConstruct
    public void loadProjects() {
        List<Projects> sampleProjects = List.of(
                Projects.builder()
                        .projectId("91c940b1-24e8-463f-96ef-f54f7e4aaf1d")
                        .title("Project 1")
                        .description("This is a project")
                        .build()
        );

        // Clear existing data and insert new data
        projectsRepository.deleteAll()
                .thenMany(projectsRepository.saveAll(sampleProjects))
                .doOnNext(projects -> log.info("Preloaded projects section: {}", projects))
                .subscribe(
                        success -> log.info("Projects Section preload successful"),
                        error -> log.error("Error loading Projects section: {}", error.getMessage())
                );
    }
}
