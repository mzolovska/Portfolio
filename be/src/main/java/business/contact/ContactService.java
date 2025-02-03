package business.contact;

import presentation.contact.ContactRequestModel;
import presentation.contact.ContactResponseModel;

import java.util.List;

public interface ContactService {
    ContactResponseModel createContact(ContactRequestModel request);
    List<ContactResponseModel> getAllContacts();
}