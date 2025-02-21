package com.example.pt.data.education;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "education")

public class Education {
    @Id
    private String id;

    private String educationId;
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private LocalDate startDate;  // Change from int to LocalDate
    private LocalDate endDate;
}
