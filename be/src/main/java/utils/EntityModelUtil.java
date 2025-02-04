package utils;

import data.about.About;
import data.contact.Contact;
import data.education.Education;
import data.experience.Experience;
import data.projects.Projects;
import org.springframework.beans.BeanUtils;
import presentation.about.AboutRequestModel;
import presentation.about.AboutResponseModel;
import presentation.contact.ContactRequestModel;
import presentation.contact.ContactResponseModel;
import presentation.education.EducationRequestModel;
import presentation.education.EducationResponseModel;
import presentation.experience.ExperienceRequestModel;
import presentation.experience.ExperienceResponseModel;
import presentation.projects.ProjectsRequestModel;
import presentation.projects.ProjectsResponseModel;

import java.util.UUID;

public class EntityModelUtil {

    public static String generateUUIDString() {
        return UUID.randomUUID().toString();
    }


    public static AboutResponseModel toAboutResponseModel(About about) {
        AboutResponseModel aboutResponseModel = new AboutResponseModel();
        BeanUtils.copyProperties(about, aboutResponseModel);
        return aboutResponseModel;
    }

    public static About toAboutEntity(AboutRequestModel aboutRequestModel) {
        return About.builder()
                .aboutId(generateUUIDString())
                .name(aboutRequestModel.getName())
                .description(aboutRequestModel.getDescription())
                .build();
    }

    public static ContactResponseModel toContactResponseModel(Contact contact) {
        ContactResponseModel contactResponseModel = new ContactResponseModel();
        BeanUtils.copyProperties(contact, contactResponseModel);
        return contactResponseModel;
    }

    public static Contact toContactEntity(ContactRequestModel contactRequestModel) {
        return Contact.builder()
                .contactId(generateUUIDString())
                .name(contactRequestModel.getName())
                .email(contactRequestModel.getEmail())
                .message(contactRequestModel.getMessage())
                .build();
    }

    public static EducationResponseModel toEducationResponseModel(Education education) {
        EducationResponseModel educationResponseModel = new EducationResponseModel();
        BeanUtils.copyProperties(education, educationResponseModel);
        return educationResponseModel;
    }

    public static Education toEducationEntity(EducationRequestModel educationRequestModel) {
        return Education.builder()
                .educationId(generateUUIDString())
                .institution(educationRequestModel.getInstitution())
                .fieldOfStudy(educationRequestModel.getFieldOfStudy())
                .startYear(educationRequestModel.getStartYear())
                .endYear(educationRequestModel.getEndYear())
                .build();
    }

    public static ExperienceResponseModel toExperienceResponseModel(Experience experience) {
        ExperienceResponseModel experienceResponseModel = new ExperienceResponseModel();
        BeanUtils.copyProperties(experience, experienceResponseModel);
        return experienceResponseModel;
    }

    public static Experience toExperienceEntity(ExperienceRequestModel experienceRequestModel) {
        return Experience.builder()
                .experienceId(generateUUIDString())
                .company(experienceRequestModel.getCompany())
                .role(experienceRequestModel.getRole())
                .description(experienceRequestModel.getDescription())
                .startYear(experienceRequestModel.getStartYear())
                .endYear(experienceRequestModel.getEndYear())
                .build();
    }

    public static ProjectsResponseModel toProjectsResponseModel(Projects projects) {
        ProjectsResponseModel projectsResponseModel = new ProjectsResponseModel();
        BeanUtils.copyProperties(projects, projectsResponseModel);
        return projectsResponseModel;
    }

    public static Projects toProjectsEntity(ProjectsRequestModel projectsRequestModel) {
        return Projects.builder()
                .projectId(generateUUIDString())
                .title(projectsRequestModel.getTitle())
                .description(projectsRequestModel.getDescription())
                .technologies(projectsRequestModel.getTechnologies())
                .link(projectsRequestModel.getLink())
                .build();
    }
}
