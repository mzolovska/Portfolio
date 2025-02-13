package com.example.pt.business.comments;

import com.example.pt.data.comments.Comment;
import com.example.pt.data.comments.CommentRepository;
import com.example.pt.presentation.comments.CommentRequestModel;
import com.example.pt.presentation.comments.CommentResponseModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;

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
        return commentRepository.findById(commentId)
                .map(EntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Mono<CommentResponseModel> updateComment(String commentId, Mono<CommentRequestModel> commentRequestModel) {
        return commentRepository.findById(commentId)
                .flatMap(existingComment -> commentRequestModel.map(EntityModelUtil::toCommentEntity))
                .flatMap(commentRepository::save)
                .map(EntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Mono<Void> deleteComment(String commentId) {
        return commentRepository.deleteById(commentId);
    }
}
