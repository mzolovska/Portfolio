package data.projects;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "projects")

public class Projects {
    @Id
    private String id;

    private String projectId;
    private String title;
    private String description;
    private String technologies;
    private String link;
}