package presentation.education;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EducationResponseModel {
    private Long id;
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private int startYear;
    private int endYear;
}