package com.example.pt.business.comments;

import com.example.pt.data.comments.Comment;
import com.example.pt.data.comments.CommentRepository;
import com.example.pt.presentation.comments.CommentRequestModel;
import com.example.pt.presentation.comments.CommentResponseModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;
import utils.exceptions.NotFoundException;

@Service
@Slf4j
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Mono<CommentResponseModel> createComment(Comment comment) {
        return commentRepository.save(comment)
                .map(EntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Flux<CommentResponseModel> getAllComments() {
        return commentRepository.findAll()
                .map(EntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Mono<CommentResponseModel> getCommentById(String commentId) {
        return commentRepository.findCommentByCommentId(commentId)
                .map(EntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Mono<CommentResponseModel> updateComment(@PathVariable String commentId, Mono<CommentRequestModel> commentRequestModel) {
        return commentRepository.findCommentByCommentId(commentId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Comment Id not found: " + commentId))))
                .flatMap(existingComment -> {
                    return commentRequestModel.map(request -> {
                        existingComment.setTitle(request.getTitle());
                        existingComment.setComment(request.getComment());
                        return existingComment;
                    });
                })
                .doOnSuccess(updatedComment -> log.info("Updated Comment {}: ", updatedComment))
                .map(EntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Mono<Void> deleteComment(String commentId) {
        return commentRepository.findCommentByCommentId(commentId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Comment Id not found: " + commentId))))
                .flatMap(commentRepository::delete)
                .doOnSuccess(deletedComment -> log.info("Deleted Comment {}: ", deletedComment));
    }
}
