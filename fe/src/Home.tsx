import React from "react";

const Home: React.FC = () => {
  return (
    <div className="pt-16">
      <section
        id="main"
        className="h-screen bg-[#F5E3C3] text-gray-800 flex flex-col justify-center items-center"
      >
        <h1 className="text-7xl font-bold">Mariya Zolovska</h1>
      </section>


      <section
        id="about"
        className= "block"
        
      >
        <h2 className="text-6xl font-bold mb-4">About Me</h2>
        <p className="text-lg text-center max-w-2xl">
          I am a passionate developer who loves creating amazing projects.
        </p>
      </section>
      
      
      <section
        id="experience"
        className= "block"
      >
        <h2 className="text-6xl font-bold mb-4">Experience</h2>
        <p className="text-lg text-center max-w-2xl">
          I have worked on various projects in the tech industry.
        </p>
      </section>
      <section
        id="education"
        className= "block"
      >
        <h2 className="text-6xl font-bold mb-4">Education</h2>
        <p className="text-lg text-center max-w-2xl">
          I graduated with a degree in Computer Science.
        </p>
      </section>
      <section
        id="projects"
        className= "block"
      >
        <h2 className="text-6xl font-bold mb-4">Projects</h2>
        <p className="text-lg text-center max-w-2xl">
          Take a look at my projects showcasing my skills and creativity.
        </p>
      </section>

      <section
        id="resume"
        className= "block"
      >
        <h2 className="text-6xl font-bold mb-4">Resume</h2>
        <p className="text-lg text-center max-w-2xl">
          Download my resume to see my professional journey.
        </p>
      </section>

      <section
        id="contact"
        className= "block"
      >
        <h2 className="text-6xl font-bold mb-4">Contact</h2>
        <p className="text-lg text-center max-w-2xl">
          Reach out to me at: example@example.com
        </p>
      </section>
    </div>
  );
};

export default Home;
