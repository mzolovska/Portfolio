package com.example.pt.presentation.experience;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExperienceRequestModel {
    private String company;
    private String role;
    private String description;
    private int startYear;
    private int endYear;
}
