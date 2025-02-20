package com.example.pt.presentation.contact;

import com.example.pt.business.contact.ContactService;
import com.example.pt.business.contact.EmailService;
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
@Slf4j
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody ContactRequestModel contactRequest) {
        emailService.sendEmail(contactRequest.getEmail(), contactRequest.getSubject(), contactRequest.getMessage());
        return ResponseEntity.ok("Message sent successfully!");
    }
}