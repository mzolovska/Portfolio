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
    public AboutResponseModel getAbout(@PathVariable Long id) {
        return aboutService.getAbout(id);
    }

    @GetMapping
    public List<AboutResponseModel> getAllAbouts() {
        return aboutService.getAllAbouts();
    }

    @PutMapping("/{id}")
    public AboutResponseModel updateAbout(@PathVariable Long id, @RequestBody AboutRequestModel request) {
        return aboutService.updateAbout(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteAbout(@PathVariable Long id) {
        aboutService.deleteAbout(id);
    }
}