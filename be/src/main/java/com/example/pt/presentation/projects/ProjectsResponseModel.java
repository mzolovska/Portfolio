package com.example.pt.presentation.projects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class ProjectsResponseModel {
    private String projectId;
    private String title;
    private String description;
    private String imageUrl; // Store the image URL
    private List<String> technologies; // Change from String to List<String>
    private String githubLink;

    public ProjectsResponseModel() {

    }
}
