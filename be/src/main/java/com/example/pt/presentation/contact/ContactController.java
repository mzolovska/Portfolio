package com.example.pt.presentation.contact;

import com.example.pt.business.contact.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.pt.utils.EntityModelUtil;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("http://localhost:3000")

public class ContactController {

    private final ContactService contactService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContactResponseModel>> getAllContacts() {
        List<ContactResponseModel> contacts = contactService.getAllContacts();
        log.info("Fetched {} contacts", contacts.size());
        return ResponseEntity.ok(contacts);
    }

    @GetMapping(value = "/{contactId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ContactResponseModel> getContactByContactId(@PathVariable String contactId) {
        ContactResponseModel contact = contactService.getContactByContactId(contactId);
        log.info("Fetched Contact: {}", contact);
        return ResponseEntity.ok(contact);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ContactResponseModel> createContact(@RequestBody ContactRequestModel contactRequestModel) {
        log.info("Adding new Contact: {}", contactRequestModel.getName());
        ContactResponseModel createdContact = contactService.createContact(EntityModelUtil.toContactEntity(contactRequestModel));
        return ResponseEntity.status(HttpStatus.CREATED).body(createdContact);
    }

    @PutMapping(value = "/{contactId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ContactResponseModel> updateContact(
            @PathVariable String contactId,
            @RequestBody ContactRequestModel contactRequestModel) {
        log.info("Updating contact with id: {}", contactId);
        ContactResponseModel updatedContact = contactService.updateContact(contactId, contactRequestModel);
        return ResponseEntity.ok(updatedContact);
    }

    @DeleteMapping(value = "/{contactId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteContact(@PathVariable String contactId) {
        log.info("Deleting contact with id: {}", contactId);
        contactService.deleteContact(contactId);
    }
}
