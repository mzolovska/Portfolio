package presentation.projects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ProjectsResponseModel {
    private Long id;
    private String title;
    private String description;
    private String technologies;
    private String link;
}
