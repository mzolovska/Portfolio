package business.contact;

import data.contact.Contact;
import data.contact.ContactRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import presentation.contact.ContactRequestModel;
import presentation.contact.ContactResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;
import utils.exceptions.NotFoundException;

@Service
@Slf4j
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }


    @Override
    public Mono<ContactResponseModel> createContact(Contact contact) {
        return contactRepository.save(contact)
                .doOnSuccess(savedContact -> log.info("Added new contact: {}", savedContact))
                .map(EntityModelUtil::toContactResponseModel);
    }

    @Override
    public Flux<ContactResponseModel> getAllContacts() {
        return contactRepository.findAll()
                .map(EntityModelUtil::toContactResponseModel);
    }

    @Override
    public Mono<ContactResponseModel> getContactByContactId(String contactId) {
        return contactRepository.findContactByContactId(contactId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Contact Id not found: " + contactId))))
                .map(EntityModelUtil::toContactResponseModel);
    }

    @Override
    public Mono<ContactResponseModel> updateContact(@PathVariable String contactId, Mono<ContactRequestModel> contactRequestModel) {
        return contactRepository.findContactByContactId(contactId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Contact Id not found: " + contactId))))
                .flatMap(existingContact -> {
                    return contactRequestModel.map(request -> {
                        existingContact.setName(request.getName());
                        existingContact.setMessage(request.getMessage());
                        return existingContact;
                    });
                })
                .doOnSuccess(updatedContact -> log.info("Updated Contact {}: ", updatedContact))
                .map(EntityModelUtil::toContactResponseModel);
    }

    @Override
    public Mono<Void> deleteContact(String contactId) {
        return contactRepository.findContactByContactId(contactId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Contact Id not found: " + contactId))))
                .flatMap(contactRepository::delete)
                .doOnSuccess(deletedContact -> log.info("Deleted Contact {}: ", deletedContact));
    }
}