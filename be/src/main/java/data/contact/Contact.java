package data.contact;

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
@Document(collection = "contact")

public class Contact {
    @Id
    private String id;

    private String contactId;
    private String name;
    private String email;
    private String message;
}
