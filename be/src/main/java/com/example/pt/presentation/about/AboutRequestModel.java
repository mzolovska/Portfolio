package com.example.pt.presentation.about;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AboutRequestModel {
    private String name;
    private String description;
}