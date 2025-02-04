package data.experience;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface ExperienceRepository extends ReactiveMongoRepository<Experience, String> {
    Mono<Experience> findExperienceByExperienceId (String experienceId);
}