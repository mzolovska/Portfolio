package com.example.pt.presentation.skills;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SkillsResponseModel {

    private String skillsId;
    private String name;
    private String icon;

    public SkillsResponseModel() {

    }
}
