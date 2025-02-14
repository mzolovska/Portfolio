import { useEffect, useState } from "react";
import { useEducationApi, EducationResponseModel } from "../api/useEducatoinApi";
import Section from "../Section";
import {AdminControls} from "./AdminControls";
import "./Education.css";
import { useAuth0 } from "@auth0/auth0-react";

const Education = () => {
  const { fetchAllEducation, createEducation, updateEducation, deleteEducation } = useEducationApi();
  const [educationData, setEducationData] = useState<EducationResponseModel[]>([]);
  const { user } = useAuth0();
  const isAdmin = user?.email === "admin@pt.com";

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

  const handleAdd = async (newEducation: EducationResponseModel) => {
    try {
      await createEducation(newEducation);
      setEducationData(await fetchAllEducation());
    } catch (error) {
      console.error("Error adding Education entry:", error);
    }
  };

  const handleModify = async (updatedEducation: EducationResponseModel) => {
    try {
      await updateEducation(updatedEducation.educationId, updatedEducation);
      setEducationData(await fetchAllEducation());
    } catch (error) {
      console.error("Error updating Education entry:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEducation(id);
      setEducationData(await fetchAllEducation());
    } catch (error) {
      console.error("Error deleting Education entry:", error);
    }
  };

  return (
    <div className="education-page">
      <Section id="education" title="Education">
        {isAdmin && (
          <AdminControls
            entityType="Education"
            fields={[
              { key: "institution", label: "Institution" },
              { key: "fieldOfStudy", label: "Field of Study" },
              { key: "degree", label: "Degree" },
              { key: "startDate", label: "Start Date", type: "date" },
              { key: "endDate", label: "End Date", type: "date" },
            ]}
            onAdd={handleAdd}
            isSection
          />
        )}
        {educationData.length > 0 ? (
          <ul>
            {educationData.map((edu) => (
              <li key={edu.educationId}>
                {edu.institution} - {edu.fieldOfStudy} - {edu.degree} ({edu.startDate} - {edu.endDate})
                {isAdmin && (
                  <AdminControls
                    entity={edu}
                    entityType="Education"
                    fields={[
                      { key: "institution", label: "Institution" },
                      { key: "fieldOfStudy", label: "Field of Study" },
                      { key: "degree", label: "Degree" },
                      { key: "startDate", label: "Start Date", type: "date" },
                      { key: "endDate", label: "End Date", type: "date" },
                    ]}
                    onModify={handleModify}
                    onDelete={handleDelete}
                  />
                )}
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
