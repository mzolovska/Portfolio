package com.example.pt.data.comments;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "comments")
public class Comment {
    @Id
    private String id;

    private String commentId;
    private String title;
    private String comment;
}
