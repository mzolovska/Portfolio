import { 
    FaJava, FaAws, FaGithub 
  } from "react-icons/fa";
  import { 
    SiReact, SiFigma, SiJira, SiJavascript, SiSpringboot, 
    SiNodedotjs, SiDocker, SiTypescript, SiAuth0, 
    SiDigitalocean, SiBootstrap, SiHtml5, SiCss3, SiPostman, 
    SiMongodb
  } from "react-icons/si";
  
  // 🔗 Map technology names to corresponding icons
  export const techIcons: { [key: string]: JSX.Element } = {
    "Java": <FaJava />,
    "React": <SiReact />,
    "Figma": <SiFigma />,
    "Jira": <SiJira />,
    "JavaScript": <SiJavascript />,
    "Spring Boot": <SiSpringboot />,
    "Node.js": <SiNodedotjs />,
    "Docker": <SiDocker />,
    "TypeScript": <SiTypescript />,
    "Auth0": <SiAuth0 />,
    "AWS": <FaAws />,
    "DigitalOcean": <SiDigitalocean />,
    "Bootstrap": <SiBootstrap />,
    "HTML": <SiHtml5 />,
    "CSS": <SiCss3 />,
    "Postman": <SiPostman />,
    "GitHub": <FaGithub />,
    "MongoDB": <SiMongodb />
  };
  