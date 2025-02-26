package com.example.pt.presentation.skills;

import com.example.pt.business.comments.CommentService;
import com.example.pt.business.skills.SkillsService;
import com.example.pt.data.comments.Comment;
import com.example.pt.data.skills.Skills;
import com.example.pt.presentation.comments.CommentRequestModel;
import com.example.pt.presentation.comments.CommentResponseModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import utils.EntityModelUtil;
@RestController
@RequestMapping("/api/v1/skills")
@RequiredArgsConstructor
@Slf4j
public class SkillsController {
    private final SkillsService skillsService;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<SkillsResponseModel> getAllSkills() {
        return skillsService.getAllSkills()
                .doOnNext(comment -> log.info("Skill: {}"));
    }

    @GetMapping(value = "/{skillsId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<SkillsResponseModel>> getSkillsById(@PathVariable String skillsId) {
        return skillsService.getSkillsById(skillsId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<SkillsResponseModel> addSkill(@RequestBody SkillsRequestModel skillsRequestModel) {
        log.info("Added new Skill: {}", skillsRequestModel.getName());
        return skillsService.addSkill(EntityModelUtil.toSkillsEntity(skillsRequestModel));
    }


    @PutMapping(value = "/{skillsId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<SkillsResponseModel>> updateSkills(@PathVariable String skillsId, @RequestBody SkillsRequestModel skillsRequestModel) {
        log.info("Updating comment with id: {}", skillsId);

        Skills updatedSkill = EntityModelUtil.toSkillsEntity(skillsRequestModel);
        updatedSkill.setSkillsId(skillsId);

        return skillsService.updateSkills(skillsId, Mono.just(skillsRequestModel))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }



    @DeleteMapping(value = "/{skillsId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteSkills(@PathVariable String skillsId) {
        log.info("Deleting comment with id: {}", skillsId);
        return skillsService.deleteSkills(skillsId);
    }
}




