import { useEffect, useState } from "react";
import { useAboutApi, AboutResponseModel, AboutRequestModel } from "../api/useAboutApi";
import { AdminControls } from "./AdminControls";
import Section from "../Section";
import "./AboutMe.css";
import SkillsCarousel from "./SkillsCarousel";
import profileImage from "../assets/profile.jpg";
import Resume from "./Resume";

const AboutMe = () => {
  const { fetchAllAbouts, createAbout, updateAbout, deleteAbout } = useAboutApi();
  const [aboutList, setAboutList] = useState<AboutResponseModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const abouts = await fetchAllAbouts();
        setAboutList(abouts);
      } catch (error) {
        console.error("Error fetching About Me:", error);
      }
    };
    fetchData();
  }, []);

  const handleModify = async (updatedData: AboutResponseModel) => {
    try {
      const updated = await updateAbout(updatedData.aboutId, {
        name: updatedData.name,
        description: updatedData.description,
      });

      setAboutList((prev) =>
        prev.map((about) => (about.aboutId === updated.aboutId ? updated : about))
      );
    } catch (error) {
      console.error("Error updating About Me:", error);
    }
  };

  const handleAdd = async (newData: AboutRequestModel) => {
    try {
      const created = await createAbout(newData);
      setAboutList((prev) => [...prev, created]);
    } catch (error) {
      console.error("Error adding About Me:", error);
    }
  };

  const handleDelete = async (aboutId: string) => {
    try {
      await deleteAbout(aboutId);
      setAboutList((prev) => prev.filter((about) => about.aboutId !== aboutId));
    } catch (error) {
      console.error("Error deleting About Me:", error);
    }
  };

  return (
    <div className="about-container">
      <Section id="about" title="About Me">
        {/* 🔧 Admin Controls for Adding a New About Section */}
        <AdminControls
          entityType="About Me"
          fields={[
            { key: "name", label: "Name" },
            { key: "description", label: "Description" },
          ]}
          onAdd={handleAdd}
          onModify={handleModify}
          onDelete={handleDelete}
          isSection={true} // Enables the "+ Add" button
        />

        <div className="about-content">
          {/* 🖼️ Profile Image */}
          <div className="about-image">
            <img src={profileImage} alt="Profile" />
          </div>

          {/* 📜 About Me Text */}
          <div className="about-text">
            {aboutList.length > 0 ? (
              aboutList.map((aboutData) => (
                <div key={aboutData.aboutId} className="about-details">
                  <h2>{aboutData.name}</h2>
                  <p>{aboutData.description}</p>

                  {/* 🔧 Admin Controls for Editing/Deleting */}
                  <AdminControls
                    entity={aboutData}
                    entityType="About Me"
                    fields={[
                      { key: "name", label: "Name"},
                      { key: "description", label: "Description" },
                    ]}
                    onAdd={handleAdd}
                    onModify={handleModify}
                    onDelete={() => handleDelete(aboutData.aboutId)}
                  />
                </div>
              ))
            ) : (
              <p>No information available</p>
            )}

            <Resume />
            <h2>Skills</h2>
            <SkillsCarousel />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default AboutMe;
