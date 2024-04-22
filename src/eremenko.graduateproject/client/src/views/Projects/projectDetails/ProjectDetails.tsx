import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./projectDetailsStyle.css";
import Header from "../../../components/header/Header";

interface Project {
  _id: string;
  title: string;
  description: string;
}

function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    axios
      .get<Project>(`http://localhost:3001/getProjects/${projectId}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке проекта:", error);
      });
  }, [projectId]);

  if (!project) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="div_description">
          <p className="heading_description">Описание</p>
          <p className="text_description">{project.description}</p>
        </div>
      </div>
    </>
  );
}

export default ProjectDetails;
