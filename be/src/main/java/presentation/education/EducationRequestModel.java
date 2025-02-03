package presentation.education;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EducationRequestModel {
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private int startYear;
    private int endYear;
}