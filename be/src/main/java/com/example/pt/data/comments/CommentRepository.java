package com.example.pt.data.comments;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface CommentRepository extends ReactiveMongoRepository<Comment, String> {
}