package com.example.pt.business.comments;

import com.example.pt.data.comments.Comment;
import com.example.pt.presentation.comments.CommentRequestModel;
import com.example.pt.presentation.comments.CommentResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CommentService {
    Mono<CommentResponseModel> createComment(Comment comment);
    Flux<CommentResponseModel> getAllComments();
    Mono<CommentResponseModel> getCommentById(String commentId);
    Mono<CommentResponseModel> updateComment(String commentId, Mono<CommentRequestModel> commentRequestModel);
    Mono<Void> deleteComment(String commentId);
    Mono<CommentResponseModel> approveComment(String commentId);

}

