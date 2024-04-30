import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

interface ProjectStatus {
  _id: string;
  title: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  statusProjectId: ProjectStatus;
  supervisorId: Employee[];
}

interface EmployeeProject {
  _id: string;
  employeeId: Employee[];
  projectId: Project;
}

interface StatusColors {
  [status: string]: string;
}

const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [employeeProjects, setEmployeeProjects] = useState<EmployeeProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<EmployeeProject[]>([]);

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

  const statusColors: StatusColors = {
    Новый: "#445371",
    "В ожидании": "#F29100",
    "В работе": "#0055FF",
    Выполнено: "#019F3C",
    Отменено: "#D91528",
  };

  const statusBackground: StatusColors = {
    Новый: "#D0D4DC",
    "В ожидании": "#FCE3BF",
    "В работе": "#BFD4FF",
    Выполнено: "#C0E7CE",
    Отменено: "#F6C5C9",
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
    axios
      .delete(`http://localhost:3001/employeeProject/${id}`)
      .then(() => {
        setEmployeeProjects(employeeProjects.filter((project) => project._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
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
              new Set(employeeProjects.map((project) => project.projectId.statusProjectId.title))
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
      <div className="table_user_settings">
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
              <th>Статус</th>
              <th>Кураторы</th>
              <th>Участники</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => {
              return (
                <tr key={project._id}>
                  <td>{project.projectId.title}</td>
                  <td>
                    <p className="description">{project.projectId.description}</p>
                  </td>
                  <td>
                    {new Date(project.projectId.startDate).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(project.projectId.endDate).toLocaleDateString()}
                  </td>
                  <td>
                    <p
                      style={{
                        color: statusColors[project.projectId.statusProjectId.title],
                        backgroundColor: statusBackground[project.projectId.statusProjectId.title],
                        borderRadius: "6px",
                      }}
                      className="statusProject"
                    >
                      {project.projectId.statusProjectId.title}
                    </p>
                  </td>
                  <td>
                    {project.projectId.supervisorId
                      .map((employee) => {
                        return `${employee.lastName} ${employee.firstName} ${employee.middleName}`;
                      })
                      .join(", ")}
                  </td>
                  <td>
                    {project.employeeId
                      .map((employee) => {
                        return `${employee.lastName} ${employee.firstName} ${employee.middleName}`;
                      })
                      .join(", ")}
                  </td>
                 
                  <td className="link_table_progect td-icon">
                    <Link to={`/projectsPage/projectDetails/${project._id}`}>
                      Подробнее...
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/projectsPage/updateProject/${project._id}`}
                      className={"icon_edit"}
                    >
                      <FiEdit />
                    </Link>
                  </td>
                  <td className="td-icon">
                    <div className={"icon_delete"}>
                      <AiOutlineDelete onClick={() => handleDelete(project._id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectsPage;