import React from "react";
import Slider from "react-slick";
import { FaGithub, FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { techIcons } from "./techIcons"; // Import the mapping
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProjectCard.css"; 
import { ProjectResponseModel } from "../api/useProjectsApi"; 

interface ProjectCardProps {
  project: ProjectResponseModel;
}

// 🏹 Custom Arrow Components
const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <FaArrowLeft 
      className={className} 
      style={{ ...style, display: "block", color: "black", fontSize: "24px" }} 
      onClick={onClick} 
    />
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <FaArrowRight 
      className={className} 
      style={{ ...style, display: "block", color: "black", fontSize: "24px" }} 
      onClick={onClick} 
    />
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, technologies, githubLink, imageUrl, projectLink } = project;
  const techArray = Array.isArray(technologies) ? technologies : [];

  // 🔧 Slick carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="project-card">
      <h3 className="project-title">{title}</h3>
      <img src={imageUrl} alt={title} className="project-image" />
      <p className="project-description">{description}</p>

      {/* 🛠️ Technologies Carousel */}
      <div className="tech-carousel-container">
      <Slider {...settings}>
        {techArray.map((tech, index) => (
          <div key={index} className="tech-item">
            {techIcons[tech] || tech}
          </div>
        ))}
      </Slider>
    </div>

      {projectLink && projectLink.trim() !== "" && (
        <a href={projectLink} target="_blank" rel="noopener noreferrer" className="project-link">
          <FaExternalLinkAlt className="deployed-icon" /> 
        </a>
      )}


      {/* 🔗 GitHub Link */}
      <a href={githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
        <FaGithub className="github-icon" /> View on GitHub
        
      </a>
    </div>
  );
};

export default ProjectCard;
