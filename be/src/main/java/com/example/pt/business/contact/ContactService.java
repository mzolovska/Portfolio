package com.example.pt.business.contact;

import com.example.pt.data.contact.Contact;
import com.example.pt.presentation.contact.ContactRequestModel;
import com.example.pt.presentation.contact.ContactResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ContactService {
    void sendEmail(String email, String subject, String message);

}
