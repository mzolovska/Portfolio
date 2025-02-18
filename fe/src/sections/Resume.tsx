import React from 'react';
import Section from '../Section';
import './Resume.css';

const Resume: React.FC = () => {
  return (
    <div className="resume-page">
      <Section id="resume" title="Resume">
        <ul>
          <li>
            You can download my resume by clicking{" "}
            <a href="/ResumeMariyaZolovska.pdf" download="My_Resume.pdf">
              here
            </a>
            !
          </li>
        </ul>
      </Section>
    </div>
  );
};

export default Resume;
