package business.about;

import presentation.about.AboutRequestModel;
import presentation.about.AboutResponseModel;

import java.util.List;

public interface AboutService {
    AboutResponseModel createAbout(AboutRequestModel request);
    AboutResponseModel getAbout(Long id);
    List<AboutResponseModel> getAllAbouts();
    AboutResponseModel updateAbout(Long id, AboutRequestModel request);
    void deleteAbout(Long id);
}