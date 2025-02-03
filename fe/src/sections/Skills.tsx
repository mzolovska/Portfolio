import React from 'react';
import Section from '../Section';
import './Skills.css';

const Skills: React.FC = () => {
  return (
    <div className="skills-page">
    <Section id="skills" title="Skills">
      <ul>
        <li>First Skill</li>
        <li>Second Skill</li>
      </ul>
    </Section>
    </div>
  );
};

export default Skills;