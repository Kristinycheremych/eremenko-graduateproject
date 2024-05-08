import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import "./style.css";
import { Employee, EmployeeProject } from "./ProjectInterfaces";

const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [employeeProjects, setEmployeeProjects] = useState<EmployeeProject[]>(
    []
  );
  const [filteredProjects, setFilteredProjects] = useState<EmployeeProject[]>(
    []
  );
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployeeProjects();
  }, []);

  const fetchEmployeeProjects = async () => {
    try {
      const response = await axios.get<EmployeeProject[]>(
        "http://localhost:3001/get/employeeProject"
      );
      setEmployeeProjects(response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  useEffect(() => {
    const filteredData = employeeProjects.filter((project) =>
      project.projectId.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterStatus !== "") {
      const filteredByStatus = filteredData.filter(
        (project) => project.projectId.statusProjectId.title === filterStatus
      );
      setFilteredProjects(filteredByStatus);
    } else {
      setFilteredProjects(filteredData);
    }
  }, [employeeProjects, filterStatus, searchQuery]);

  const handleDelete = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот проект?")) {
      axios
        .delete(`http://localhost:3001/employeeProject/${id}`)
        .then(() => {
          setEmployeeProjects(
            employeeProjects.filter((project) => project._id !== id)
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const togglePopover = (id: string) => {
    setOpenPopoverId(openPopoverId === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".HiEllipsisHorizontal"))
        setOpenPopoverId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="header">
        <div className="divArrowBackIos">
          <MdArrowBackIos className="MdArrowBackIos" />
        </div>
        <p>Проекты</p>
      </div>
      <div className="container">
        <div className={"container_search_filter"}>
          <div className={"div_input_search"}>
            <input
              type="text"
              className={"input_search"}
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={"div_filter"}>
            <select
              className={"filter"}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Все</option>
              {Array.from(
                new Set(
                  employeeProjects.map(
                    (project) => project.projectId.statusProjectId.title
                  )
                )
              ).map((statusProjectId, index) => (
                <option key={index} value={statusProjectId}>
                  {statusProjectId}
                </option>
              ))}
            </select>
          </div>

          <div className={"containet_btn_add"}>
            <Link to="./addProjectForm">
              <button className={"btn_add"}>Добавить</button>
            </Link>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Название</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
                <th>Статус</th>
                <th>Куратор</th>
                <th>Участники</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => {
                return (
                  <tr key={project._id}>
                    <td>{index + 1}</td>
                    <td>{project.projectId.title}</td>
                    <td>
                      {new Date(
                        project.projectId.startDate
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(project.projectId.endDate).toLocaleDateString()}
                    </td>
                    <td>{project.projectId.statusProjectId.title}</td>
                    <td>
                      {project.projectId.supervisorId
                        .map((employee) => {
                          return `${
                            employee.lastName
                          } ${employee.firstName.charAt(
                            0
                          )}. ${employee.middleName.charAt(0)}.`;
                        })
                        .join(", ")}
                    </td>
                    <td>
                      <div className="avatar-container">
                        {project.employeeId.length > 0 ? (
                          project.employeeId
                            .slice(0, 3)
                            .map((employee: Employee, index) => (
                              <div key={index} className="avatar">
                                <div className="avatar-letter">
                                  {employee.firstName.charAt(0)}
                                  {employee.middleName
                                    ? employee.middleName.charAt(0)
                                    : ""}
                                </div>
                              </div>
                            ))
                        ) : (
                          <span>Нет данных</span>
                        )}
                        {project.employeeId.length > 3 && (
                          <span>
                            <div className="avatar">
                              {" "}
                              <span>+{project.employeeId.length - 3}</span>
                            </div>
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <HiEllipsisHorizontal
                        className="HiEllipsisHorizontal"
                        onClick={() => togglePopover(project._id)}
                      />
                      {openPopoverId === project._id && (
                        <div className="popover-content">
                          <div className="div-popover-content">
                            <div className="div_edit">
                              <Link
                                to={`/projectsPage/projectDetails/${project._id}`}
                              >
                                <p>Подробнее</p>
                              </Link>
                            </div>
                            <div
                              onClick={() => handleDelete(project._id)}
                              className="div_delete"
                            >
                              <p>Удалить</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
