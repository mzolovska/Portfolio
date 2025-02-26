package com.example.pt.business.skills;

import com.example.pt.data.comments.Comment;
import com.example.pt.data.skills.Skills;
import com.example.pt.presentation.comments.CommentRequestModel;
import com.example.pt.presentation.comments.CommentResponseModel;
import com.example.pt.presentation.skills.SkillsRequestModel;
import com.example.pt.presentation.skills.SkillsResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SkillsService {

    Mono<SkillsResponseModel> addSkill(Skills skills);
    Flux<SkillsResponseModel> getAllSkills();
    Mono<SkillsResponseModel> getSkillsById(String skillsId);
    Mono<SkillsResponseModel> updateSkills(String skillsId, Mono<SkillsRequestModel> skillsRequestModelMono);
    Mono<Void> deleteSkills(String skillsId);

}
