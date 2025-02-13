import { useEffect, useState } from "react";
import { useAboutApi, AboutResponseModel } from "../api/useAboutApi";

const AboutMe = () => {
  const { fetchAllAbouts } = useAboutApi();
  const [aboutData, setAboutData] = useState<AboutResponseModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllAbouts();
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching About data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>About Me</h1>
      {aboutData.length > 0 ? (
        aboutData.map((about) => (
          <div key={about.aboutId}>
            <h3>{about.name}</h3>
            <p>{about.description}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AboutMe;
