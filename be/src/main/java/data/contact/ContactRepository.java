package data.contact;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface ContactRepository extends ReactiveMongoRepository<Contact, String> {
    Mono<Contact> findContactByContactId(String contactId);
}
