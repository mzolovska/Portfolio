import React from 'react';
import Section from '../Section';
import './Experience.css';

const Experience: React.FC = () => {
  return (
    <div className="experience-page">
    <Section id="experience" title="Experience">
      <ul>
        <li>Job 1 - Role - Dates</li>
        <li>Job 2 - Role - Dates</li>
      </ul>
    </Section>
    </div>
  );
};

export default Experience;