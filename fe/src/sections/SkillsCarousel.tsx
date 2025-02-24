import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { 
  FaJava, FaAws 
} from "react-icons/fa";
import { 
  SiReact, SiFigma, SiJira, SiJavascript, SiSpringboot, 
  SiNodedotjs, SiDocker, SiTypescript, SiAuth0, 
  SiDigitalocean, SiBootstrap, SiHtml5, SiCss3, SiPostman 
} from "react-icons/si";
import { useTranslation } from "react-i18next";


// 🎯 Skill List
const skills = [
  { name: "Java", icon: <FaJava /> }, 
  { name: "React", icon: <SiReact /> },
  { name: "Figma", icon: <SiFigma /> },
  { name: "Jira", icon: <SiJira /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Spring Boot", icon: <SiSpringboot /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Auth0", icon: <SiAuth0 /> },
  { name: "AWS", icon: <FaAws /> }, 
  { name: "DigitalOcean", icon: <SiDigitalocean /> },
  { name: "Bootstrap", icon: <SiBootstrap /> },
  { name: "HTML", icon: <SiHtml5 /> },
  { name: "CSS", icon: <SiCss3 /> },
  { name: "Postman", icon: <SiPostman /> },
];

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

// 🎡 Skills Carousel Component
const SkillsCarousel = () => {
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,  // Adjust number of visible items
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,  // Use custom arrow
    prevArrow: <PrevArrow />,  // Use custom arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="skills-carousel">
      <Slider {...settings}>
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            {skill.icon}
            <p>{skill.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SkillsCarousel;
