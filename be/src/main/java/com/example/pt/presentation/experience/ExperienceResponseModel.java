package com.example.pt.presentation.experience;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ExperienceResponseModel {
    private String experienceId;
    private String company;
    private String role;
    private String description;
    private LocalDate startDate;  // Change from int to LocalDate
    private LocalDate endDate;

    public ExperienceResponseModel() {

    }
}