package data.education;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface EducationRepository extends ReactiveMongoRepository<Education, String> {
    Mono<Education> findEducationByEducationId(String educationId);
}