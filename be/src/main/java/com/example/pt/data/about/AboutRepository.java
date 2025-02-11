package com.example.pt.data.about;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface AboutRepository extends ReactiveMongoRepository<About, String> {
    Mono<About> findAboutByAboutId(String aboutId);
}
