import React from 'react';
import Section from '../Section';
import './Projects.css';

const Projects: React.FC = () => {
  return (
    <div className="projects-page">
    <Section id="projects" title="Projects">
      <ul>
        <li>Project 1 - Explanation - Dates</li>
        <li>Project 2 - Explanation - Dates</li>
      </ul>
    </Section>
    </div>
  );
};

export default Projects;