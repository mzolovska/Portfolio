package com.example.pt.presentation.about;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AboutResponseModel {
    private String aboutId;
    private String name;
    private String description;

}