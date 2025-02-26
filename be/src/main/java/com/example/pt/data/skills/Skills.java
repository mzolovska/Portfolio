package com.example.pt.data.skills;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "skills")
public class Skills {
    @Id
    private String id;

    private String skillsId;
    private String name;
    private String icon;
}