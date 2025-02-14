package com.example.pt.presentation.projects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ProjectsResponseModel {
    private String projectId;
    private String title;
    private String description;
    private String technologies;
    private String link;

    public ProjectsResponseModel() {

    }
}
