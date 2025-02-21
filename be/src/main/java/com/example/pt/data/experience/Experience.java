package com.example.pt.data.experience;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "experience")

public class Experience {
    @Id
    private String id;

    private String experienceId;
    private String company;
    private String role;
    private String description;
    private LocalDate startDate;  // Change from int to LocalDate
    private LocalDate endDate;
}