package com.example.pt.data.contact;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "contact")

public class Contact {
    @Id
    private String id;

    private String contactId;
    private String name;
    private String email;
    private String message;
}
