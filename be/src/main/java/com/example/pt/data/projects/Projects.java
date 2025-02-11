package com.example.pt.data.projects;

import lombok.*;
import org.springframework.data.annotation.Id;
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