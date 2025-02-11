package com.example.pt.business.about;

import com.example.pt.data.about.About;
import com.example.pt.presentation.about.AboutRequestModel;
import com.example.pt.presentation.about.AboutResponseModel;

import java.util.List;

public interface AboutService {
    AboutResponseModel createAbout(About about);
    AboutResponseModel getAboutById(String aboutId);
    List<AboutResponseModel> getAllAbouts();
    AboutResponseModel updateAbout(String aboutId, AboutRequestModel aboutRequestModel);
    void deleteAbout(String aboutId);
}
