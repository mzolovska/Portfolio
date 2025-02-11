package com.example.pt.business.contact;

import com.example.pt.data.contact.Contact;
import com.example.pt.data.contact.ContactRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.example.pt.presentation.contact.ContactRequestModel;
import com.example.pt.presentation.contact.ContactResponseModel;
import com.example.pt.utils.EntityModelUtil;
import com.example.pt.utils.exceptions.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public ContactResponseModel createContact(Contact contact) {
        Contact savedContact = contactRepository.save(contact);
        log.info("Added new contact: {}", savedContact);
        return EntityModelUtil.toContactResponseModel(savedContact);
    }

    @Override
    public List<ContactResponseModel> getAllContacts() {
        return contactRepository.findAll()
                .stream()
                .map(EntityModelUtil::toContactResponseModel)
                .collect(Collectors.toList());
    }

    @Override
    public ContactResponseModel getContactByContactId(String contactId) {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new NotFoundException("Contact Id not found: " + contactId));
        return EntityModelUtil.toContactResponseModel(contact);
    }

    @Override
    public ContactResponseModel updateContact(String contactId, ContactRequestModel contactRequestModel) {
        Contact existingContact = contactRepository.findById(contactId)
                .orElseThrow(() -> new NotFoundException("Contact Id not found: " + contactId));

        existingContact.setName(contactRequestModel.getName());
        existingContact.setMessage(contactRequestModel.getMessage());

        Contact updatedContact = contactRepository.save(existingContact);
        log.info("Updated Contact {}: ", updatedContact);
        return EntityModelUtil.toContactResponseModel(updatedContact);
    }

    @Override
    public void deleteContact(String contactId) {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new NotFoundException("Contact Id not found: " + contactId));

        contactRepository.delete(contact);
        log.info("Deleted Contact with id: {}", contactId);
    }
}
