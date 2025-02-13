package com.example.pt.presentation.education;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EducationResponseModel {
    private String educationId;
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private int startYear;
    private int endYear;

    public EducationResponseModel() {

    }
}