import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./styleHeader.css";
import {EmployeeProject} from '../../views/projects/ProjectInterfaces';

function Header() {
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const location = useLocation();
  const [project, setProject] = useState<EmployeeProject | null>(null);
  const [activeMenu, setActiveMenu] = useState<string>("");

  useEffect(() => {
    if (projectId) {
      axios
        .get<EmployeeProject>(
          `http://localhost:3001/employeeProject/${projectId}`
        )
        .then((response) => {
          setProject(response.data);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке проекта:", error);
        });
    }
  }, [projectId]);

  useEffect(() => {
    const path = location.pathname;
    setActiveMenu(path);
  }, [location]);

  if (!project) {
    return <p>Загрузка...</p>;
  }

  return (
      <div className="menu">
        <ul>
          <li
            className={
              activeMenu === `/projectsPage/projectDetails/${projectId}`
                ? "active"
                : ""
            }
          >
            <Link to={`/projectsPage/projectDetails/${projectId}`}>
              О проекте
            </Link>
          </li>
          <li className={activeMenu === "/" ? "active" : ""}>
            <Link to={""}>Документы</Link>
          </li>
          <li
            className={
              activeMenu ===
              `/projectsPage/projectDetails/${projectId}/participants`
                ? "active"
                : ""
            }
          >
            <Link to={`/projectsPage/projectDetails/${projectId}/participants`}>
              Участники
            </Link>
          </li>
          <li
            className={
              activeMenu ===
              `/projectsPage/stageDetails/${projectId}/${project.projectId._id}/stages`
                ? "active"
                : ""
            }
          >
            <Link
              to={`/projectsPage/stageDetails/${projectId}/${project.projectId._id}/stages`}
            >
              Этапы
            </Link>
          </li>
        </ul>
      </div>
  );
}

export default Header;
