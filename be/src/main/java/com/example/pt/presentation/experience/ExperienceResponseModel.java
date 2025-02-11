package com.example.pt.presentation.experience;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
public class ExperienceResponseModel {
    private String experienceId;
    private String company;
    private String role;
    private String description;
    private int startYear;
    private int endYear;

    public ExperienceResponseModel() {

    }
}