package business.contact;

import data.contact.Contact;
import data.contact.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import presentation.contact.ContactRequestModel;
import presentation.contact.ContactResponseModel;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    @Override
    public ContactResponseModel createContact(ContactRequestModel request) {
        Contact contact = Contact.builder()
                .name(request.getName())
                .email(request.getEmail())
                .message(request.getMessage())
                .build();

        contact = contactRepository.save(contact);
        return new ContactResponseModel(contact.getId(), contact.getName(), contact.getEmail(), contact.getMessage());
    }

    @Override
    public List<ContactResponseModel> getAllContacts() {
        return contactRepository.findAll().stream()
                .map(contact -> new ContactResponseModel(contact.getId(), contact.getName(), contact.getEmail(), contact.getMessage()))
                .collect(Collectors.toList());
    }
}