package presentation.experience;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
public class ExperienceResponseModel {
    private Long id;
    private String company;
    private String role;
    private String description;
    private int startYear;
    private int endYear;
}