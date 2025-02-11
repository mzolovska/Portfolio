package com.example.pt.data.about;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "about")

public class About {
    @Id
    private String id;

    private String aboutId;
    private String name;
    private String description;
}
