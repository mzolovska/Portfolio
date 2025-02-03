package presentation.resume;

import business.resume.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<ResumeResponseModel> uploadResume(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(resumeService.uploadResume(file));
    }

    @GetMapping("/latest")
    public ResponseEntity<byte[]> getLatestResume() {
        ResumeResponseModel resume = resumeService.getLatestResume();
        byte[] fileData = resumeService.getLatestResume().getFileName().getBytes(); // Placeholder

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resume.getFileName() + "\"")
                .body(fileData);
    }
}