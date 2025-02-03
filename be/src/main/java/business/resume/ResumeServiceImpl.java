package business.resume;

import data.resume.Resume;
import data.resume.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import presentation.resume.ResumeResponseModel;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;

    @Override
    public ResumeResponseModel uploadResume(MultipartFile file) {
        try {
            Resume resume = Resume.builder()
                    .fileName(file.getOriginalFilename())
                    .fileType(file.getContentType())
                    .fileData(file.getBytes())
                    .build();

            resume = resumeRepository.save(resume);

            return new ResumeResponseModel(resume.getId(), resume.getFileName(), resume.getFileType());
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage());
        }
    }

    @Override
    public ResumeResponseModel getLatestResume() {
        Optional<Resume> resume = resumeRepository.findTopByOrderByIdDesc();
        return resume.map(r -> new ResumeResponseModel(r.getId(), r.getFileName(), r.getFileType()))
                .orElseThrow(() -> new RuntimeException("No resume found"));
    }
}
