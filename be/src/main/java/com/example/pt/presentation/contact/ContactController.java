package com.example.pt.presentation.contact;

import com.example.pt.business.contact.ContactService;
import com.example.pt.data.contact.Contact;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
@Slf4j
public class ContactController {

    private final ContactService contactService;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ContactResponseModel> getAllContacts() {
        return contactService.getAllContacts()
                .doOnNext(contact-> log.info("Contact: {}", contact));
    }


    @GetMapping(value = "/{contactId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ContactResponseModel>> getContactByContactId(@PathVariable String contactId) {
        return contactService.getContactByContactId(contactId)
                .doOnNext(contact -> log.info("Fetched Contact: {}", contact))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<ContactResponseModel> createContact(@RequestBody ContactRequestModel contactRequestModel) {
        log.info("Added new Contact: {}", contactRequestModel.getName());
        return contactService.createContact(EntityModelUtil.toContactEntity(contactRequestModel));
    }


    @PutMapping(value = {"/{contactId}"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ContactResponseModel>> updateContact(
            @PathVariable String contactId,
            @RequestBody ContactRequestModel contactRequestModel) {
        log.info("Updating contact with id: {}", contactId);

        Contact updatedContact = EntityModelUtil.toContactEntity(contactRequestModel);
        updatedContact.setContactId(contactId);

        return contactService.updateContact(contactId, Mono.just(contactRequestModel))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping(value = {"/{contactId}"}, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteContact(@PathVariable String contactId) {
        log.info("Deleting contact with id: {}", contactId);
        return contactService.deleteContact(contactId);
    }
}