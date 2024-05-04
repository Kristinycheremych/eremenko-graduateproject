import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Header from "../../../../components/header/Header";
import { MdArrowBackIos } from "react-icons/md";
import { HiEllipsisHorizontal } from "react-icons/hi2";


interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  gender: String;
  serviceNumber: number;
  position: Position;
  employeeStatus: EmployeeStatus;
}

interface Position {
  _id: string;
  title: string;
}

interface EmployeeStatus {
  _id: string;
  title: string;
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

interface EmployeeStatusColors {
  [employeeStatus: string]: string;
}

function ParticipantsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<EmployeeProject | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const statusColors: EmployeeStatusColors = {
    "Активный": "#019F3C",
    "Неактивный": "#D91528",
  };

  const statusBackground: EmployeeStatusColors = {
    "Активный": "#C0E7CE",
    "Неактивный": "#F6C5C9",
  };

  useEffect(() => {
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
  }, [projectId]);

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
  
  const togglePopover = (id: string) => {
    setOpenPopoverId(openPopoverId === id ? null : id);
  };

  
  if (!project) {
    return <p>Загрузка...</p>;
  }

  //Реализация логики поиска
  const filteredEmployees = project.employeeId.filter((employee) =>
    `${employee.lastName} ${employee.firstName} ${employee.middleName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Фильтрация по выбранной должности
  const filteredByPosition = selectedPosition
    ? filteredEmployees.filter(
        (employee) =>
          employee.position.title.toLowerCase() ===
          selectedPosition.toLowerCase()
      )
    : filteredEmployees;

  return (
    <>
      <div className="header">
        <div className="divArrowBackIos">
          <MdArrowBackIos className="MdArrowBackIos" />
        </div>
        <p>Участники проекта - {project.projectId.title}</p>
      </div>
      <Header />
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
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option value="">Все</option>
              <option value="Программист">Программист</option>
              <option value="Дизайнер">Дизайнер</option>
            </select>
          </div>
        </div>

        <div className="table_user">
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Табельный номер</th>
                <th>Должность</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredByPosition.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.lastName}</td>
                  <td>{user.firstName}</td>
                  <td>{user.middleName}</td>
                  <td>{user.serviceNumber}</td>
                  <td>{user.position ? user.position.title : "Нет данных"}</td>
                  <td>
                    <p
                      style={{
                        color: statusColors[user.employeeStatus.title],
                        backgroundColor:
                          statusBackground[user.employeeStatus.title],
                        borderRadius: "6px",
                        width: "100px",
                      }}
                    >
                      {" "}
                      {user.employeeStatus
                        ? user.employeeStatus.title
                        : "Нет данных"}
                    </p>
                  </td>

                  <td>
                    <HiEllipsisHorizontal
                      className="HiEllipsisHorizontal"
                      onClick={() => togglePopover(user._id)}
                    />
                    {openPopoverId === user._id && (
                      <div className="popover-content">
                        <div className="div-popover-content">
                          <div
                           
                            className="div_delete"
                          >
                            <p>Удалить</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ParticipantsPage;
