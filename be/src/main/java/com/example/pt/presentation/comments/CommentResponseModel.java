package com.example.pt.presentation.comments;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CommentResponseModel {
    private String commentId;
    private String title;
    private String comment;
    private boolean isApproved;
    public CommentResponseModel() {

    }

}
