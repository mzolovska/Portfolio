import React from 'react';
import Section from '../Section';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
    <Section id="contact" title="Contact Me">
      <ul>
        <li>LinkedIn:</li>
        <li>GitHub:</li>
      </ul>
    </Section>
    </div>
  );
};

export default Contact;