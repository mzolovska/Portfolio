package com.example.pt.business.about;

import com.example.pt.data.about.About;
import com.example.pt.data.about.AboutRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.example.pt.presentation.about.AboutRequestModel;
import com.example.pt.presentation.about.AboutResponseModel;
import com.example.pt.utils.EntityModelUtil;
import com.example.pt.utils.exceptions.NotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AboutServiceImpl implements AboutService {

    private final AboutRepository aboutRepository;

    @Override
    public List<AboutResponseModel> getAllAbouts() {
        List<About> abouts = aboutRepository.findAll();
        return abouts.stream()
                .map(about -> new AboutResponseModel(about.getAboutId(), about.getName(), about.getDescription()))
                .collect(Collectors.toList());
    }


    public AboutResponseModel getAboutById(String aboutId) {
        About about = aboutRepository.findAboutByAboutId(aboutId)
                .orElseThrow(() -> new RuntimeException("About not found!"));
        return new AboutResponseModel(about.getAboutId(), about.getName(), about.getDescription());
    }


    @Override
    public AboutResponseModel createAbout(About about) {
        About savedAbout = aboutRepository.save(about);
        log.info("Added new about: {}", savedAbout);
        return EntityModelUtil.toAboutResponseModel(savedAbout);
    }

    @Override
    public AboutResponseModel updateAbout(String aboutId, AboutRequestModel aboutRequestModel) {
        About existingAbout = aboutRepository.findById(aboutId)
                .orElseThrow(() -> new NotFoundException("About Id not found: " + aboutId));

        existingAbout.setName(aboutRequestModel.getName());
        existingAbout.setDescription(aboutRequestModel.getDescription());

        About updatedAbout = aboutRepository.save(existingAbout);
        log.info("Updated About {}: ", updatedAbout);
        return EntityModelUtil.toAboutResponseModel(updatedAbout);
    }

    @Override
    public void deleteAbout(String aboutId) {
        if (!aboutRepository.existsById(aboutId)) {
            throw new NotFoundException("About Id not found: " + aboutId);
        }
        aboutRepository.deleteById(aboutId);
        log.info("Deleted about with id {}", aboutId);
    }
}
