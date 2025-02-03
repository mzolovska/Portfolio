import React from 'react';
import Section from '../Section';
import './Comments.css';

const Comments: React.FC = () => {
  return (
    <div className="comments-page">
    <Section id="comments" title="Leave Your Comment">
      <ul>
        <li>Here you can leave you comment</li>
      </ul>
    </Section>
    </div>
  );
};

export default Comments;