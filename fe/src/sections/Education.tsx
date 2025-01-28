import React from 'react';
import Section from '../Section';
import './Education.css';

const Education: React.FC = () => {
  return (
    <div className="education-page">
    <Section id="education" title="Education">
      <ul>
        <li>School 1 - Name - Dates</li>
        <li>School 2 - Name - Dates</li>
      </ul>
    </Section>
    </div>
  );
};

export default Education;