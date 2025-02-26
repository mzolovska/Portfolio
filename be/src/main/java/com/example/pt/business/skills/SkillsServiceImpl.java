package com.example.pt.business.skills;

import com.example.pt.data.comments.Comment;
import com.example.pt.data.skills.Skills;
import com.example.pt.data.skills.SkillsRepository;
import com.example.pt.presentation.comments.CommentRequestModel;
import com.example.pt.presentation.comments.CommentResponseModel;
import com.example.pt.presentation.skills.SkillsRequestModel;
import com.example.pt.presentation.skills.SkillsResponseModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;
import utils.exceptions.NotFoundException;

@Service
@Slf4j
public class SkillsServiceImpl implements SkillsService{
    private final SkillsRepository skillsRepository;

    public SkillsServiceImpl(SkillsRepository skillsRepository) {
        this.skillsRepository = skillsRepository;
    }

    @Override
    public Mono<SkillsResponseModel> addSkill(Skills skills) {
        return skillsRepository.save(skills)
                .map(EntityModelUtil::toSkillsResponseModel);
    }

    @Override
    public Flux<SkillsResponseModel> getAllSkills() {
        return skillsRepository.findAll()
                .map(EntityModelUtil::toSkillsResponseModel);
    }


    @Override
    public Mono<SkillsResponseModel> getSkillsById(String skillsId) {
        return skillsRepository.findSkillsBySkillsId(skillsId)
                .map(EntityModelUtil::toSkillsResponseModel);
    }


    @Override
    public Mono<SkillsResponseModel> updateSkills(String skillsId, Mono<SkillsRequestModel> skillsRequestModelMono) {
        return skillsRepository.findSkillsBySkillsId(skillsId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Skills Id not found: " + skillsId))))
                .flatMap(existingSkills -> {
                    return skillsRequestModelMono.map(request -> {
                        existingSkills.setName(request.getName());
                        existingSkills.setIcon(request.getIcon());
                        return existingSkills;
                    });
                })
                .doOnSuccess(updatedSkills -> log.info("Updated Skills {}: ", updatedSkills))
                .map(EntityModelUtil::toSkillsResponseModel);
    }

    @Override
    public Mono<Void> deleteSkills(String skillsId) {
        return skillsRepository.findSkillsBySkillsId(skillsId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotFoundException("Skills Id not found: " + skillsId))))
                .flatMap(skillsRepository::delete)
                .doOnSuccess(deletedSkills -> log.info("Deleted Skills {}: ", deletedSkills));
    }
}





