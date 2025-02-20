package com.example.pt.presentation.contact;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactRequestModel {
    private String email;
    private String subject;
    private String message;

    public String getEmail() { return email; }
    public String getSubject() { return subject; }
    public String getMessage() { return message; }
}
