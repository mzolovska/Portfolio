package presentation.about;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AboutResponseModel {
    private String aboutId;
    private String name;
    private String description;

    public AboutResponseModel() {

    }
}