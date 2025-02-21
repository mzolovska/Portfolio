package com.example.pt.presentation.education;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EducationRequestModel {
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private LocalDate startDate;  // Change from int to LocalDate
    private LocalDate endDate;
}