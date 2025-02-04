package business.contact;

import data.contact.Contact;
import presentation.contact.ContactRequestModel;
import presentation.contact.ContactResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ContactService {
    Mono<ContactResponseModel> createContact(Contact contact);
    Flux<ContactResponseModel> getAllContacts();
    Mono<ContactResponseModel> getContactByContactId(String contactId);
    Mono<ContactResponseModel> updateContact(String contactId, Mono<ContactRequestModel> contactRequestModel);
    Mono<Void> deleteContact(String contactId);
}