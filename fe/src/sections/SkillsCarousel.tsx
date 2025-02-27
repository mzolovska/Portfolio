import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSkillApi, SkillsResponseModel, SkillsRequestModel } from "../api/useSkillApi";
import { AdminControls } from "./AdminControls";
import * as FaIcons from "react-icons/fa"; // Import all FontAwesome icons
import * as SiIcons from "react-icons/si"; // ✅ Import Simple Icons


const getIconComponent = (iconName: string) => {
  return (
    FaIcons[iconName as keyof typeof FaIcons] || // First check FontAwesome
    SiIcons[iconName as keyof typeof SiIcons] || // Then check Simple Icons
    FaIcons.FaQuestionCircle // Default if not found
  );
};



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
  const { fetchAllSkills, createSkill, updateSkill, deleteSkill } = useSkillApi();
  const [skills, setSkills] = useState<SkillsResponseModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedSkills = await fetchAllSkills();
        setSkills(fetchedSkills);
        
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchData();
  }, []);

  // 🆕 Add Skill
  const handleAdd = async (newData: SkillsRequestModel) => {
    try {
      const created = await createSkill(newData);
      setSkills((prev) => [...prev, created]);
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  // ✏️ Modify Skill
  const handleModify = async (updatedData: SkillsResponseModel) => {
    try {
      const updated = await updateSkill(updatedData.skillsId, {
        name: updatedData.name,
        icon: updatedData.icon,
      });

      setSkills((prev) =>
        prev.map((skill) => (skill.skillsId === updated.skillsId ? updated : skill))
      );
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  // 🗑️ Delete Skill
  const handleDelete = async (skillsId: string) => {
  console.log("Delete button clicked for skill ID:", skillsId); // ✅ Debug log
  try {
    await deleteSkill(skillsId);
    setSkills((prev) => prev.filter((skill) => skill.skillsId !== skillsId));
  } catch (error) {
    console.error("Error deleting skill:", error);
  }
};


const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Default for large screens
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3, // Show 3 skills on tablets
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2, // Show 2 skills on small tablets
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1, // Show 1 skill at a time on phones
      },
    },
  ],
};



  return (
    <div className="skills-carousel">
      <AdminControls
        entityType={"Skills"}
        fields={[
          { key: "name", label: "Name" },
          { key: "icon", label: "Icon" },
        ]}
        onAdd={handleAdd}
        onModify={handleModify}
        onDelete={handleDelete}
        isSection={true} // Enables the "+ Add" button
      />

      <Slider {...settings}>
        {skills.map((skill) => {
          const IconComponent = getIconComponent(skill.icon); // Get the correct icon
          return (
            <div key={skill.skillsId} className="skill-item">
              <IconComponent size={40} className="skill-icon" /> {/* ✅ Dynamically render the icon */}
              <p>{skill.name}</p>

              {/* 🔧 Admin Controls for Each Skill */}
              <AdminControls
                entity={skill}
                entityType={"Skills"}
                fields={[
                  { key: "name", label: "Name" },
                  { key: "icon", label: "Icon" },
                ]}
                onAdd={handleAdd}
                onModify={handleModify}
                onDelete={() => handleDelete(skill.skillsId)}
              />
            </div>
          );
        })}
      </Slider>

    </div>
  );
};

export default SkillsCarousel;
