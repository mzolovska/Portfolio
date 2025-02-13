import { useEffect, useState } from "react";
import { useEducationApi, EducationResponseModel } from '../api/useEducatoinApi';
import Section from "../Section";
import "./Education.css";

const Education = () => {
  const { fetchAllEducation } = useEducationApi();
  const [educationData, setEducationData] = useState<EducationResponseModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllEducation();
        setEducationData(data);
      } catch (error) {
        console.error("Error fetching Education data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="education-page">
      <Section id="education" title="Education">
        {educationData.length > 0 ? (
          <ul>
            {educationData.map((edu) => (
              <li key={edu.educationId}>
                {edu.institution} - {edu.fieldOfStudy} - {edu.degree} ({edu.startDate} - {edu.endDate})
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </Section>
    </div>
  );
};

export default Education;
