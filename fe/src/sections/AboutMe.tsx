import React from 'react';
import Section from '../Section';
import './AboutMe.css';

const AboutMe: React.FC = () => {
  return (
    <div className="about-page">
    <Section id="about" title="About Me" >
      <p>Hello! I'm a passionate developer with experience in...</p>
    </Section>
    </div>
  );
};

export default AboutMe;