package presentation.contact;

import business.contact.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactResponseModel> createContact(@RequestBody ContactRequestModel request) {
        return ResponseEntity.ok(contactService.createContact(request));
    }

    @GetMapping
    public ResponseEntity<List<ContactResponseModel>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }
}