package utils;

import com.example.pt.data.about.About;
import com.example.pt.data.comments.Comment;
import com.example.pt.data.contact.Contact;
import com.example.pt.data.education.Education;
import com.example.pt.data.experience.Experience;
import com.example.pt.data.projects.Projects;
import com.example.pt.presentation.about.AboutRequestModel;
import com.example.pt.presentation.about.AboutResponseModel;
import com.example.pt.presentation.comments.CommentRequestModel;
import com.example.pt.presentation.comments.CommentResponseModel;
import com.example.pt.presentation.contact.ContactRequestModel;
import com.example.pt.presentation.contact.ContactResponseModel;
import com.example.pt.presentation.education.EducationRequestModel;
import com.example.pt.presentation.education.EducationResponseModel;
import com.example.pt.presentation.experience.ExperienceRequestModel;
import com.example.pt.presentation.experience.ExperienceResponseModel;
import com.example.pt.presentation.projects.ProjectsRequestModel;
import com.example.pt.presentation.projects.ProjectsResponseModel;
import org.springframework.beans.BeanUtils;

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

    public static CommentResponseModel toCommentResponseModel(Comment comment) {
        CommentResponseModel commentResponseModel = new CommentResponseModel();
        BeanUtils.copyProperties(comment, commentResponseModel);
        return commentResponseModel;
    }

    public static Comment toCommentEntity(CommentRequestModel commentRequestModel) {
        return Comment.builder()
                .commentId(generateUUIDString())
                .title(commentRequestModel.getTitle())
                .comment(commentRequestModel.getComment())
                .build();
    }


   /* public static ContactResponseModel toContactResponseModel(Contact contact) {
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
*/
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
                .startDate(educationRequestModel.getStartDate())
                .endDate(educationRequestModel.getEndDate())
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
                .startDate(experienceRequestModel.getStartDate())
                .endDate(experienceRequestModel.getEndDate())
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
                .imageUrl(projectsRequestModel.getImageUrl())
                .githubLink(projectsRequestModel.getGithubLink())
                .build();
    }
}
