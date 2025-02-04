package presentation.contact;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ContactResponseModel {
    private String contactId;
    private String name;
    private String email;
    private String message;

    public ContactResponseModel() {

    }
}