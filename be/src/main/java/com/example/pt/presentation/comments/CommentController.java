package com.example.pt.presentation.comments;

import com.example.pt.business.comments.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
@Slf4j
public class CommentController {
    private final CommentService commentService;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<CommentResponseModel> getAllComments() {
        return commentService.getAllComments()
                .doOnNext(comment -> log.info("Comment: {}", comment));
    }

    @GetMapping(value = "/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<CommentResponseModel>> getCommentById(@PathVariable String commentId) {
        return commentService.getCommentById(commentId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<CommentResponseModel> createComment(@RequestBody CommentRequestModel commentRequestModel) {
        log.info("Added new Comment: {}", commentRequestModel.getTitle());
        return commentService.createComment(EntityModelUtil.toCommentEntity(commentRequestModel));
    }

    @PutMapping(value = "/{commentId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<CommentResponseModel>> updateComment(@PathVariable String commentId, @RequestBody CommentRequestModel commentRequestModel) {
        log.info("Updating comment with id: {}", commentId);
        return commentService.updateComment(commentId, Mono.just(commentRequestModel))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping(value = "/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteComment(@PathVariable String commentId) {
        log.info("Deleting comment with id: {}", commentId);
        return commentService.deleteComment(commentId);
    }
}

