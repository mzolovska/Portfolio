import React from 'react';
import CoverPage from './sections/CoverPage';
import Navbar from './NavBar';
import AboutMe from './sections/AboutMe';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Hobbies from './sections/Hobbies';
import Projects from './sections/Projects';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import Comments from './sections/Comments';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <CoverPage />
      <AboutMe />
      <Experience />
      <Education />
      <Skills />
      <Hobbies />
      <Projects />
      <Resume />
      <Contact />
      <Comments />
    </div>
  );
};

export default App;