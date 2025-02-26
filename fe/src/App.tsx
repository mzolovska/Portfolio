import React from 'react';
import CoverPage from './sections/CoverPage';
import Navbar from './NavBar';
import Footer from './Footer';
import AboutMe from './sections/AboutMe';
import Projects from './sections/Projects';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import Comments from './sections/Comments';
import './App.css';
import EducationExperience from './sections/EducationExperience';
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="app">
        <ToastContainer position="top-center" autoClose={3000} />
        <main>
          <CoverPage />
          <AboutMe />
          <EducationExperience />
          <Projects />
          <Contact />
          <Comments />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
