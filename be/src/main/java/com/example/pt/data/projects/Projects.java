package com.example.pt.data.projects;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

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
    private String imageUrl; // Store the image URL
    private List<String> technologies; // Change from String to List<String>
    private String githubLink;
    private String projectLink;
}