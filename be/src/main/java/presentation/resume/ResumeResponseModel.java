package presentation.resume;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResumeResponseModel {
    private Long id;
    private String fileName;
    private String fileType;
}