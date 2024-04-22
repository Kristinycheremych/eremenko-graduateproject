import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import "./style.css";

interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: {
    title: string;
  };
  employees: Employee[];
}

interface StatusColors {
  [status: string]: string;
}

const ProjectsPage: React.FC = () => {
  const [data, setData] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filteredProject, setFilteredProject] = useState<Project[]>([]);

  const statusColors: StatusColors = {
    "Новый": "#445371",
    "В ожидании": "#F29100",
    "В работе": "#0055FF",
    "Выполнено": "#019F3C",
    "Отменено": "#D91528",
  };

  const statusBackground: StatusColors = {
    "Новый": "#D0D4DC",
    "В ожидании": "#FCE3BF",
    "В работе": "#BFD4FF",
    'Выполнено': "#C0E7CE",
    "Отменено": "#F6C5C9",
  };

  useEffect(() => {
    axios
      .get<Project[]>("http://localhost:3001/get/projects")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filterProjects = () => {
      let filteredData = data;

      if (filterStatus !== "") {
        filteredData = filteredData.filter(
          (project) => project.status.title === filterStatus
        );
      }

      if (searchQuery !== "") {
        filteredData = filteredData.filter((project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFilteredProject(filteredData);
    };

    filterProjects();
  }, [data, filterStatus, searchQuery]);

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:3001/deleteProject/${id}`)
      .then((res) => {
        setData(data.filter((project) => project._id !== id));
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
              new Set(data.map((project) => project.status.title))
            ).map((status, index) => (
              <option key={index} value={status}>
                {status}
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
              <th>Ответственный</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredProject.map((project) => {
              return (
                <tr key={project._id}>
                  <td>{project.title}</td>
                  <td>
                    <p className="taskDescription">{project.description}</p>
                  </td>
                  <td>{new Date(project.startDate).toLocaleDateString()}</td>{" "}
                  <td>{new Date(project.endDate).toLocaleDateString()}</td>{" "}
                  <td>
                    <p
                      style={{
                        color: statusColors[project.status.title],
                        backgroundColor: statusBackground[project.status.title],
                        borderRadius: "6px",
                      }}
                      className="statusProject"
                    >
                      {project.status.title}
                    </p>
                  </td>
                  <td>
                    {project.employees
                      .map((employee: any) => {
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
                      <AiOutlineDelete
                        onClick={() => handleDelete(project._id)}
                      />
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
