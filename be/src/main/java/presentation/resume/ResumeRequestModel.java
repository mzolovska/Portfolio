package presentation.resume;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ResumeRequestModel {
    private MultipartFile file;
}