package com.example.pt.business.contact;

import com.example.pt.data.contact.Contact;
import com.example.pt.presentation.contact.ContactRequestModel;
import com.example.pt.presentation.contact.ContactResponseModel;

import java.util.List;

public interface ContactService {
    ContactResponseModel createContact(Contact contact);
    List<ContactResponseModel> getAllContacts();
    ContactResponseModel getContactByContactId(String contactId);
    ContactResponseModel updateContact(String contactId, ContactRequestModel contactRequestModel);
    void deleteContact(String contactId);
}
