package data.projects;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface ProjectsRepository extends ReactiveMongoRepository<Projects, String> {
    Mono<Projects> findProjectsByProjectId(String projectId);
}