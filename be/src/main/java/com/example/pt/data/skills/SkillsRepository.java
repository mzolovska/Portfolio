package com.example.pt.data.skills;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface SkillsRepository extends ReactiveMongoRepository<Skills, String> {

    Mono<Skills> findSkillsBySkillsId(String skillsId);
}
