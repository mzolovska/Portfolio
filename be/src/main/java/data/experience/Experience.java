package data.experience;

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
@Document(collection = "experience")

public class Experience {
    @Id
    private String id;

    private String experienceId;
    private String company;
    private String role;
    private String description;
    private int startYear;
    private int endYear;
}