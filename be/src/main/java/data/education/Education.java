package data.education;

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
@Document(collection = "education")

public class Education {
    @Id
    private String id;

    private String educationId;
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private int startYear;
    private int endYear;
}
