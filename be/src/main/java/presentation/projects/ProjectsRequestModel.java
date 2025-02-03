package presentation.projects;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProjectsRequestModel {
    private String title;
    private String description;
    private String technologies;
    private String link;
}
