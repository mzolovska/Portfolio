package business.resume;

import org.springframework.web.multipart.MultipartFile;
import presentation.resume.ResumeResponseModel;

public interface ResumeService {
    ResumeResponseModel uploadResume(MultipartFile file);
    ResumeResponseModel getLatestResume();
}