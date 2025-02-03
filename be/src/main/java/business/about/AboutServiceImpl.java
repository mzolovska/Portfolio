package business.about;

import data.about.About;
import data.about.AboutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import presentation.about.AboutRequestModel;
import presentation.about.AboutResponseModel;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AboutServiceImpl implements AboutService {

    @Autowired
    private AboutRepository aboutRepository;

    @Override
    public AboutResponseModel createAbout(AboutRequestModel request) {
        About about = new About();
        about.setName(request.getName());
        about.setDescription(request.getDescription());
        About savedAbout = aboutRepository.save(about);
        return new AboutResponseModel(savedAbout.getId(), savedAbout.getName(), savedAbout.getDescription());
    }

    @Override
    public AboutResponseModel getAbout(Long id) {
        About about = aboutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("About section not found"));
        return new AboutResponseModel(about.getId(), about.getName(), about.getDescription());
    }

    @Override
    public List<AboutResponseModel> getAllAbouts() {
        return aboutRepository.findAll()
                .stream()
                .map(about -> new AboutResponseModel(about.getId(), about.getName(), about.getDescription()))
                .collect(Collectors.toList());
    }

    @Override
    public AboutResponseModel updateAbout(Long id, AboutRequestModel request) {
        About about = aboutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("About section not found"));

        about.setName(request.getName());
        about.setDescription(request.getDescription());

        About updatedAbout = aboutRepository.save(about);
        return new AboutResponseModel(updatedAbout.getId(), updatedAbout.getName(), updatedAbout.getDescription());
    }

    @Override
    public void deleteAbout(Long id) {
        aboutRepository.deleteById(id);
    }
}