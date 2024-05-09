import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./projectDetailsStyle.css";
import Header from "../../../components/header/Header";
import { MdArrowBackIos } from "react-icons/md";
import { EmployeeProject } from '../ProjectInterfaces';

const URL = process.env.REACT_APP_URL;

function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<EmployeeProject | null>(null);

  useEffect(() => {
    axios
      .get<EmployeeProject>(
        `${URL}/employeeProject/${projectId}`
      )
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
      <div className="header">
        <div className="divArrowBackIos">
          <MdArrowBackIos className="MdArrowBackIos" />
        </div>
        <p>Подробности о проекте - {project.projectId.title}</p>
      </div>
      <Header />
      <div className="container">
        <div className="div_description">
          <p className="heading_description">Описание</p>
          <p className="text_description">{project.projectId.description}</p>
        </div>
      </div>
    </>
  );
}

export default ProjectDetails;
