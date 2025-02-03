import React from 'react';
import Section from '../Section';
import './Hobbies.css';

const Hobbies: React.FC = () => {
  return (
    <div className="hobbies-page">
    <Section id="hobbies" title="Hobbies">
      <ul>
        <li>First Hobby</li>
        <li>Second Hobby</li>
      </ul>
    </Section>
    </div>
  );
};

export default Hobbies;