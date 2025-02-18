import { useEffect, useState } from "react";
import { useAboutApi, AboutResponseModel, AboutRequestModel } from "../api/useAboutApi";
import { AdminControls } from "./AdminControls";
import "./AboutMe.css";
import Section from "../Section";

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
      setAboutList((prev) => [...prev, created]); // Add to the list instead of replacing
    } catch (error) {
      console.error("Error adding About Me:", error);
    }
  };

  const handleDelete = async (aboutId: string) => {
    try {
      console.log("Deleting About Me ID:", aboutId); // Debugging log
      await deleteAbout(aboutId);
      setAboutList((prev) => prev.filter((about) => about.aboutId !== aboutId));
    } catch (error) {
      console.error("Error deleting About Me:", error);
    }
  };

  return (
    <div className="about-page">
      <Section id="about" title="AboutMe">

      {/* Global Add Button for About Me section */}
      <AdminControls
        entityType="About Me"
        fields={[
          { key: "name", label: "Name" },
          { key: "description", label: "Description" },
        ]}
        onAdd={handleAdd}
        onModify={handleModify}
        onDelete={handleDelete}
        isSection={true}
      />

      {/* List of About Me Entries - Displayed as Cards */}
      {aboutList.length > 0 ? (
        <ul className="about-list">
          {aboutList.map((aboutData) => (
            <li key={aboutData.aboutId} className="about-item">
              <p><strong>{aboutData.name}</strong></p>
              <p>{aboutData.description}</p>

              <AdminControls
                entity={aboutData}
                entityType="About Me"
                fields={[
                  { key: "name", label: "Name" },
                  { key: "description", label: "Description" },
                ]}
                onAdd={handleAdd}
                onModify={handleModify}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No About Me data available.</p>
      )}
      </Section>
    </div>
  );
};

export default AboutMe;
