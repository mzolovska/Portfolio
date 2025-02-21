package com.example.pt.presentation.education;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class EducationResponseModel {
    private String educationId;
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private LocalDate startDate;  // Change from int to LocalDate
    private LocalDate endDate;

    public EducationResponseModel() {

    }
}