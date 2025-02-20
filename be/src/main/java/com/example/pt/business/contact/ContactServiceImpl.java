package com.example.pt.business.contact;

import com.example.pt.data.contact.Contact;
import com.example.pt.data.contact.ContactRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.example.pt.presentation.contact.ContactRequestModel;
import com.example.pt.presentation.contact.ContactResponseModel;
import org.springframework.web.bind.annotation.PathVariable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;
import utils.exceptions.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ContactServiceImpl implements ContactService {

    private final EmailService emailService;

    public ContactServiceImpl(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public void sendEmail(String email, String subject, String message) {
        String fullMessage = "From: " + email + "\n\n" + message;
        emailService.sendEmail(email, subject, fullMessage);
    }
}
