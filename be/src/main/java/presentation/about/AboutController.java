package presentation.about;

import business.about.AboutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/about")
public class AboutController {

    @Autowired
    private AboutService aboutService;

    @PostMapping
    public AboutResponseModel createAbout(@RequestBody AboutRequestModel request) {
        return aboutService.createAbout(request);
    }

    @GetMapping("/{id}")
    public AboutResponseModel getAbout(@PathVariable String aboutId) {
        return aboutService.getAbout(aboutId);
    }

    @GetMapping
    public List<AboutResponseModel> getAllAbouts() {
        return aboutService.getAllAbouts();
    }

    @PutMapping("/{id}")
    public AboutResponseModel updateAbout(@PathVariable String aboutId, @RequestBody AboutRequestModel request) {
        return aboutService.updateAbout(aboutId, request);
    }

    @DeleteMapping("/{id}")
    public void deleteAbout(@PathVariable String aboutId) {
        aboutService.deleteAbout(aboutId);
    }
}