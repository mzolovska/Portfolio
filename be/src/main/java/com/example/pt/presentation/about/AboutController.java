package com.example.pt.presentation.about;

import com.example.pt.business.about.AboutService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.pt.utils.EntityModelUtil;

import java.util.List;

@RestController
@RequestMapping("/api/v1/about")
@Slf4j
@CrossOrigin("http://localhost:3000")

@RequiredArgsConstructor
public class AboutController {
    @Autowired
    private  AboutService aboutService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AboutResponseModel> createAbout(@Valid @RequestBody AboutRequestModel request) {
        log.info("Added new About: {}", request.getName());
        AboutResponseModel response = aboutService.createAbout(EntityModelUtil.toAboutEntity(request));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{aboutId}")
    public ResponseEntity<AboutResponseModel> getAboutById(@PathVariable String aboutId) {
        return ResponseEntity.ok(aboutService.getAboutById(aboutId));
    }


    @GetMapping
    public ResponseEntity<List<AboutResponseModel>> getAllAbouts() {
        return ResponseEntity.status(HttpStatus.OK).body(aboutService.getAllAbouts());
    }

    @PutMapping("/{aboutId}")
    public ResponseEntity<AboutResponseModel> updateAbout(
            @PathVariable String aboutId, @Valid @RequestBody AboutRequestModel request) {
        log.info("Updating about with id: {}", aboutId);
        AboutResponseModel updatedAbout = aboutService.updateAbout(aboutId, request);
        return ResponseEntity.ok(updatedAbout);
    }

    @DeleteMapping("/{aboutId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAbout(@PathVariable String aboutId) {
        log.info("Deleting about with id: {}", aboutId);
        aboutService.deleteAbout(aboutId);
    }
}
